import {
  Subscriber,
  ProductCreatedEvent,
  Subjects,
} from "@abdulrehmanz/common";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product.model";

export class ProductCreatedSubscriber extends Subscriber<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
  queueGroupName = "orders-service";

  async onMessage(data: ProductCreatedEvent["data"], msg: Message) {
    console.log("Data: ", data);
    const { id, title, price } = data;

    const product = Product.build({
      id,
      title,
      price,
    });
    await product.save();

    msg.ack();
  }
}
