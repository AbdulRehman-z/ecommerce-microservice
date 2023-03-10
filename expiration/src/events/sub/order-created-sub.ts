import { OrderCreatedEvent, Subscriber, Subjects } from "@abdulrehmanz/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

class OrderCreatedsubscriber extends Subscriber<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "expiration-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    await expirationQueue.add({
      orderId: data.id,
    });
    msg.ack();
  }
}
export { OrderCreatedsubscriber };
