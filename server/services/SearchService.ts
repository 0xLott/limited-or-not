import { TVSeries } from "../models/TVSeries";
import { TMDB_API } from "../config";
import { createNewTvSeriesEntity } from "../utils/createNewTvSeriesEntity"

export class SearchService {


    public async getSearchResults(query: string): Promise<TVSeries[]> {
        const url = `${TMDB_API.BASE_URL}/search/tv?query=${query}&include_adult=false&language=en-US`

        const searchResults: TVSeries[] = []

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Bun.env.TMDB_API_KEY}`,
            }
        });

        const data = await response.json();
        data.results.forEach((tvSeries: any) => {
            searchResults.push(createNewTvSeriesEntity(tvSeries));
        });

        return searchResults;
    }
}

// TODO: need to address search failing scenario to assign to promise

/** TODO:
 * Pagination needed!
    {
        "page": 1,
        "results": [...],
        "total_pages": 1,
        "total_results": 13
    }
 */
