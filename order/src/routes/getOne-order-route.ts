import {
  BadRequestError,
  NotFoundError,
  requireAuthMiddleware,
  validateRequest,
} from "@abdulrehmanz/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order.model";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuthMiddleware,
  [body("orderId").not().isEmpty().withMessage("orderId is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("product");

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new BadRequestError("Not authorized");
    }

    return res.status(200).send(order);
  }
);

export { router as getOneOrderRouter };
