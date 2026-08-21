import mongoose from "mongoose";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateMessage, generateTitle } from "../services/ai.service.js";


export async function sendMessageToAI(req, res) {
  const userId = req.user.userId;
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
  const aiResponse = await generateMessage(messages, userId);

  // Save AI response
  const aiMessage = await messageModel.create({
    chat: currentChatId || chatId,
    content: aiResponse,
    role: "ai",
  });

  res.status(201).json({
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
  if (message.length === 0) {
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

export async function clearChats(req, res) {
  const session = await mongoose.startSession();

  try {
    const { userId } = req.user;

    session.startTransaction();

    const chats = await chatModel
      .find({ user: userId })
      .select("_id")
      .session(session);

    const chatIds = chats.map((chat) => chat._id);

    await messageModel.deleteMany(
      {
        chat: { $in: chatIds },
      },
      { session },
    );

    await chatModel.deleteMany(
      {
        user: userId,
      },
      { session },
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Chats deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();

    console.error("Clear chats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete chats",
    });
  } finally {
    await session.endSession();
  }
}