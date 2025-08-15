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
const userHeartbeats = new Map();

// ✅ Correct Google Script Web App URL (already deployed with "Anyone" access)
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyCNkEFAO3OGvmTDLQqb2Pdm43fOU2wZWIXcOMbUnRZjJ6bWcnvQcRV711HflsWlq2H/exec";

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
  socket.on("heartbeat", ({ userId }) => {
    userHeartbeats.set(userId, {
      timestamp: Date.now(),
      socketId: socket.id,
    });
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
      console.log(
        `❌ Not allowed: ${userId} (${result?.reason || "unknown error"})`
      );
      return callback({
        allowed: false,
        reason: result?.reason,
        message: result?.message || "",
      });
    }

    console.log(`✅ User allowed: ${userId}`);
    callback({ allowed: true, link: result.link, height: result.height });
  });
});

// setInterval(() => {
//   const now = Date.now();
//   const timeout = 10000; // 10 seconds without heartbeat
//   for (const [userId, { timestamp, socketId }] of userHeartbeats.entries()) {
//     if (now - timestamp > timeout) {
//       console.log(`🛑 No heartbeat from ${userId} — stopping their recording`);

//       // Tell user to stop recording (if they're still connected)
//       const targetSocket = io.sockets.sockets.get(socketId);
//       if (targetSocket) {
//         targetSocket.emit("stop-recording", { reason: "No heartbeat" });
//       }

//       // Cleanup
//       userHeartbeats.delete(userId);
//     }
//   }
// }, 5000); // Check every 5 seconds
 
app.get("/user", async (req, res) => {
  const result = await verifyWithGoogleSheet("");
  if (result.reason == "closed") {
    const html = `
      <!DOCTYPE html>
      
      <html>
      <head>
          <link rel="stylesheet" href="closed.css" />

      <title>URCh</title>
      </head>
      <body>
        <h1>${result.message || "Exam not available right now"}</h1>
            <div class="credits">
      <span
        >This website is made by ❤️ with
        <a target="_blank" href="https://linktr.ee/_Ahmed_Samy_">Ahmed Samy</a></span
      >
    </div>
      </body>
      </html>
    `;
    res.send(html); // Send dynamic HTML with message
  } else {
    res.sendFile(__dirname + "/public" + "/user.html");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
