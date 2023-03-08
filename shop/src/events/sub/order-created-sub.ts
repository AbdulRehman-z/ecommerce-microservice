import { OrderCreatedEvent, Subscriber, Subjects } from "@abdulrehmanz/common";
import { ProductUpdatedPublisher } from "../pub/product-updated-pub";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product.model";

class OrderCreatedsubscriber extends Subscriber<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = "orders-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // find the product that the order is reserving
    const product = await Product.findById(data.product.id);
    // if no product, throw error
    if (!product) {
      throw new Error("Product not found");
    }
    // mark the product as being reserved by setting its orderId property
    product.set({ orderId: data.id });
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

export { OrderCreatedsubscriber };
