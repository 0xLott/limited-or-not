import { Get, Path, Route, Response as ApiResponse } from "tsoa";
import { SearchService } from "../services/SearchService";

const service = new SearchService;

@Route("search")
export class SearchController {
    @Get("{query}")
    public async getSearchResults(@Path() query: string): Promise<Response> {
        try {
            const searchResults = await service.getSearchResults(query)
            return new Response(JSON.stringify(searchResults), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            return new Response(JSON.stringify({ error: "Search failed" }), {
                headers: { "Content-Type": "application/json" },
            });
        }
    }
}

// TODO: Improve "Search failed" message once there are exceptions in SearchService