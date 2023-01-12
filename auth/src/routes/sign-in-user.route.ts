import express from "express";

const router = express.Router();

router.post("/api/users/sign-in", (req, res) => {
  res.send("Current user!");
});

export { router as signInUserRouter };
