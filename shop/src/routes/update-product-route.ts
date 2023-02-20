import express, { Request, Response } from "express";
import { products } from "../models/product.model";
import { BadRequestError, requireAuthMiddleware } from "@abdulrehmanz/common";

const router = express.Router();

router.put(
  "/api/products/:id",
  requireAuthMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await products.findById(id);

    if (!product) {
      return new BadRequestError("Product not found");
    }

    if (product.userId !== req.currentUser!.id) {
      return new BadRequestError(
        "You are not authorized to update this product"
      );
    }

    product.set({
      title: req.body.title,
      price: req.body.price,
    });
    product.save();
    return res.status(200).send(product);
  }
);

export { router as updateProductRouter };
