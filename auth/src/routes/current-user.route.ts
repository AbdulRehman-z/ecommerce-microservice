import express from "express";
import { currentUserMiddleware } from "../middlewares/current-user-middleware";

const router = express.Router();

router.get("/api/users/currentuser", currentUserMiddleware, (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
