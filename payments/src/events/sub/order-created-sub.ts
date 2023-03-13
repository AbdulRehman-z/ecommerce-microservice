import { OrderCreatedEvent, Subjects, Subscriber } from "@abdulrehmanz/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order.model";

class OrderCreatedSubscriber extends Subscriber<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "payments-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.product.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}

export { OrderCreatedSubscriber };
