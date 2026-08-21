import { Router } from "express";
import {
  clearChats,
  getChat,
  getMessage,
  sendMessageToAI,
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authMiddleware, sendMessageToAI);

chatRouter.get("/", authMiddleware, getChat);

chatRouter.delete("/clear", authMiddleware, clearChats);

chatRouter.get("/:chatId/message", authMiddleware, getMessage);

export default chatRouter;
