import { Message } from "node-nats-streaming";
import { Product } from "../../models/product.model";
import { Listener, ProductUpdatedEvent, Subjects } from "@abdulrehmanz/common";

export class ProductUpdatedSubscriber extends Listener<ProductUpdatedEvent> {
  readonly subject = Subjects.ProductUpdated;
  queueGroupName = "orders-service";

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    const product = await Product.findById(data);

    if (!product) {
      throw new Error("Product not found");
    }

    const { title, price } = data;
    product.set({ title, price });
    await product.save();

    msg.ack();
  }
}
