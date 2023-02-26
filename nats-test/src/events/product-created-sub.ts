import { Message } from "node-nats-streaming";
import { Subjects } from "../../../common/src/events/subjects";
import { ProductCreatedEvent } from "@abdulrehmanz/common";
import { Listener } from "../../../common/src/events/base-sub";

class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
  queueGroupName: string = "payments-service";

  onMessage(data: any, msg: Message): void {
    console.log("Event data!", data);

    msg.ack();
  }
}

export { ProductCreatedListener };
