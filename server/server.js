const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const messageUtils = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.emit('newMessage', messageUtils.generateMessage('Admin','Welcome to the chat app'));
  socket.broadcast.emit('newMessage', messageUtils.generateMessage('Admin','New user joined'));


  socket.on('disconnect', () => {
    console.log('User diconnected from server');
  });

  //edw tha lavei o server event apo to client
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    io.emit('newMessage', messageUtils.generateMessage(message.from,message.text));
    callback('This is from the server');
    /*
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    */
  });

});

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}.`);
});
