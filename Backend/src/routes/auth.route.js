import { Router } from "express";
import {
  getMe,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { registerValidation } from "../validators/register.validator.js";
import { loginValidation } from "../validators/login.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, registerUser);
authRouter.post("/login", loginValidation, loginUser);
authRouter.get("/get-me", authMiddleware, getMe);

export default authRouter;
