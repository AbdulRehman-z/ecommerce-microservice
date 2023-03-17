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
import { Payment } from "../models/payment.model";
import { stripe } from "../stripe";

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
    const { orderId } = req.body;
    // find order by id
    const order = await Order.findById(orderId);

    // if order is not found
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    // if order is not belong to user
    if (order.userId !== req.currentUser!.id) {
      throw new BadRequestError("Not authorized");
    }

    // if order is cancelled
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Order is cancelled");
    }

    // create payment
    const charge = await stripe.charges.create({
      amount: order.price * 100,
      currency: "USD",
      source: "tok_mastercard",
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();

    res.status(201).send({ success: true });
  }
);
