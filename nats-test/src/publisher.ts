import nats from "node-nats-streaming";
import { ProductCreatedPublisher } from "./events/product-created-publisher";

console.clear();

const stan = nats.connect("ticketing", "bc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new ProductCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: '$20',
  // });

  // stan.publish('TicketCreated', data, () => {
  //   console.log('Event published');
  // });
});
