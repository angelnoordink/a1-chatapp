const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

  socket.on('message', (message) => {
    console.log("TEST"+message);
    io.emit('message', `${socket.id.substr(0, 2)}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
  
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));