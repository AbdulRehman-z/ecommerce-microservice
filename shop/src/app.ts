import express from "express";
import { createProductRouter } from "./routes/create-product-route";
import { getSingleProductRouter } from "./routes/getSingle-product-route";

import {
  currentUserMiddleware,
  errorHandlerMiddleware,
} from "@abdulrehmanz/common";
import { getAllProductsRouter } from "./routes/getAll-products-route";
import { updateProductRouter } from "./routes/update-product-route";

/* configure express app */
export const app = express();
app.use(express.json());

app.use(currentUserMiddleware);

/* routes */
app.use(createProductRouter);
app.use(getAllProductsRouter);
app.use(getSingleProductRouter);
app.use(updateProductRouter);
/* error handling */
app.use(errorHandlerMiddleware);
