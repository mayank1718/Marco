import { body, validationResult } from "express-validator";

function validation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }
  next();
}

export const registerValidation = [
  body("username")
    .isString()
    .withMessage("username should be string")
    .notEmpty()
    .isLength({ min: 2, max: 20 })
    .withMessage("username atleast 2 character")
    .withMessage("username is required"),
  body("email")
    .notEmpty()
    .withMessage("email-address is required")
    .isEmail()
    .withMessage("email should be valid form"),
  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("password should be 6 to 16 character"),
  validation,
];
