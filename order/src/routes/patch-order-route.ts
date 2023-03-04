import {
  BadRequestError,
  NotAuthorizedError,
  requireAuthMiddleware,
  validateRequest,
  OrderStatus,
} from "@abdulrehmanz/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { OrderCancelLedPublisher } from "../events/pub/order-cancelled-pub";
import { Order } from "../models/order.model";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.patch(
  "/api/orders/:orderId",
  requireAuthMiddleware,
  [body("orderId").not().isEmpty().withMessage("orderId is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("product");

    if (!order) {
      throw new BadRequestError("Order not found");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("Not authorized");
    }
    order.status = OrderStatus.Cancelled;
    order.save();

    await new OrderCancelLedPublisher(natsWrapper.client).publish({
      id: order.id,
      product: {
        id: order.product.id,
      },
    });

    return res.status(200).send(order);
  }
);

export { router as deleteOrderRouter };
