import nats from "node-nats-streaming";
import { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("close", () => {
  console.log("NATS connection closed!");
  process.exit();
});

stan.on("connect", () => {
  console.log("Subscriber connected to NATS");

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("order-service");

  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-order-service",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    console.log(`Event #${msg.getSequence()}\n. Payload: ${data}`);
    console.log(
      "---------------------------------------------------------------------"
    );

    msg.ack();
  });
});

// close the connection when the process is terminated
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

abstract class Listner {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 1000 * 5;
  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName("order-service");
  }

  listen() {
    const subscription = this.client.subscribe(
      "product:created",
      "queue-group-order-service",
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Event #${msg.getSequence()}\n. Payload: ${this.subject}`);
      console.log(
        "---------------------------------------------------------------------"
      );

      const parsedData = this.parseMessage(msg);

      return this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString());
  }
}
