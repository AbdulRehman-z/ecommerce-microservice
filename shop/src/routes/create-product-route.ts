import { requireAuthMiddleware, validateRequest } from "@abdulrehmanz/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Product } from "../models/product.model";

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
    return res.sendStatus(201).json(product);
  }
);
export { router as createProductRouter };
