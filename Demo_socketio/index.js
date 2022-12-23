const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const lstData = [
  { id: 1, userName: "A" },
  { id: 2, userName: "B" },
];

io.on("connection", (socket) => {
  let client = { id: socket.id, userName: socket.id.substring(0, 2) };
  lstData.push(client);
  io.emit("client-connect", client.userName);
  socket.on("disconnect", (reason) => {
    // console.log(socket.id + " disconnect");
    let index = lstData.findIndex((item) => item.id == socket.id);
    io.emit("client-disconnect", lstData[index].userName);
    lstData.splice(index, 1);
  });
  // socket.emit("get-data", "abc")
  socket.on("client-data", (data) => {
    // console.log(`${socket.id}: ${data}`);
    let index = lstData.findIndex((item) => item.id == socket.id);
    io.emit("server-data", `${lstData[index].userName}: ${data}`);
  });
});

httpServer.listen("8080");
