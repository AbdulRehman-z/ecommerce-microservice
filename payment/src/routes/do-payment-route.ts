import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuthMiddleware,
  validateRequest,
} from "@abdulrehmanz/common";
import express, { Response, Request } from "express";
import { body } from "express-validator";
import { Order } from "../models/order.model";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuthMiddleware,
  [
    body("token").not().isEmpty().withMessage("Token is missing"),
    body("orderId").not().isEmpty().withMessage("Order Id is missing"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new BadRequestError("Not authorized");
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Order is cancelled");
    }

    res.status(201).send({ success: true });
  }
);
