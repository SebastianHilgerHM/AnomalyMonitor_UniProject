import { useCallback, useEffect, useState } from 'react';
import { WORLDMAP_LAND_MASK } from '../constants/worldmapLandMask';
import { ApodApiItem, fetchApodRange } from './apodApi';

export type MapScatterPoint = {
  id: string;
  date: string;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  xRatio: number;
  yRatio: number;
};

const TARGET_COUNT = 20;
const WINDOW_DAYS = 30;
const MAX_WINDOWS = 8;

// Returns a cloned date shifted by N days to avoid mutating source dates.
function addDays(date: Date, days: number) {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);
  return clone;
}

// Stable hash so each APOD item always maps to the same pseudo-random point.
function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// Convert integer hash into a 0..1 ratio for coordinate math.
function ratioFromSeed(seed: number) {
  return (seed % 10000) / 10000;
}

function buildScatterPoint(item: ApodApiItem): MapScatterPoint {
  const key = item.date + '|' + item.title;
  const seedX = hashString(key + '|x');
  const seedY = hashString(key + '|y');

  let xRatio: number;
  let yRatio: number;

  if (WORLDMAP_LAND_MASK.length > 0) {
    // Land-mask mode: pick a deterministic land pixel from the generated mask.
    const index = seedX % WORLDMAP_LAND_MASK.length;
    const [maskX, maskY] = WORLDMAP_LAND_MASK[index];

    // tiny deterministic jitter helps avoid exact overlap on coarse grid points
    const jitterX = (ratioFromSeed(seedY) - 0.5) * 0.01;
    const jitterY = (ratioFromSeed(seedX) - 0.5) * 0.01;

    xRatio = Math.min(0.995, Math.max(0.005, maskX + jitterX));
    yRatio = Math.min(0.995, Math.max(0.005, maskY + jitterY));
  } else {
    // Fallback mode if mask is unavailable: bounded random scatter.
    const marginX = 0.03;
    const marginY = 0.08;
    xRatio = marginX + ratioFromSeed(seedX) * (1 - marginX * 2);
    yRatio = marginY + ratioFromSeed(seedY) * (1 - marginY * 2);
  }

  return {
    id: key,
    date: item.date,
    title: item.title,
    description: item.explanation,
    author: item.copyright?.trim() || 'Unknown APOD author',
    imageUrl: item.hdurl || item.url || '',
    xRatio,
    yRatio,
  };
}

async function fetchApodWindow(startDate: Date, endDate: Date) {
  // Fetch a date window, then keep only entries that can render an image preview.
  const data = await fetchApodRange(startDate, endDate);
  return data
    .filter((item) => item.media_type === 'image')
    .filter((item) => Boolean(item.hdurl || item.url))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function useApodMapScatter() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<MapScatterPoint[]>([]);

  const load = useCallback(async () => {
    // Reset state before loading a fresh scatter dataset.
    setLoading(true);
    setError(null);

    try {
      const collected = new Map<string, ApodApiItem>();
      let cursorEnd = new Date();

      // Walk backwards from today in windows until we collect TARGET_COUNT items.
      for (let windowIndex = 0; windowIndex < MAX_WINDOWS && collected.size < TARGET_COUNT; windowIndex++) {
        const cursorStart = addDays(cursorEnd, -(WINDOW_DAYS - 1));
        const batch = await fetchApodWindow(cursorStart, cursorEnd);

        // De-duplicate by date+title so repeated entries across windows are ignored.
        for (const item of batch) {
          const key = item.date + '|' + item.title;
          if (!collected.has(key)) {
            collected.set(key, item);
          }

          if (collected.size >= TARGET_COUNT) {
            break;
          }
        }

        cursorEnd = addDays(cursorStart, -1);
      }

      const latest = Array.from(collected.values())
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, TARGET_COUNT)
        .map(buildScatterPoint);

      setPoints(latest);
    } catch (e) {
      // Keep errors visible in UI and clear stale points on failure.
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      setPoints([]);
    } finally {
      // Always clear loading state at the end of a load attempt.
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Auto-load points on first mount.
    void load();
  }, [load]);

  return {
    loading,
    error,
    points,
    reload: load,
  };
}

export default useApodMapScatter;
