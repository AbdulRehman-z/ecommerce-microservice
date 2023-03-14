import { Message } from "node-nats-streaming";
import {
  BadRequestError,
  OrderCancelledEvent,
  Subjects,
  OrderStatus,
  Subscriber,
} from "@abdulrehmanz/common";
import { Order } from "../../models/order.model";

class OrderCancelledSubscriber extends Subscriber<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = "payments-service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await Order.findByIdAndPrevVersion(data);

    if (!order) {
      throw new BadRequestError("Order not found");
    }

    await order
      .set({
        status: OrderStatus.Cancelled,
      })
      .save();

    msg.ack();
  }
}

export { OrderCancelledSubscriber };
