import { io } from "/socket.io/socket.io.esm.min.js";
const socket = io();
const step = 10;

let state = {
  player1: 0,
  player2: 0,
  winner: null,
};

const btn1 = document.querySelector(".player1Btn");
const btn2 = document.querySelector(".player2Btn");
const [p1, p2] = document.querySelectorAll(".racer");

socket.on("setState", (data) => {
  state = data;
  p1.style.left = `${state.player1}vw`;
  p2.style.left = `${state.player2}vw`;
  if (state.winner !== null) {
    handleWin(state.winner);
  }
});

function move(player) {
  const playerNode = player === "player1" ? p1 : p2;
  return () => {
    socket.emit("move", player);
  };
}

function handleWin(player) {
  btn1.disabled = true;
  btn2.disabled = true;

  setTimeout(() => alert(player.toUpperCase() + " won!"), 100);
}

btn1.onclick = move("player1");
btn2.onclick = move("player2");
