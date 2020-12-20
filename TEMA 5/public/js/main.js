const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

const socket = io();
document
  .getElementById("join-chat-button")
  .addEventListener("click", function () {
    const input = document.getElementById("user-name-input");
    const userName = input.value;
    if (userName.length > 0) {
      document
        .getElementById("user-name-missing")
        .classList.add("display-none");
      socket.emit("join-chat", userName);
    } else {
      document
        .getElementById("user-name-missing")
        .classList.remove("display-none");
    }
  });

socket.on("joined-chat", function () {
  console.log("You joined chat!");
  document.getElementById("menu").classList.add("display-none");
  document.getElementById("chat-container").classList.remove("display-none");
});

document
  .getElementById("send-message-button")
  .addEventListener("click", function () {
    const input = document.getElementById("message");
    const message = input.value;
    socket.emit("send-message", message);
  });

socket.on("new-message", function (message) {
  const messagesContainer = document.getElementById("chat-messages");
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;
  messagesContainer.appendChild(messageElement);
});

document
  .getElementById("leave-chat-button")
  .addEventListener("click", function () {
    socket.emit("leave-chat");
  });

socket.on("menu", function () {
  // console.log('You left chat!');
  document.getElementById("menu").classList.remove("display-none");
  document.getElementById("chat-container").classList.add("display-none");
  document.getElementById("game-container").classList.add("display-none");
});

document
  .getElementById("create-game-button")
  .addEventListener("click", function () {
    const input = document.getElementById("game-name-input");
    const gameName = input.value;
    if (gameName.length > 0) {
      document
        .getElementById("game-name-missing")
        .classList.add("display-none");
      socket.emit("create-game", gameName);
    } else {
      document
        .getElementById("game-name-missing")
        .classList.remove("display-none");
    }
  });

socket.on("game-loop", function (data) {
  document.getElementById("menu").classList.add("display-none");
  document.getElementById("back-to-menu").classList.add("display-none");
  document.getElementById("game-container").classList.remove("display-none");
  context.drawImage(document.getElementById("map-image"), 0, 0);

  data.objectsForDraw.forEach(function (objectForDraw) {
    context.drawImage(
      document.getElementById(objectForDraw.imageId),
      ...objectForDraw.drawImageParameters
    );
  });

  if (data.gameInProgress) {
    document
      .getElementById("waiting-for-players")
      .classList.add("display-none");
    document.getElementById("score-container").classList.remove("display-none");
    document.getElementById("space-ranger-score").innerHTML =
      data.score["space-ranger"];
    document.getElementById("pink-lady-score").innerHTML =
      data.score["pink-lady"];
    document.getElementById("diamonds-remained").innerHTML =
      data.score["total-diamonds"] -
      data.score["space-ranger"] -
      data.score["pink-lady"];
  } else {
    document
      .getElementById("waiting-for-players")
      .classList.remove("display-none");
    document.getElementById("score-container").classList.add("display-none");
  }
});

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      socket.emit("start-moving-player", "up");
      break;
    case "ArrowDown": {
      socket.emit("start-moving-player", "down");
      break;
    }
    case "ArrowLeft": {
      socket.emit("start-moving-player", "left");
      break;
    }
    case "ArrowRight": {
      socket.emit("start-moving-player", "right");
      break;
    }
    case " ": {
      socket.emit("attack");
      break;
    }
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
    case "ArrowDown":
      socket.emit("stop-moving-player", "dy");
      break;
    case "ArrowLeft":
    case "ArrowRight":
      socket.emit("stop-moving-player", "dx");
      break;
  }
});

socket.on("add-game-to-list", function (options) {
  const gameElementContainer = document.createElement("div");
  gameElementContainer.classList.add("game-element");
  gameElementContainer.id = options.gameId;

  const gameNameElement = document.createElement("p");
  gameNameElement.innerHTML = options.gameName;
  const joinGameButton = document.createElement("button");
  joinGameButton.innerHTML = "Join Game!";

  joinGameButton.addEventListener("click", function () {
    socket.emit("join-game", options.gameId);
  });

  gameElementContainer.appendChild(gameNameElement);
  gameElementContainer.appendChild(joinGameButton);

  document.getElementById("game-list").appendChild(gameElementContainer);
});

socket.on("remove-game-from-list", function (gameId) {
  document.getElementById(gameId).classList.add("display-none");
});

socket.on("game-over", function (imageId, gameId) {
  context.drawImage(document.getElementById(imageId), 0, 0);
  document.getElementById("back-to-menu").classList.remove("display-none");
  document.getElementById("back-to-menu").dataset.gameId = gameId;
  document.getElementById("score-container").classList.add("display-none");
});

document.getElementById("back-to-menu").addEventListener("click", function () {
  socket.emit(
    "back-to-menu",
    document.getElementById("back-to-menu").dataset.gameId
  );
});
