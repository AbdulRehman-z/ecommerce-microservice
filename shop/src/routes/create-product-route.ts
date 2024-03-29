import { requireAuthMiddleware, validateRequest } from "@abdulrehmanz/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ProductCreatedPublisher } from "../events/pub/product-created-pub";
import { Product } from "../models/product.model";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/products",
  requireAuthMiddleware,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const product = Product.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await product.save();
    await new ProductCreatedPublisher(natsWrapper.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
    });
    return res.status(201).json(product);
  }
);
export { router as createProductRouter };
