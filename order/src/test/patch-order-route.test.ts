import request from "supertest";
import { app } from "../app";
import { Order } from "../models/order.model";
import { OrderStatus } from "@abdulrehmanz/common";
import { Product } from "../models/product.model";

it("marks an order as cancelled", async () => {
  // create a ticket with Product Model
  const ticket = Product.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = await global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits a order cancelled event");
