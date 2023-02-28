import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { connectDB } from "./services/mongo.service";

/* start server */
app.listen(3000, async () => {
  await natsWrapper.connect("ticketing", "abc", "http://nats-service:4222");
  natsWrapper.client.on("close", () => {
    process.exit();
  });

  process.on("SIGINT", () => natsWrapper.client.close());

  process.on("SIGTERM", () => natsWrapper.client.close());

  await connectDB();
  console.log("Listening on port 3000");
});
