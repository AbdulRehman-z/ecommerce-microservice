import nats from "node-nats-streaming";
import { Message } from "node-nats-streaming";
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
