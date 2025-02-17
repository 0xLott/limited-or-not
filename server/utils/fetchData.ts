import { TMDB_API } from "../config";
import { APIError } from "./errors";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  [key: string]: any;
}

/**
 * Generic data fetcher. Retrieves data from the specified URL with the given options.
 *
 * @param url - The url to fetch data from
 * @param options - options for the HTTP request, if necessary
 * @returns A promise that resolves to the fetched data in JSON, or an error object if the request fails.
 *
 * @throws Will throw an error if the response status is not ok.
 */
export async function fetchData(url: string, options: FetchOptions = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new APIError(`Failed to fetch TV series: HTTP ${response.status} - ${response.statusText}.`, response.status);
  }

  const data = await response.json();
  return data;
}
