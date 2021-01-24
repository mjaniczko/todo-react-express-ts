export class ErrorHandler extends Error {
  constructor(public statusCode: number, public message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: Error | ErrorHandler) => {
  if (err instanceof ErrorHandler) {
    throw new ErrorHandler(err.statusCode, err.message);
  }
  throw new ErrorHandler(500, 'Ups something went wrong... Try again later');
};
