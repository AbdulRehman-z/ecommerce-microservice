import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/products/${id}`).send().expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const title = "concert";
  const price = 20;

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", await global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
