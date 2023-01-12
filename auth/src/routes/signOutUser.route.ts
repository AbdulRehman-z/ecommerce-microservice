import express from "express";

const router = express.Router();

router.get("/api/users/sign-out", (req, res) => {
  res.send("sign-out user!");
});

export { router as signOutUserRouter };
