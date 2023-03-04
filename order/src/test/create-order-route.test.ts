import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { Order } from "../models/order.model";
import { OrderStatus } from "@abdulrehmanz/common";
import { Product } from "../models/product.model";

it("returns an error if the product does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", await global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the product is already reserved", async () => {
  const product = Product.build({
    title: "white-shirt",
    price: 20,
  });
  await product.save();
  const order = Order.build({
    product,
    userId: "laskdflkajsdf",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", await global.signin())
    .send({ ticketId: product.id })
    .expect(400);
});

it("reserves a product", async () => {
  const product = Product.build({
    title: "white-shirt",
    price: 20,
  });
  await product.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", await global.signin())
    .send({ ticketId: product.id })
    .expect(201);
});
