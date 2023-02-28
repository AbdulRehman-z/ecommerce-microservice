import express from "express";
import { connectDB } from "./services/mongo.service";
import { createProductRouter } from "./routes/create-product-route";
import { getSingleProductRouter } from "./routes/getSingle-product-route";

import {
  currentUserMiddleware,
  errorHandlerMiddleware,
} from "@abdulrehmanz/common";
import cookieSession from "cookie-session";
import { getAllProductsRouter } from "./routes/getAll-products-route";
import { updateProductRouter } from "./routes/update-product-route";
import { natsWrapper } from "./nats-wrapper";

/* configure express app */
export const app = express();
app.use(express.json());

/* cookie session */
app.set("trust proxy", true); // trust first proxy
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== "test", // only use cookies over https
  })
);
app.use(currentUserMiddleware);

/* routes */
app.use(createProductRouter);
app.use(getAllProductsRouter);
app.use(getSingleProductRouter);
app.use(updateProductRouter);
/* error handling */
app.use(errorHandlerMiddleware);

// "start":"ts-node-dev --poll src/index.ts"  // this is for ts-node-dev
