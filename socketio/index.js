const express = require("express");
const app = express();

const axios = require("axios");

const { getCurrentUser, userLeave, getRoomUsers } = require("./helpers/users");

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

//  change to db
const users = [];

// join user to chat

const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

const getQuestions = async (numQuestions, categoryId, difficulty) => {
  const difficultyLvl = difficulty.toLowerCase();
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryId}&difficulty=${difficultyLvl}&type=multiple`
    );
    const data = response.data.results;
    return data;
  } catch (error) {
    console.error(`(fetch) Error getting questions: ${error}`);
  }
};

let quiz = {};
io.on("connection", (socket) => {
  // create variable to store quiz
  let userInfo = { username: "", room: "" };
  console.log("New Socket connected: ", socket.id);
  //
  socket.on("createLobby", async ({ category, difficulty, amount, type }) => {
    console.log(category, difficulty, amount, type);
    const questions = await getQuestions(amount, category, difficulty);

    quiz = questions;
  });

  socket.on("joinLobby", ({ username, room }) => {
    userInfo.username = username;
    userInfo.room = room;
    console.log(username, room);
    const user = userJoin(socket.id, username, room);
    console.log("this is the user that joined the room", user);
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

  socket.on("startQuiz", (str) => {
    console.log(str);
    // return the entire quiz from the quiz api
    socket.emit("quizQuestions", quiz);
    socket.broadcast.emit("quizQuestions", quiz);
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
