import { TMDB_API } from "../config";
import { TVSeries } from "../models/TVSeries";
import { createNewTvSeriesEntity } from "../utils/createNewTvSeriesEntity";
import { APIError, InvalidParameterError, ObjectNotFoundError } from "../utils/errors";
import { fetchData } from "../utils/fetchData";

export class SearchService {

    public async getSearchResults(query: string): Promise<TVSeries[]> {
        if (typeof query !== "string" || query.length < 2 || query.trim() == "" || !query) {
            throw new InvalidParameterError("`query` must be a string with 2+ characters");
        }

        const url = `${TMDB_API.BASE_URL}/search/tv?query=${query}&include_adult=false&language=en-US`

        const searchResults: TVSeries[] = []

        try {
            const data = await fetchData(url);
            data.results.forEach((tvSeries: any) => {
                searchResults.push(createNewTvSeriesEntity(tvSeries));
            });

            return searchResults;
        } catch (error: any) {
            if (error instanceof ObjectNotFoundError) {
                console.error(`TV Show with title ${query} not found.`, error);
                throw error;
            } else if (error instanceof APIError) {
                console.error(`Error from TMDB API: ${error.message}`, error);
                throw error;
            } else {
                console.error(`Unexpected error: ${error.message}`, error);
                throw error;
            }
        }
    }
}

/** TODO:
 * Pagination needed!
    {
        "page": 1,
        "results": [...],
        "total_pages": 1,
        "total_results": 13
    }
 */
