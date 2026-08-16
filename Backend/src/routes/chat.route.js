import { Router } from "express";
import {
  getChat,
  getMessage,
  sendMessageToAI,
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authMiddleware, sendMessageToAI);

chatRouter.get("/", authMiddleware, getChat);

chatRouter.get("/:chatId/message", authMiddleware, getMessage);

export default chatRouter;
