import React, { useEffect, useState } from "react";
import Reply from "../components/Reply";
import TrendingTopics from "../components/TrendingTopics";
import History from "../components/History";
import SearchField from "../components/SearchField";
import { useChat } from "../hooks/useChat";

const topics = ["AI agents", "Productivity", "Startups", "Design systems"];

const Dashboard = () => {
  const {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChat,
    currentChat,
    chat,
    handleClearChats,
    currentChatId,
    handleGetMessage,
  } = useChat();
  const [message, setMessage] = useState("");
  const aiMessages = currentChat[currentChatId]?.messages?.filter(
    (message) => message.role === "ai",
  );
  const latestMessage = aiMessages?.[aiMessages.length - 1];
  useEffect(() => {
    initializeSocketConnection();
    handleGetChat();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage({ message, chatId: currentChatId });
    setMessage("");
  };
  const handleOpenMessage = ( chatId ) => {
    handleGetMessage({ chatId });
  };
  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <div className="mx-auto max-w-md px-4 pb-10 pt-4 sm:max-w-5xl sm:px-6">
        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-sm font-bold text-violet-200 ring-1 ring-violet-400/30">
              P
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
                Perplexity
              </p>
              <h1 className="text-base font-semibold text-white">Discover</h1>
            </div>
          </div>
        </header>

        {/* AI Reply */}
        <Reply latestMessage={latestMessage} />

        <main className="mt-5 space-y-4">
          {/* Search field */}
          <SearchField
            handleSubmit={handleSubmit}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* trending topics */}
          <TrendingTopics topics={topics} />

          {/* history */}
          <History handleClearChats={handleClearChats} chat={chat} handleOpenMessage={handleOpenMessage} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
