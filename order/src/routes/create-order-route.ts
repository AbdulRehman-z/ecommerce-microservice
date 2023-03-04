import express, { Request, Response } from "express";
import {
  BadRequestError,
  requireAuthMiddleware,
  validateRequest,
} from "@abdulrehmanz/common";
import { body } from "express-validator";
import { Product } from "../models/product.model";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuthMiddleware,
  [body("productId").not().isEmpty().withMessage("Product Id is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    // check if product exists
    const product = await Product.findById(req.body.productId);
    if (!product) {
      throw new BadRequestError("Product not found");
    }

    // check if product is not already reserved by anyone
    const isReserved = await product.isReserved();
    if (isReserved) {
      throw new BadRequestError("Product is already reserved");
    }
  }
);

export { router as createOrderRouter };
