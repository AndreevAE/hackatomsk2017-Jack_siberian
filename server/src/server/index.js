const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


app.use('/assets', express.static(path.join(__dirname, '../../build')))

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '../../../build/index.html'));
});

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
