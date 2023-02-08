export class ErrorHandler extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends ErrorHandler {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ErrorHandler {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ErrorHandler {
  constructor(message: string) {
    super(message, 401);
  }
}
