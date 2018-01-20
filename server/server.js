const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('The connection event has occured');

  // socket.emit('newEmail'); will work without 2nd arg
  socket.emit('newEmail',{
    from: 'sasasacin',
    text: 'this is the text',
    createdAt: 123
  });

  socket.on('createEmail',(newEmail)=>{
    console.log('New email from client to server', newEmail);
  });

  socket.on('disconnect',()=>{
    console.log('disconnect event');
  });

});




server.listen(port,()=>{
  console.log('server is up on port :'+port);
});
