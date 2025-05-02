import { InvalidParameterError, ObjectNotFoundError, APIError } from "./errors";

export function handleErrorResponse(error: any): Response {
    let status;
    let message;

    if (error instanceof InvalidParameterError) {
        status = 400;
        message = error.message;
    } else if (error instanceof ObjectNotFoundError) {
        status = 404;
        message = error.message;
    } else if (error instanceof APIError) {
        status = 502;
        message = error.message;
    } else {
        status = 500;
        message = "Internal Server Error";
    }

    return new Response(JSON.stringify({ error: message, status }), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}; 