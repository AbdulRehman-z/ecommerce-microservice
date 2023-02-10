"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteNotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class RouteNotFoundError extends custom_error_1.CustomError {
    constructor() {
        super();
        this.statusCode = 404;
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
exports.RouteNotFoundError = RouteNotFoundError;
