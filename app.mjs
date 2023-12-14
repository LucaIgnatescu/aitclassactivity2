import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import url from "url";
import path from "path";

const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));

server.listen(3000);

let state = {
  player1: 0,
  player2: 0,
  winner: null
};
const step = 10;

io.on("connect", (socket) => {
  socket.emit("setState", state);

  socket.on("move", (player) => {
    state[player] += step;
    if (state[player] >= 50) {
      state.winner = player;
    }
    io.emit("setState", state);
  });

  socket.on("reset", () => {
    io.emit("reset");
  })
});
