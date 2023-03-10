import {
  OrderCancelledEvent,
  Publisher,
  Subscriber,
  Subjects,
} from "@abdulrehmanz/common";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product.model";
import { ProductUpdatedPublisher } from "../pub/product-updated-pub";

class OrderCancelledSubscriber extends Subscriber<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = "orders-service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // find the product that the order is trying to cancel
    const product = await Product.findById(data.product.id);
    if (!product) {
      throw new Error("Product not found");
    }

    // mark the product as being not reserved by setting its orderId property to undefined
    product.set({ orderId: undefined });
    // save the product
    await product.save();
    // emit an ProductUpdatedEvent
    await new ProductUpdatedPublisher(this.client).publish({
      id: product.id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version,
      orderId: product.orderId,
    });
    // ack the message
    msg.ack();
  }
}

export { OrderCancelledSubscriber };
