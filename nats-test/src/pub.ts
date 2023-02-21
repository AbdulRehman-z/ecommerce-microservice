const nats = require("node-nats-streaming");

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = JSON.stringify({
    id: "1",
    product: "white T-shirt",
    price: 20,
  });

  stan.publish("product:created", data, () => {
    console.log("Event published");
  });
});
