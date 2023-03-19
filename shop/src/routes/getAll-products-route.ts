import express, { Request, Response } from "express";
import { Product } from "../models/product.model";
import { NotFoundError } from "@abdulrehmanz/common";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
  const allProducts = await Product.find({});

  if (!allProducts) {
    throw new NotFoundError("No products found");
  }

  return res.status(200).send(allProducts);
});

export { router as getAllProductsRouter };
