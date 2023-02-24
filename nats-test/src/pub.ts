import nats from "node-nats-streaming";
import { ProductCreatedPublisher } from "./events/product-created-pub.ts";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  new ProductCreatedPublisher(stan).publish(data);
});
