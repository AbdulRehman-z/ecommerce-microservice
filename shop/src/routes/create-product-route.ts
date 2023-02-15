import { requireAuthMiddleware } from "@abdulrehmanz/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.post(
  "/api/products",
  requireAuthMiddleware,
  (req: Request, res: Response) => {
    console.log("hello");
    return res.sendStatus(200);
  }
);
export { router as createProductRouter };
