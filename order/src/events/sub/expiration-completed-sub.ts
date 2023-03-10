import { Message } from "node-nats-streaming";
import {
  Subjects,
  Publisher,
  ExpirationTimeCompletedEvent,
  OrderStatus,
} from "@abdulrehmanz/common";
import { OrderCancelLedPublisher } from "../pub/order-cancelled-pub";
import { Order } from "../../models/order.model";

export class ExpirationTimeCompletedPublisher extends Publisher<ExpirationTimeCompletedEvent> {
  readonly subject = Subjects.ExpirationTimeCompleted;
  queueGroupName = "expiration-service";

  async onMessage(data: ExpirationTimeCompletedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("product");

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Cancelled,
    });

    await order.save();

    await new OrderCancelLedPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      product: {
        id: order.product.id,
      },
    });
  }
}
