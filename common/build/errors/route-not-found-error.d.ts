import { CustomError } from "./custom-error";
export declare class RouteNotFoundError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
