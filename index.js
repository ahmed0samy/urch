const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const connectedUsers = new Map();
const userSuspicionMap = new Map();

// ✅ Correct Google Script Web App URL (already deployed with "Anyone" access)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiSVDoWwcWJuIBRDyNwgPIuY3lGBvg5FH14qPm1FEa2IPvAF3fXMtfeHwnRytAkyX5NA/exec";

async function verifyWithGoogleSheet(email) {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const text = await res.text();
    console.log("📥 Raw response:", text);

    const json = JSON.parse(text);
    console.log("✅ Google Sheet Response:", json);
    return json;
  } catch (err) {
    console.error("❌ Failed to verify email:", err.message);
    return null;
  }
}

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

  socket.on("exam-start", async (userId, callback) => {
    if (!userId || typeof userId !== "string" || !userId.includes("@")) {
      console.log(`❌ Invalid email: ${userId}`);
      return callback({ allowed: false });
    }

    const result = await verifyWithGoogleSheet(userId);

    if (!result || !result.success) {
      console.log(`❌ Not allowed: ${userId} (${result?.reason || "unknown error"})`);
      return callback({ allowed: false, reason: result?.reason });
    }

    console.log(`✅ User allowed: ${userId}`);
    callback({ allowed: true, link: result.link });
  });
});

app.get('/user', (req, res) => {
  res.sendFile(__dirname + '/public' + '/user.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
