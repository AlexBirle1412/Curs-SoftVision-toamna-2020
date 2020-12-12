// import { Animal } from '/js/animal.js';

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");
const socket = io();
var flagForHiddenButton;

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

socket.on("game-loop", function (objectsForDraw) {
  document.getElementById("menu").classList.add("display-none");
  document.getElementById("game-container").classList.remove("display-none");
  context.drawImage(document.getElementById("map-image"), 0, 0);

  objectsForDraw.forEach(function (objectForDraw) {
    context.drawImage(
      document.getElementById(objectForDraw.imageId),
      ...objectForDraw.drawImageParameters
    );
  });
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
  flagForHiddenButton = true;
  console.log("[IN REMOVE GAME FLAG IS ] " + flagForHiddenButton);
});

socket.on("game-over", function (reason) {
  context.fillRect(0, 0, 960, 640);
  context.font = "80px Arial";
  context.fillStyle = "white";
  context.fillText("Game Over; You Won", 100, 320);
  console.log("Game Over", reason);
  var backToGameButton = document.createElement("button");
  backToGameButton.innerHTML = "Back to home page";
  backToGameButton.id = "return-to-main-button";
  backToGameButton.style.width = "200px"; // setting the width to 200px
  backToGameButton.style.height = "200px"; // setting the height to 200px
  backToGameButton.style.background = "teal"; // setting the background color to teal
  backToGameButton.style.color = "white"; // setting the color to white
  backToGameButton.style.fontSize = "50px"; // setting the font size to 20px
  document.getElementById("game-container").appendChild(backToGameButton);
  backToGameButton.addEventListener("click", function () {
    document.getElementById("menu").classList.remove("display-none");
    document.getElementById("game-container").classList.add("display-none");
    document.getElementById("game-name-input").value = "";
    console.log("[FLAG IS ] " + flagForHiddenButton);
    if (flagForHiddenButton)
      document
        .getElementById("return-to-main-button")
        .classList.add("display-none");
    flagForHiddenButton = false;
  });
});
