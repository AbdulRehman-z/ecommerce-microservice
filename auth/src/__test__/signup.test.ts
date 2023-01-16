import request from "supertest";
import { app } from "../app";

it("returns a 201 on successful signup", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "p12345",
    })
    .expect(201);
});

it("returns a 400 with an invalid credentials", async () => {
  return await request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "1",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "p12345",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
