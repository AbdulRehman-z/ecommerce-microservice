import nats from "node-nats-streaming";
import { Message } from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Subscriber connected to NATS");
  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg: Message) => {
    console.log("Message received");
  });
});
