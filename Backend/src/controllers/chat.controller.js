import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateMessage, generateTitle } from "../services/ai.service.js";

export async function sendMessageToAI(req, res) {
  const { message, chat: chatId } = req.body;
  let chat;
  // New chat
  if (!chatId) {
    const title = await generateTitle(message);
    chat = await chatModel.create({
      user: req.user.userId,
      title,
    });
  } else {
    // Existing chat
    chat = await chatModel.findOne({
      _id: chatId,
      user: req.user.userId,
    });
  }
  const currentChatId = chat._id;
  // Save current user message FIRST
  const userMessage = await messageModel.create({
    chat: currentChatId || chatId,
    content: message,
    role: "user",
  });

  // Get complete conversation history
  const messages = await messageModel
    .find({ chat: currentChatId || chatId })
    .sort({ createdAt: 1 });

  // Send complete history to AI
  const aiResponse = await generateMessage(messages);

  // Save AI response
  const aiMessage = await messageModel.create({
    chat: currentChatId || chatId,
    content: aiResponse,
    role: "ai",
  });

  res.json({
    chat,
    userMessage,
    aiMessage,
  });
}

export async function getChat(req, res) {
  const chat = await chatModel.find({ user: req.user.userId });
  if (!chat) {
    return res.status(404).json({
      message: "chat not found",
      success: false,
    });
  }
  res.status(200).json({
    message: "chat fetched successfully",
    chat,
    success: true,
  });
}

export async function getMessage(req, res) {
  const { chatId } = req.params;
  const chat = await chatModel.findOne({ _id: chatId, user: req.user.userId });
  if (!chat) {
    return res.status(404).json({
      message: "chat not found",
    });
  }
  const message = await messageModel.find({ chat: chat._id });
  if (!message) {
    return res.status(404).json({
      message: "message not found",
      success: false,
    });
  }
  return res.status(200).json({
    message: "message fetched successfully",
    message,
    success: true,
  });
}
