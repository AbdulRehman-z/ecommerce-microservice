import {
  BadRequestError,
  NotAuthorizedError,
  requireAuthMiddleware,
  validateRequest,
  OrderStatus,
} from "@abdulrehmanz/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order.model";

const router = express.Router();

router.patch(
  "/api/orders/:orderId",
  requireAuthMiddleware,
  [body("orderId").not().isEmpty().withMessage("orderId is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new BadRequestError("Order not found");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("Not authorized");
    }
    order.status = OrderStatus.Cancelled;
    order.save();

    return res.status(200).send(order);
  }
);

export { router as deleteOrderRouter };
