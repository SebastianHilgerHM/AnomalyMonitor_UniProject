import { useState } from 'react';
import { fetchApodRange } from './apodApi';

export type SearchItem = {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
};

export function useApodSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchItem[]>([]);

  const search = async (fromDate: Date, toDate: Date) => {
    // Guard invalid ranges early so we avoid unnecessary network requests.
    if (fromDate > toDate) {
      setError('FROM date must be before TO date.');
      setResults([]);
      return;
    }

    // Reset status for a fresh search cycle.
    setLoading(true);
    setError(null);

    try {
      // Shared API helper handles URL building, retries, and payload normalization.
      const data = await fetchApodRange(fromDate, toDate);

      // Keep only image entries and map API fields to the UI model.
      const imagesOnly = data
        .filter((item) => item.media_type === 'image')
        .map((item) => ({
          date: item.date,
          title: item.title,
          description: item.explanation,
          imageUrl: item.hdurl || item.url || '',
          author: item.copyright?.trim() || 'Unknown APOD author',
        }))
        // Exclude items without a usable image URL.
        .filter((item) => item.imageUrl.length > 0)
        // Newest first keeps list behavior consistent with latest-first UX.
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      setResults(imagesOnly);
    } catch (e) {
      // Convert unknown failures into a readable string for the UI.
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      setResults([]);
    } finally {
      // Always clear loading state, regardless of success/failure.
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    results,
    search,
  };
}
