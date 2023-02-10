import express from "express";
import { currentUserMiddleware } from "@abdulrehmanz/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUserMiddleware, (req, res) => {
  res.status(200).send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
