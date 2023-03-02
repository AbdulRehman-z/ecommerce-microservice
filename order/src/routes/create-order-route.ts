import express, { Request, Response } from "express";
import { requireAuthMiddleware, validateRequest } from "@abdulrehmanz/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuthMiddleware,
  [body("productId").not().isEmpty().withMessage("Product Id is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({ message: "Hi there" });
  }
);

export { router as createOrderRouter };
