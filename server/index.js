const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const connectedUsers = new Map();

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  socket.on("user-join", (userId) => {
    connectedUsers.set(userId, socket.id);
    io.emit("active-users", Array.from(connectedUsers.keys()));
  });

  socket.on("video-chunk", ({ userId, chunk }) => {
    io.to("admin-room").emit("video-chunk", { userId, chunk });
  });

  socket.on("admin-join", () => {
    socket.join("admin-room");
    socket.emit("active-users", Array.from(connectedUsers.keys()));
  });

  socket.on("disconnect", () => {
    for (const [userId, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    io.emit("active-users", Array.from(connectedUsers.keys()));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
