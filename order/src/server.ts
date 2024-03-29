import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { connectDB } from "./services/mongo.service";
import { ProductCreatedSubscriber } from "./events/sub/product-created-sub";
import { ProductUpdatedSubscriber } from "./events/sub/product-updated-sub";
import { ExpirationTimeCompletedSubscriber } from "./events/sub/expiration-completed-sub";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL,
      10000
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new ProductCreatedSubscriber(natsWrapper.client).listen();
    new ProductUpdatedSubscriber(natsWrapper.client).listen();
    new ExpirationTimeCompletedSubscriber(natsWrapper.client).listen();
    new ProductCreatedSubscriber(natsWrapper.client).listen();

    await connectDB();
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
