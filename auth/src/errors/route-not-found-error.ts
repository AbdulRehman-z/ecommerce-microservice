import { CustomError } from "./custom-error";

export class RouteNotFoundError extends CustomError {
  statusCode: 404;

  constructor() {
    super();

    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "Invalid route",
      },
    ];
  }
}
