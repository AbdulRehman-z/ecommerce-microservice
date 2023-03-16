import { OrderStatus } from "@abdulrehmanz/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order.model";
import { safepay } from "../../__mocks__/safepay";

jest.mock("../../__mocks__/safepay");

it("return 404, if order is not found", async () => {
  await request(app)
    .post("/api/payment")
    .set("Cookie", await global.signin())
    .send({
      orderId: new mongoose.Types.ObjectId().toHexString(),
      token: "asdai",
    })
    .expect(404);
});

it("return 401, if order does not belong to user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin())
    .send({
      token: "asdasd",
      orderId: order.id,
    })
    .expect(200);
});

it("return 400, if order is cancelled", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin(userId))
    .send({
      token: "asdasd",
      orderId: order.id,
    })
    .expect(400);
});

it("return 201, if payment is successful", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", await global.signin(userId))
    .send({
      orderId: order.id,
    })
    .expect(201);

  const safepayOptions = (safepay.payments.create as jest.Mock).mock
    .calls[0][0];

  expect(safepayOptions.c).toEqual({
    amount: order.price * 100,
    currency: "USD",
  });
});
