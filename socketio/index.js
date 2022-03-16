const express = require("express");
const app = express();

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./helpers/users");

const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 7000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("New Socket connected: ", socket.id);
  //
  socket.on("joinLobby", ({ username, room }) => {
    console.log(username, room);

    // return all users
    socket.emit("playerList", "Welcome to Ultimate Cookie");

    /*
    const user = userJoin(socket.id, username, room);
    socket.join();

     // Broadcast when user connects
    socket.broadcast
      .to(user.room)
      .emit("message", `${user.username} has joined the room`);

    // Send user and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
    */
  });

  // Listen for Questions

  // Listen for Score

  // // socket gets disconnected
  socket.on("disconnect", () => {
    // const user = userLeave(socket.id);
    // if (user) {
    //   io.to(user.room).emit("message", `${user.username} has left the room`);
    //   console.log("socket disconnected");
    //   // Send user and room info
    //   io.to(user.room).emit("roomUsers", {
    //     room: user.room,
    //     users: getRoomUsers(user.room),
    //   });
    // }
  });
});

httpServer.listen(port, () =>
  console.log(`Socket server is currently running on port: ${port}.`)
);
