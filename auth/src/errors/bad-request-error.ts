import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: 400;

  constructor(public message: string) {
    super();
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
