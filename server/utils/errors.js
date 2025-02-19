export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class TVShowNotFoundError extends APIError {
  constructor(message, statusCode) {
    super(message, 404);
  }
}

export class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
  }
}
