import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/chats",
  withCredentials: true,
});

export async function sendMessage({ message , chat }) {
  const response = await api.post("/message", { message ,chat });
  return response.data;
}

export async function getChat() {
  const response = await api.get("/");
  return response.data;
}

export async function getMessage({ chatId }) {
  const response = await api.get(`/${chatId}/message`);
  return response.data;
}

export async function clearChats() {
  const response = await api.delete("/clear");
  return response.data;
}