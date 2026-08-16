import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chat, setChat] = useState([])
  const [currentChat, setCurrentChat] = useState([])
  return (
    <ChatContext.Provider
      value={{
        setCurrentChat,
        currentChat,
        chat,
        setChat,
        setCurrentChatId,
        setMessages,
        messages,
        currentChatId,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
