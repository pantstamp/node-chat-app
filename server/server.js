const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.emit('newMessage', {
    from: 'mike',
    text: 'Hello!!!',
    createdAt: 123
  });

  socket.on('disconnect', () => {
    console.log('User diconnected from server');
  });

  //edw tha lavei o server event apo to client
  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });

});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}.`);
});
