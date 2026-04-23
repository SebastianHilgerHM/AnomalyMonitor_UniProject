import { useState } from 'react';

export type SearchItem = {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  author: string;
};

type ApodApiItem = {
  date: string;
  title: string;
  explanation: string;
  media_type: string;
  copyright?: string;
  url?: string;
  hdurl?: string;
};

const APOD_API_KEY = 'DEMO_KEY';
const MAX_RETRIES = 2;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDateForApi(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

export function useApodSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchItem[]>([]);

  const search = async (fromDate: Date, toDate: Date) => {
    if (fromDate > toDate) {
      setError('FROM date must be before TO date.');
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const startDate = formatDateForApi(fromDate);
      const endDate = formatDateForApi(toDate);

      const url =
        'https://api.nasa.gov/planetary/apod?api_key=' +
        APOD_API_KEY +
        '&start_date=' +
        startDate +
        '&end_date=' +
        endDate;

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

      const imagesOnly = data
        .filter((item) => item.media_type === 'image')
        .map((item) => ({
          date: item.date,
          title: item.title,
          description: item.explanation,
          imageUrl: item.hdurl || item.url || '',
          category: 'APOD image',
          author: item.copyright?.trim() || 'Unknown APOD author',
        }))
        .filter((item) => item.imageUrl.length > 0)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      setResults(imagesOnly);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(message);
      setResults([]);
    } finally {
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
