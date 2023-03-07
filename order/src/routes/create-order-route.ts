import express, { Request, Response } from "express";
import {
  BadRequestError,
  requireAuthMiddleware,
  validateRequest,
} from "@abdulrehmanz/common";
import { body } from "express-validator";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { OrderStatus } from "@abdulrehmanz/common";
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatedPublisher } from "../events/pub/order-created-pub";

const router = express.Router();

const ORDER_EXPIRATION_MINUTES = 15 * 60;

router.post(
  "/api/orders",
  requireAuthMiddleware,
  [body("productId").not().isEmpty().withMessage("Product Id is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    // check if product exists
    console.log("-----------------------------------");

    console.log("Product id: ", req.body.productId);
    console.log("-----------------------------------");
    const product = await Product.findById(req.body.productId);

    if (!product) {
      throw new BadRequestError("Product not found");
    }

    // check if product is not already reserved by anyone
    const isReserved = await product.isReserved();
    if (isReserved) {
      throw new BadRequestError("Product is already reserved");
    }
    // set expiration time of 15 minutes
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + ORDER_EXPIRATION_MINUTES);

    // create order
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      product,
    });
    await order.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      product: {
        id: product.id,
        price: product.price,
      },
    });

    return res.status(201).send(order);
  }
);

export { router as createOrderRouter };
