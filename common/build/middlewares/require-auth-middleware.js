"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthMiddleware = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const requireAuthMiddleware = (req, res, next) => {
    if (!req.currentUser) {
        throw new not_authorized_error_1.NotAuthorizedError("Not authorized");
    }
    next();
};
exports.requireAuthMiddleware = requireAuthMiddleware;
