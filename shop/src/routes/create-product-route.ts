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
  (req: Request, res: Response) => {
    console.log("req.currentUser", req.currentUser);
    const { title, price } = req.body;
    const product = Product.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    product.save();
    new ProductCreatedPublisher(natsWrapper.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
    });
    return res.sendStatus(201).json(product);
  }
);
export { router as createProductRouter };
