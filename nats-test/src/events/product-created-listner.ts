import { Listener } from "./base-listner";
import { Message } from "node-nats-streaming";

class ProductCreatedListener extends Listener {
  subject: string = "product:created";
  queueGroupName: string = "payments-service";

  onMessage(data: any, msg: Message): void {
    console.log("Event data!", data);

    msg.ack();
  }
}

export { ProductCreatedListener };
