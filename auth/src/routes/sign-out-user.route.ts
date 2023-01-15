import express from "express";

const router = express.Router();

router.get("/api/users/sign-out", (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signOutUserRouter };
