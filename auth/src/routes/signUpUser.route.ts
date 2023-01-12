import express, { Request, Response } from "express";
import { validationResult, body } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/sign-up",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    console.log("req.body: ", req.body);
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    res.send({
      email,
      password,
    });
  }
);

export { router as signUpUserRouter };
