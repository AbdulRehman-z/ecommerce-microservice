import express from "express";
import "express-async-errors";
import { connectDB } from "./services/mongo.service";

import { signUpUserRouter } from "./routes/sign-up-user.route";
import { signInUserRouter } from "./routes/sign-in-user.route";
import { signOutUserRouter } from "./routes/sign-out-user.route";
import { currentUserRouter } from "./routes/current-user.route";
import { errorHandlerMiddleware } from "@abdulrehmanz/common";
import cookieSession from "cookie-session";

/* configure express app */
export const app = express();
app.use(express.json());

/* cookie session */
app.set("trust proxy", true); // trust first proxy
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: false,
  })
);

/* auth routes */
app.use(signUpUserRouter);
app.use(signInUserRouter);
app.use(signOutUserRouter);
app.use(currentUserRouter);

/* error handling */
app.use(errorHandlerMiddleware);
