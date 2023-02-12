import express from "express";
import "express-async-errors";
import { connectDB } from "./services/mongo.service";
import { createTicketRouter } from "./routes/create-ticket-route";

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
    secure: process.env.NODE_ENV !== "test", // only use cookies over https
  })
);

/* routes */
app.use(createTicketRouter);

/* error handling */
app.use(errorHandlerMiddleware);

/* start server */
app.listen(3000, async () => {
  await connectDB();
  console.log("Listening on port 3000");
});

// "start":"ts-node-dev --poll src/index.ts"  // this is for ts-node-dev
