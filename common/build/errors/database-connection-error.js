"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestDatabaseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class RequestDatabaseConnectionError extends custom_error_1.CustomError {
    constructor() {
        super();
        this.statusCode = 500;
        this.reason = "Error connecting to database";
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestDatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.RequestDatabaseConnectionError = RequestDatabaseConnectionError;
