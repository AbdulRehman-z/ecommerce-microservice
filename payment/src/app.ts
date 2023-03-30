import express from "express";
import "express-async-errors";

import {
  BadRequestError,
  currentUserMiddleware,
  errorHandlerMiddleware,
} from "@abdulrehmanz/common";

const app = express();
app.use(express.json());
app.use(currentUserMiddleware);

app.all("*", async (req, res) => {
  throw new BadRequestError("Route not found");
});

app.use(errorHandlerMiddleware);

export { app };
