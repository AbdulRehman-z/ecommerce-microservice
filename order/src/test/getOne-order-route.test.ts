import request from "supertest";
import { app } from "../app";
import { Product } from "../models/product.model";

it("fetches the order", async () => {
  // Create a ticket
  const ticket = Product.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = await global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if one user tries to fetch another users order", async () => {
  // Create a ticket
  const ticket = Product.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = await global.signin();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", await global.signin())
    .send()
    .expect(401);
});
