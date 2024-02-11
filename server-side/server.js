const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 7006;
const path = require("path");
//Get HTML Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client-side/index.html"));
});
////Connected&&Disconected
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
//print out chat message
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
// This will emit the event to all connected sockets
io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});
server.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
