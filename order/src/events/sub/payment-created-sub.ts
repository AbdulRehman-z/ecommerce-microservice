import {
  PaymentCreatedEvent,
  OrderStatus,
  Subscriber,
  Subjects,
  NotFoundError,
} from "@abdulrehmanz/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order.model";

export class PaymentCreatedSubscriber extends Subscriber<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = "order-service";

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    // if order is not found
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.set({ status: OrderStatus.Complete });
    await order.save();

    msg.ack();
  }
}
