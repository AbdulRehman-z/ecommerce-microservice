import express from "express";
import "express-async-errors";

import { signUpUserRouter } from "./routes/sign-up-user.route";
import { signInUserRouter } from "./routes/sign-in-user.route";
import { signOutUserRouter } from "./routes/sign-out-user.route";
import { currentUserRouter } from "./routes/current-user.route";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { RouteNotFoundError } from "./errors/route-not-found-error";

/* configure express app */
const app = express();
app.use(express.json());

/* auth routes */
app.use(signUpUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(currentUserRouter);

app.all("*", async (req, res) => {
  try {
  } catch (_) {
    throw new RouteNotFoundError();
  }
});

/* error handling */
app.use(errorHandlerMiddleware);

/* start server */
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// "start":"ts-node-dev --poll src/index.ts"  // this is for ts-node-dev
