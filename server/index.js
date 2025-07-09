const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../public")));
const connectedUsers = new Map();
const userSuspicionMap = new Map(); // New: tracks if user switched tabs

io.on("connection", (socket) => {
  socket.on("user-join", (userId) => {
    connectedUsers.set(userId, socket.id);
    io.emit("active-users", Array.from(connectedUsers.keys()));
  });

  socket.on("video-chunk", ({ userId, chunk }) => {
    io.to("admin-room").emit("video-chunk", { userId, chunk });
  });

  socket.on("user-suspicion", ({ userId, isSuspicious }) => {
    userSuspicionMap.set(userId, isSuspicious);
  });

  socket.on("admin-join", () => {
    socket.join("admin-room");
    socket.emit("active-users", Array.from(connectedUsers.keys()));
  });

  socket.on("disconnect", () => {
    for (const [userId, id] of connectedUsers.entries()) {
      if (id === socket.id) {
        connectedUsers.delete(userId);
        const suspicious = userSuspicionMap.get(userId) || 0;
        io.to("admin-room").emit("user-disconnected", { userId, suspicious });
        break;
      }
    }
    io.emit("active-users", Array.from(connectedUsers.keys()));
  });
});
app.get("/ping", (req, res) => {
  res.send("pong");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
