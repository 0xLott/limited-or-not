export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ObjectNotFoundError extends APIError {
  constructor() {
    super("TV Show not found. (HTTP 404)", 404);
  }
}

export class InvalidParameterError extends APIError {
  constructor(message) {
    super(message, 400);
  }
}
