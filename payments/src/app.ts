import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  BadRequestError,
  currentUserMiddleware,
  errorHandlerMiddleware,
} from "@abdulrehmanz/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUserMiddleware);

app.all("*", async (req, res) => {
  throw new BadRequestError("Route not found");
});

app.use(errorHandlerMiddleware);

export { app };
