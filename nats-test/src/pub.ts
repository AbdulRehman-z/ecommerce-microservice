import nats from "node-nats-streaming";
import { ProductCreatedPublisher } from "./events/product-created-pub";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const data = {
    id: "123",
    title: "concert",
    price: 20,
  };

  const publisher = new ProductCreatedPublisher(stan);
  await publisher.publish(data);
});
