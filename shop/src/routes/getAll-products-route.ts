import express, { Request, Response } from "express";
import { Product } from "../models/product.model";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
  const allProducts = await Product.find({});
  return res.status(200).send(allProducts);
});

export { router as getAllProductsRouter };
