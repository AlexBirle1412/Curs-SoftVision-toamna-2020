const socket = io();

window.onload = () => {
  console.log("[ONLOAD]");
  socket.emit("first-number-value");
};

document
  .getElementById("increment-button")
  .addEventListener("click", function () {
    socket.emit("increment-number");
  });

socket.on("first-value-for-number", function (numberValue) {
  let counterDiv = document.getElementById("showCounter");
  counterDiv.innerHTML = numberValue;
});

socket.on("incremented-number", function (numberValue) {
  let counterDiv = document.getElementById("showCounter");
  counterDiv.innerHTML = numberValue;
  counterDiv.setAttribute("value", Number(counterDiv.innerHTML));
});

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

socket.on("joined-chat", function (obj) {
  const forJoined = document.createElement("p");
  forJoined.innerHTML = `${obj.name} join chat`;
  forJoined.style.color = "green";
  document.getElementById("chat-messages").appendChild(forJoined);

  document.getElementById("join-chat").classList.add("display-none");
  document.getElementById("chat-container").classList.remove("display-none");
  document.getElementById(
    "numberOfUsers"
  ).innerHTML = `There are ${obj.numberOfUsers} active users`;
});

document
  .getElementById("send-message-button")
  .addEventListener("click", function () {
    const input = document.getElementById("message");
    const message = input.value;
    socket.emit("send-message", message);
    input.value = "";
  });

socket.on("new-message", function (messageFromServer) {
  let chat_user = messageFromServer.chatUser;
  let serverMessage = messageFromServer.userMessage;

  const messagesContainer = document.getElementById("chat-messages");
  const messageElement = document.createElement("p");
  const s1 = document.createElement("span");
  const s2 = document.createElement("span");
  s1.innerHTML = chat_user + ":";
  s2.innerHTML = serverMessage;
  s2.style.color = document.getElementById("head").value;
  messageElement.appendChild(s1);
  messageElement.appendChild(s2);
  messagesContainer.appendChild(messageElement);
});

document
  .getElementById("leave-chat-button")
  .addEventListener("click", function () {
    socket.emit("leave-chat");
  });

socket.on("hide-container", function (callback) {
  document.getElementById("can-hide").classList.add("display-none");
});

socket.on("menu", function (obj) {
  const forDelete = document.createElement("p");
  forDelete.innerHTML = `${obj.name} left the chat`;
  forDelete.style.color = "red";
  document.getElementById("chat-messages").appendChild(forDelete);
  document.getElementById(
    "numberOfUsers"
  ).innerHTML = `There are ${obj.numberOfUsers} active users`;

  // document.getElementById("join-chat").classList.remove("display-none");
  // document.getElementById("chat-container").classList.add("display-none");
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

socket.on("game-loop", function (objectsForDraw) {
  document.getElementById("join-chat").classList.add("display-none");
  document
    .getElementById("create-game-container")
    .classList.add("display-none");
  document.getElementById("game-container").classList.remove("display-none");
  context.drawImage(document.getElementById("map-image"), 0, 0);

  objectsForDraw.forEach(function (objectForDraw) {
    context.drawImage(
      document.getElementById(objectForDraw.imageId),
      ...objectForDraw.drawImageParameters
    );
  });
});
