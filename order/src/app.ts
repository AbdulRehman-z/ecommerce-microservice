import express from "express";
import {
  currentUserMiddleware,
  errorHandlerMiddleware,
} from "@abdulrehmanz/common";
import cookieSession from "cookie-session";
import { getAllOrdersRouter } from "./routes/getAll-order-route";
import { createOrderRouter } from "./routes/create-order-route";
import { deleteOrderRouter } from "./routes/patch-order-route";
import { getOneOrderRouter } from "./routes/getOne-order-route";

/* configure express app */
export const app = express();
app.use(express.json());

/* cookie session */
app.set("trust proxy", true); // trust first proxy
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: false,
  })
);
app.use(currentUserMiddleware);

/* routes */
app.use(getAllOrdersRouter);
app.use(createOrderRouter);
app.use(deleteOrderRouter);
app.use(getOneOrderRouter);
/* error handling */
app.use(errorHandlerMiddleware);
