import { NotFoundError, requireAuthMiddleware } from "@abdulrehmanz/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order.model";

const router = express.Router();

router.get(
  "/api/orders",
  requireAuthMiddleware,
  async (req: Request, res: Response) => {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate("product");

    if (!orders) {
      throw new NotFoundError("No orders found");
    }

    return res.status(200).send(orders);
  }
);

export { router as getAllOrdersRouter };
