"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, Error);
    }
}
exports.CustomError = CustomError;
