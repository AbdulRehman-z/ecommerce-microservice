"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUserMiddleware = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return next();
    }
    // this trycatch block will detect if there is a jwt that is tempered by some malicious user
    // our jwt must be verified if it is signed with our process.env.JWT_KEY And if someone tampered with our jwt
    // then the verification process will be failed because our process.env.JWT_KEY will automatically know that
    // it is not the same jwt that I issued during sign the jwt
    try {
        const decodePayload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = decodePayload;
    }
    catch (error) {
        throw new Error("Invalid JWT");
    }
    next();
};
exports.currentUserMiddleware = currentUserMiddleware;
