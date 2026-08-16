import { Server } from "socket.io";
import app from "./src/app.js";
import { connectToDb } from "./src/config/database.js";
import http from "http";
import { initSocket } from "./src/services/socket.service.js";

const httpServer = http.createServer(app);
await initSocket(httpServer);

connectToDb();
httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
