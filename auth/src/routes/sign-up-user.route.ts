import express, { Request, Response } from "express";
import { validationResult, body } from "express-validator";
import { RequestDatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

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
    const { email, password } = req.body;

    const errors = validationResult(req);
    console.log("Errors:", errors.array());
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    throw new RequestDatabaseConnectionError();
    res.send({});
  }
);

export { router as signUpUserRouter };
