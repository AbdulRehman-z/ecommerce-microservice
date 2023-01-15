import { app } from "./app";
import { connectDB } from "./services/mongo.service";
/* start server */
app.listen(3000, async () => {
  await connectDB();
  console.log("Listening on port 3000");
});
