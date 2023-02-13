import { requireAuthMiddleware } from "@abdulrehmanz/common";
import express from "express";

const router = express.Router();

router.get("/api/products", requireAuthMiddleware, (req, res) => {
  console.log("hello");
  return res.sendStatus(200);
});
export { router as createTicketRouter };
