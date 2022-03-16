const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 7000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("the socket is up and running");

  // // socket gets disconnected
  // socket.on("disconnect", () => {
  //   console.log("socket disconnected");
  // });
});

httpServer.listen(port, () =>
  console.log(`Socket server is currently running on port: ${port}.`)
);
