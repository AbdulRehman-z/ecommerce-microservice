import express, { Request, Response } from "express";
import { products } from "../models/product.model";
import { BadRequestError, requireAuthMiddleware } from "@abdulrehmanz/common";
import { ProductUpdatedPublisher } from "../events/pub/product-updated-pub";
import { natsWrapper } from "../nats-wrapper";

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
    await product.save();
    await new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
    });
    return res.status(200).send(product);
  }
);

export { router as updateProductRouter };
