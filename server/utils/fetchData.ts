import { APIError, ObjectNotFoundError } from "./errors";

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  [key: string]: any;
}

/**
 * Generic data fetcher. Retrieves data from the specified URL with the given HTTP options.
 *
 * @param {string} url The URL to fetch data from.
 * @param {FetchOptions} [options={}] Options for the HTTP request, such as method and headers.
 * @returns {Promise<any>} A promise that resolves to the fetched data in JSON format, or an error object if the request fails.
 *
 * @throws {ObjectNotFoundError} Will throw an error if the response status is 404 or if the results array is empty.
 * @throws {APIError} Will throw an error if the response status is between 500 and 599.
 * @throws {Error} Will throw a generic error if the response status is not ok and does not match the above conditions.
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

  if (!response.ok) {
    if (response.status === 404 || data?.status_code === 34) {
      throw new ObjectNotFoundError();
    }
    if (response.status >= 500 && response.status < 600) {
      throw new APIError(
        `The TMDB server encountered an unexpected error. Please try again later (HTTP ${response.status}}).`,
        response.status
      );
    }
    throw new Error(`Unexpected error (HTTP ${response.status}).`);
  }

  if (!data || Object.keys(data).length === 0) {
    throw new ObjectNotFoundError();
  }

  return data;
}
