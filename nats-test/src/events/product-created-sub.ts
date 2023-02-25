import { Listener } from "./base-sub";
import { Message } from "node-nats-streaming";
import { ProductCreatedEvent } from "./product-created-event";
import { Subjects } from "./subjects";

class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
  queueGroupName: string = "payments-service";

  onMessage(data: any, msg: Message): void {
    console.log("Event data!", data);

    msg.ack();
  }
}

export { ProductCreatedListener };
