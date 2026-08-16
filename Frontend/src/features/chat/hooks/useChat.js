import { useContext } from "react";
import { initializeSocketConnection } from "../services/socket.service";
import { getChat, getMessage, sendMessage } from "../services/api.service";
import { ChatContext } from "../ChatContext";

export const useChat = () => {
  const Context = useContext(ChatContext);
  const {
    chat,
    setChat,
    setCurrentChatId,
    setMessages,
    setCurrentChat,
    currentChat,
    messages,
    currentChatId,
  } = Context;

  const handleSendMessage = async ({ message, chatId }) => {
    console.log(chatId);
    try {
      const data = await sendMessage({ message, chat: chatId });

      const { chat: newChat, aiMessage } = data;

      const newChatId = newChat._id;
      if (!chatId) {
        setChat((prev) => ({
          ...prev,
          [newChatId]: {
            ...newChat,
          },
        }));
      }
      setCurrentChatId(newChatId);

      setCurrentChat((prev) => ({
        ...prev,
        [newChatId]: {
          ...prev[newChatId],
          messages: [
            ...(prev[newChatId]?.messages || []),
            {
              content: message,
              role: "user",
            },
            {
              content: aiMessage.content,
              role: aiMessage.role,
            },
          ],
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  async function handleGetChat() {
    try {
      const data = await getChat();
      const chatObject = data.chat.reduce((acc, item) => {
        acc[item._id] = {
          ...item,
          messages: [],
        };
        return acc;
      }, {});
      setChat(chatObject);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetMessage({ chatId }) {
    const data = await getMessage({ chatId });
    console.log(data);
    const formattedMessages = data.message.map((msg) => ({
      content: msg.content,
      role: msg.role,
      _id: msg._id,
    }));
    setCurrentChat((prev) => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        messages: formattedMessages,
      },
    }));
    setCurrentChatId(chatId);
  }
  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChat,
    currentChat,
    handleGetMessage,
    chat,
    messages,
    currentChatId,
  };
};
