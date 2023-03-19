import express from "express";
import { body } from "express-validator";
import { NotFoundError, validateRequest } from "@abdulrehmanz/common";
import { BadRequestError } from "@abdulrehmanz/common";
import { User } from "../models/User.model";
import { Password } from "../services/password-hashing.service";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  body("email")
    .isEmail()
    .withMessage(
      "Please enter a valid email. For example hamzakhan10@gmail.com"
    ),
  body("passowrd")
    .trim()
    .isEmpty()
    .withMessage("Password must be between 4 and 20 characters"),
  validateRequest /* validation middleware which validates the password and email that user enters  */,
  async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // validate user
    if (!existingUser) {
      throw new NotFoundError(
        "You are not registered. Try registering your email first"
      );
    }

    // validate password
    const isValidPassword = Password.validatePassowrd(
      existingUser.password,
      password
    );
    if (!isValidPassword) {
      throw new BadRequestError("Please provide valid credentials");
    }

    // issue jwt

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInUserRouter };
