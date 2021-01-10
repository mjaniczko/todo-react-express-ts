export class ApiError {
  constructor(public code: number, public message: string) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg: string) {
    return new ApiError(400, msg);
  }

  static notAuthorized(msg: string) {
    return new ApiError(401, msg);
  }

  static notFound(msg: string) {
    return new ApiError(404, msg);
  }

  static internal(msg: string) {
    return new ApiError(500, msg);
  }
}
