// import { Animal } from '/js/animal.js';

const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

// const myPet = new Animal('Rocky');
// myPet.canEat();

// // context.fillStyle = "red";
// // context.fillRect(280, 20, 40, 20);

// const geoerge = new Image();
// geoerge.src = 'assets/george.png'
// const GEORGE_WIDTH = 40;
// const GEORGE_HEIGHT = 45;
// let georgeX = 100;
// let georgeY = 100;
// geoerge.onload = () => {
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
// }

// const mario = new Image();
// mario.src = 'assets/mario.png'
// const MARIO_WIDTH = 32;
// const MARIO_HEIGHT = 39;
// mario.onload = () => {
//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
// }

// const button = document.getElementById("myButton");
// button.addEventListener("click", function() {
//     console.log(this);
//     context.fillStyle = "green";
//     context.fillRect(480, 20, 40, 20);
// });

// document.addEventListener("keydown", function(event) {
//     context.clearRect(0, 0, 600, 400);
//     switch(event.key) {
//         case 'ArrowUp': {
//             georgeY -= 10;
//             break;
//         }
//         case 'ArrowDown': {
//             georgeY += 10;
//             break;
//         }
//         case 'ArrowLeft': {
//             georgeX -= 10;
//             break;
//         }
//         case 'ArrowRight': {
//             georgeX += 10;
//             break;
//         }
//     }

//     context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT);
//     context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)
// });

const socket = io();

// document.getElementById('join-chat-button').addEventListener('click', function() {
//     const input = document.getElementById('user-name-input');
//     const userName = input.value;
//     if (userName.length > 0) {
//         document.getElementById('user-name-missing').classList.add('display-none');
//         socket.emit('join-chat', userName);
//     } else {
//         document.getElementById('user-name-missing').classList.remove('display-none');
//     }
// })

// socket.on('joined-chat', function() {
//     console.log('You joined chat!');
//     document.getElementById('menu').classList.add('display-none');
//     document.getElementById('chat-container').classList.remove('display-none');
// })

// document.getElementById('send-message-button').addEventListener('click', function() {
//     const input = document.getElementById('message');
//     const message = input.value;
//     socket.emit('send-message', message);
// })

// socket.on('new-message', function(message) {
//     const messagesContainer = document.getElementById('chat-messages');
//     const messageElement = document.createElement('p');
//     messageElement.innerHTML = message;
//     messagesContainer.appendChild(messageElement);
// })

// document.getElementById('leave-chat-button').addEventListener('click', function () {
//     socket.emit('leave-chat');
// })

// socket.on('menu', function() {
//     console.log('You left chat!');
//     document.getElementById('menu').classList.remove('display-none');
//     document.getElementById('chat-container').classList.add('display-none');
// })

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
});

socket.on("game-over", function (reason) {
  context.fillRect(0, 0, 960, 640);
  context.font = "80px Arial";
  context.fillStyle = "white";
  context.fillText("Game Over; You Won", 100, 320);
  console.log("Game Over", reason);
  var backToGameButton = document.createElement("button");
  backToGameButton.innerHTML = "Back to home page";
  backToGameButton.style.width = "200px"; // setting the width to 200px
  backToGameButton.style.height = "200px"; // setting the height to 200px
  backToGameButton.style.background = "teal"; // setting the background color to teal
  backToGameButton.style.color = "white"; // setting the color to white
  backToGameButton.style.fontSize = "50px"; // setting the font size to 20px
  backToGameButton.addEventListener("click", function () {
    document.getElementById("menu").classList.remove("display-none");
    document.getElementById("game-container").classList.add("display-none");
    document.getElementById("game-name-input").value = "";
  });
  document.getElementById("game-container").appendChild(backToGameButton);
});