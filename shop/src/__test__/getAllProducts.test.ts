import request from "supertest";
import { app } from "../app";

const createTicket = async () => {
  return request(app)
    .post("/api/products")
    .set("Cookie", await global.signin())
    .send({
      title: "asldkf",
      price: 20,
    });
};

it("can fetch a list of products", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/products").send().expect(200);

  expect(response.body.length).toEqual(3);
});
