import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { connectDB } from "./services/mongo.service";

/* start server */
app.listen(3000, async () => {
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("CLUSTER_ID must be defined");
  if (!process.env.NATS_CLIENT_ID) throw new Error("CLIENT_ID must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must be defined");

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );
  natsWrapper.client.on("close", () => {
    process.exit();
  });

  process.on("SIGINT", () => natsWrapper.client.close());

  process.on("SIGTERM", () => natsWrapper.client.close());

  await connectDB();
  console.log("Listening on port 3000");
});
