import { useCallback, useEffect, useState } from 'react';

type ApodApiItem = {
  date: string;
  title: string;
  explanation: string;
  media_type: string;
  copyright?: string;
  url?: string;
  hdurl?: string;
};

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

const APOD_API_KEY = 'DEMO_KEY';
const TARGET_COUNT = 20;
const WINDOW_DAYS = 30;
const MAX_WINDOWS = 8;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const MAX_RETRIES = 2;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDateForApi(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function addDays(date: Date, days: number) {
  const clone = new Date(date);
  clone.setDate(clone.getDate() + days);
  return clone;
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function ratioFromSeed(seed: number) {
  return (seed % 10000) / 10000;
}

function buildScatterPoint(item: ApodApiItem): MapScatterPoint {
  const key = item.date + '|' + item.title;
  const seedX = hashString(key + '|x');
  const seedY = hashString(key + '|y');

  const marginX = 0.03;
  const marginY = 0.08;
  const xRatio = marginX + ratioFromSeed(seedX) * (1 - marginX * 2);
  const yRatio = marginY + ratioFromSeed(seedY) * (1 - marginY * 2);

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
  const url =
    'https://api.nasa.gov/planetary/apod?api_key=' +
    APOD_API_KEY +
    '&start_date=' +
    formatDateForApi(startDate) +
    '&end_date=' +
    formatDateForApi(endDate);

  let response: Response | null = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const currentResponse = await fetch(url);
    if (currentResponse.ok) {
      response = currentResponse;
      break;
    }

    const shouldRetry = RETRYABLE_STATUS.has(currentResponse.status) && attempt < MAX_RETRIES;
    if (!shouldRetry) {
      if (currentResponse.status === 503) {
        throw new Error('NASA APOD is temporarily unavailable (503). Please try again in a minute.');
      }
      if (currentResponse.status === 429) {
        throw new Error('Too many APOD requests right now (429). Please wait a bit and retry.');
      }
      throw new Error('APOD request failed with status ' + currentResponse.status);
    }

    await wait(800 * (attempt + 1));
  }

  if (!response) {
    throw new Error('APOD request failed after multiple retries.');
  }

  const payload = (await response.json()) as ApodApiItem[] | ApodApiItem;
  const data = Array.isArray(payload) ? payload : [payload];

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
    setLoading(true);
    setError(null);

    try {
      const collected = new Map<string, ApodApiItem>();
      let cursorEnd = new Date();

      for (let windowIndex = 0; windowIndex < MAX_WINDOWS && collected.size < TARGET_COUNT; windowIndex++) {
        const cursorStart = addDays(cursorEnd, -(WINDOW_DAYS - 1));
        const batch = await fetchApodWindow(cursorStart, cursorEnd);

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
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      setPoints([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
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
