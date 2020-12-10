const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var Game = require("./public/js/game");
var Player = require("./public/js/player");

const PLAYER_DIM = 32;
var adding = 0;

http.listen(5000, function () {
  console.log("[SERVER STARTED AT PORT 5000]");
});

app.use(express.static(__dirname + "/public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/about", function (request, response) {
  response.sendFile(__dirname + "/about.html");
});

app.post("/about", function (request, response) {
  response.json(request.body);
});

io.on("connection", function (socket) {
  console.log("[SOCKET CONNECTED]" + socket.id);

  socket.on("first-number-value", function (numberValue) {
    socket.join("forNumberIncrement");
    console.log("[adding] " + adding);
    io.emit("first-value-for-number", adding);
  });

  socket.on("increment-number", function (numberValue) {
    //numberValue = numberValue + 1;
    adding++;
    io.to("forNumberIncrement").emit("incremented-number", adding);
  });

  socket.on("join-chat", function (userName) {
    console.log("[USER JOINED CHAT]", socket.id, userName);
    chatUsers[socket.id] = userName;
    socket.join("chat");
    let dataObj = {
      name: userName,
      numberOfUsers: Object.keys(chatUsers).length,
    };
    io.to("chat").emit("joined-chat", dataObj);
  });

  socket.on("send-message", function (message) {
    console.log("[USER SENT MESSAGE]", message);
    if (chatUsers[socket.id]) {
      let forSend = {
        chatUser: chatUsers[socket.id],
        userMessage: message,
      };

      io.to("chat").emit("new-message", forSend);
    }
  });

  socket.on("leave-chat", function () {
    let nameAuxiliar = chatUsers[socket.id];
    console.log("[USER LEFT CHAT]", socket.id);
    delete chatUsers[socket.id];
    let dataObj = {
      name: nameAuxiliar,
      numberOfUsers: Object.keys(chatUsers).length,
    };
    socket.emit("hide-container");
    io.to("chat").emit("menu", dataObj);
    socket.leave("chat");
  });

  socket.on("create-game", function (gameName) {
    console.log("[NEW GAME CREATED]");
    const gameId = "game-" + socket.id;
    const players = [new Player()];
    const game = new Game({
      id: gameId,
      players: players,
    });
    games[gameId] = game;
    console.log("[User joined " + gameId + "] room");
    socket.join(gameId);
  });
});

function gameLoop(id) {
  const objectsForDraw = [];
  games[id].players.forEach(function (player) {
    objectsForDraw.push(player.forDraw());
  });
  io.to(id).emit("game-loop", objectsForDraw);
}

const chatUsers = {};
const games = {};
