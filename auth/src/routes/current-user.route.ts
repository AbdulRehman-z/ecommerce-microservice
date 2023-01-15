import express from "express";
import jwt from "jsonwebtoken";
import { currentUserMiddleware } from "../middlewares/current-user-middleware";
import { requireAuthMiddleware } from "../middlewares/require-auth-middleware";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUserMiddleware,
  requireAuthMiddleware,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
