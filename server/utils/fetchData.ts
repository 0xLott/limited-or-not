import { APIError, ObjectNotFoundError } from "./errors";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  [key: string]: any;
}

/**
 * Generic data fetcher. Retrieves data from the specified URL with the given options.
 *
 * @param url The url to fetch data from
 * @param options Options for the HTTP request, if necessary
 * @returns A promise that resolves to the fetched data in JSON, or an error object if the request fails.
 *
 * @throws Will throw an error if:
 * a. The response status is not ok
 * b. The response status is 404
 * c. The response status is between 500 and 599
 * d. The response status is not 404, but the results array is empty (TMDB API returns an empty array when no results are found)
 */
export async function fetchData(url: string, options: FetchOptions = {}): Promise<any> {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (response.ok) {
    if (!data || Object.keys(data).length === 0) {
      throw new ObjectNotFoundError(`TV Show not found. (HTTP 404)`, 404);
    }
    return data;
  } else if (response.status === 404 || data.status_code === 34) {
    throw new ObjectNotFoundError(`TV Show not found. (HTTP 404)`, 404);
  } else if (response.status >= 500 && response.status < 600) {
    throw new APIError(
      `The TMDB server encountered an unexpected error. Please try again later (HTTP ${response.status} - ${response.statusText}).`,
      response.status
    );
  } else {
    throw new Error(`Unexpected error (HTTP ${response.status} - ${response.statusText}).`);
  }
}
