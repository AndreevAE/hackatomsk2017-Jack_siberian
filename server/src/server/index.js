const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const jwt = require('json-web-token');
const cors = require('cors');
const bodyParser = require("body-parser");

const config = require('./config');
const socketHandler = require('./socket');

const redis = require("redis");
const redisClient = redis.createClient();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, '../../build')));

// app.get('/api/auth', function (req, res) {
//     res.sendFile(path.resolve(__dirname + '../../../build/index.html'));
//
//     let payload = {
//         username: 'test1111'
//     };
//
//
//     jwt.encode(config.secret, payload, function (err, token) {
//         res.send({
//             token
//         });
//     })
// });


app.put('/api/auth', function (req, res) {
    res.sendFile(path.resolve(__dirname + '../../../build/index.html'));
    const username = req.body.username;

    redisClient.get('users', function (err, reply) {
        let users = reply ? JSON.parse(reply) : [];;
        try {
            users.push(username);
        } catch (e) {
            users = [username];
        }

        redisClient.set('users', JSON.stringify(users));

        let payload = {
            username
        };

        jwt.encode(config.secret, payload, function (err, token) {
            res.send({token});
        })
    });
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
