const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
});

io.on("connection", (socket) => {
    console.log("teh socket is up and running")
});

// // socket gets disconnected
// socket.on("disconnect", () => {
//   console.log("socket disconnected");
// });

