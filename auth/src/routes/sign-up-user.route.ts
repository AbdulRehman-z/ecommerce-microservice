import express, { Request, Response } from "express";
import { validationResult, body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestDatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/User.model";

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
  async (req: Request, res: Response) => {
    // console.log("req.body: ", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("user: ", user);

    if (user) {
      throw new BadRequestError(
        "User with this email already exists. Please try another email."
      );
    }

    const newUser = User.build({ email, password });
    console.log("newUser: ", newUser);
    await newUser.save();
    res.status(201).send(newUser);
    // throw new RequestDatabaseConnectionError();
  }
);

export { router as signUpUserRouter };
