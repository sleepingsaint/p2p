const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3001;

const rooms = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html")
})

io.on('connection', (socket) => {

  socket.on("offer", (data) => {
    rooms[data.roomId] = {
      offer: data.offer
    }
    socket.join(data.roomId);
  })

  socket.on("answer", (data) => {
    socket.join(data.roomId)
    socket.to(data.roomId).emit("answer", data.answer);
  })

  socket.on("candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", data.candidate);
  })
});

app.get("/getRoomOffer/:id", (req, res) => {
  const id = req.params['id'];
  return res.send(rooms[id].offer)
})

server.listen(PORT, () => {
  console.log('listening on port', PORT);
});