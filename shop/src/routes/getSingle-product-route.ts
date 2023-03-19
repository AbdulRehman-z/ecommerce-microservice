import { NotFoundError } from "@abdulrehmanz/common";
import express, { Request, Response } from "express";
import { Product } from "../models/product.model";

const router = express.Router();

router.get("/api/products/:id", async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return new NotFoundError("Product not found");
  }
  return res.status(200).send(product);
});

export { router as getSingleProductRouter };
