import express from "express";
import { currentUserMiddleware } from "../middlewares/current-user-middleware";
import { requireAuthMiddleware } from "../middlewares/require-auth-middleware";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUserMiddleware,
  requireAuthMiddleware,
  (req, res) => {
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
