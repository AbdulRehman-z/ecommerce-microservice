import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/User.model";
import jwt from "jsonwebtoken";
import { validateRequest } from "@abdulrehmanz/common";
import { BadRequestError } from "@abdulrehmanz/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest /* validation middleware which validates the password and email that user enters  */,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new BadRequestError(
        "User with this email already exists. Please try another email."
      );
    }

    const newUser = User.build({ email, password });
    await newUser.save();

    // sign jwt with user id and email
    const userJwt = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY
    );

    // create a session obj with jwt property and attach it to the request obj
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(newUser);
    // throw new RequestDatabaseConnectionError();
  }
);

export { router as signUpUserRouter };
