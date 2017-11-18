const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const jwt = require('json-web-token');

const config = require('./config');
const socketHandler = require('./socketHandler');


app.use('/assets', express.static(path.join(__dirname, '../../build')));

app.get('/api/auth', function (req, res) {
    res.sendFile(path.resolve(__dirname + '../../../build/index.html'));

    let payload = {
        username: 'test1111'
    };

    jwt.encode(config.secret, payload, function (err, token) {
        res.send(token);
    })
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '../../../build/index.html'));
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    socketHandler(socket);
});
