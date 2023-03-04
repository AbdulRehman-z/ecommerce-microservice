import request from "supertest";
import { app } from "../app";
import { Order } from "../models/order.model";
import { OrderStatus } from "@abdulrehmanz/common";
import { natsWrapper } from "../nats-wrapper";
import { Product } from "../models/product.model";

it("marks an order as cancelled", async () => {
  // create a product with Product Model
  const product = Product.build({
    title: "concert",
    price: 20,
  });
  await product.save();

  const user = await global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: product.id })
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

it("emits a order cancelled event", async () => {
  const product = Product.build({
    title: "concert",
    price: 20,
  });
  await product.save();

  const user = await global.signin();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: product.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
