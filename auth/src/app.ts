import express from "express";
import { signUpUserRouter } from "./routes/signUpUser.route";
import { signInUserRouter } from "./routes/signInUser.route";
import { signOutUserRouter } from "./routes/signOutUser.route";
import { currentUserRouter } from "./routes/currentUser.route";
import { errorHandlerMiddleware } from "./errors/error-handler";

/* configure express app */
const app = express();
app.use(express.json());

/* auth routes */
app.use(signUpUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(currentUserRouter);

/* error handling */
app.use(errorHandlerMiddleware);

/* start server */
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// "start":"ts-node-dev --poll src/index.ts"  // this is for ts-node-dev
