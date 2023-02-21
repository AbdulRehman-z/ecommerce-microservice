import nats from "node-nats-streaming";
import { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Subscriber connected to NATS");
  const subscription = stan.subscribe(
    "ticket:created",
    "order-serice-queue-group"
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    console.log(`Event #${msg.getSequence()}\n. Payload: ${data}`);
    console.log(
      "---------------------------------------------------------------------"
    );
  });
});
