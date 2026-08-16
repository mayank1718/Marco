import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./apps/App";
import { AuthContextProvider } from "./features/auth/auth.context";
import { ChatContextProvider } from "./features/chat/ChatContext";



createRoot(document.getElementById("root")).render(
  <ChatContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ChatContextProvider>,
);
