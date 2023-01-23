import express from "express";
import "express-async-errors";
import { connectDB } from "./services/mongo.service";

import { signUpUserRouter } from "./routes/sign-up-user.route";
import { signInUserRouter } from "./routes/sign-in-user.route";
import { signOutUserRouter } from "./routes/sign-out-user.route";
import { currentUserRouter } from "./routes/current-user.route";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware";
import cookieSession from "cookie-session";

/* configure express app */
export const app = express();
app.use(express.json());

/* cookie session */
app.set("trust proxy", true); // trust first proxy
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== "test", // only use cookies over https
  })
);

/* auth routes */
app.use(signUpUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(currentUserRouter);

// app.all("*", async (req, res) => {
//   try {
//   } catch (_) {
//     throw new RouteNotFoundError();
//   }
// });

/* error handling */
app.use(errorHandlerMiddleware);

/* start server */
app.listen(3000, async () => {
  await connectDB();
  console.log("Listening on port 3000");
});

// "start":"ts-node-dev --poll src/index.ts"  // this is for ts-node-dev
