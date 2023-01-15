import { beforeAll, beforeEach } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../app";
import mongoose from "mongoose";

let mongo;

beforeAll(async () => {
  // called once before all tests run
  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();
  mongoose.connect(mongoURI);

  // cleanup function , called after all tests run (equivalent to afterAll)
  return async () => {
    await mongo.stop();
    await mongoose.connection.close();
  };
});

// Run this before starting each test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
