export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ObjectNotFoundError extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
  }
}
