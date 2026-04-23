export type ApodApiItem = {
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

// Pause between retry attempts to avoid hammering the API on transient failures.
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Convert a Date into the YYYY-MM-DD format expected by the APOD endpoint.
function formatDateForApi(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

// Fetch APOD entries for a date range with retry handling for common transient HTTP errors.
export async function fetchApodRange(startDate: Date, endDate: Date): Promise<ApodApiItem[]> {
  // APOD supports querying a date window via start_date/end_date.
  const url =
    'https://api.nasa.gov/planetary/apod?api_key=' +
    APOD_API_KEY +
    '&start_date=' +
    formatDateForApi(startDate) +
    '&end_date=' +
    formatDateForApi(endDate);

  let response: Response | null = null;
  // Retry transient failures a small number of times before surfacing an error.
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const currentResponse = await fetch(url);
    if (currentResponse.ok) {
      response = currentResponse;
      break;
    }

    // Only retry statuses that are likely temporary (rate limits and server-side failures).
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

  // NASA may return a single object or an array depending on request shape; normalize to array.
  const payload = (await response.json()) as ApodApiItem[] | ApodApiItem;
  return Array.isArray(payload) ? payload : [payload];
}
