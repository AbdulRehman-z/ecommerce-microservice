import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Something went wrong", err);
  res.send({
    message: "Something went wrong",
  });
};

export { errorHandler as errorHandlerMiddleware };
