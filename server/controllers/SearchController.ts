import { Get, Path, Route, Response as ApiResponse } from "tsoa";
import { SearchService } from "../services/SearchService";
import { handleErrorResponse } from "../utils/handleErrors";

const service = new SearchService;

@Route("search")
export class SearchController {

    @Get("{query}")
    @ApiResponse<Error>(400, "Bad Request")
    @ApiResponse<Error>(404, "Not Found")
    public async getSearchResults(@Path() query: string): Promise<Response> {
        try {
            const searchResults = await service.getSearchResults(query)
            return new Response(JSON.stringify(searchResults), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            return handleErrorResponse(error);
        }
    }
}