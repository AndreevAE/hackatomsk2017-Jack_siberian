const redis = require("redis");
const redisClient = redis.createClient();
const jwt = require('json-web-token');
const config = require('./config');
const cardManager = require('./game/card');


function proccessSocketGame(socket, data, user) {
    const userRoom = `user-${user.username}`;

    switch (data.action) {
        case 'get-list':
            redisClient.get('games', function (err, reply) {
                if (err) {
                    return;
                }

                let games;

                try {
                    games = reply ? JSON.parse(reply) : [];
                } catch (e) {
                    games = [];
                }

                socket.emit(userRoom, {
                    type: 'game-list',
                    data: games
                });
            });
            break;

        case 'create':
            redisClient.get('games', function (err, reply) {
                if (err) {
                    return;
                }

                let games;

                try {
                    games = reply ? JSON.parse(reply) : [];
                } catch (e) {
                    games = [];
                }

                let newGame = {
                    id: games.length ? games[games.length - 1].id + 1 : 1,
                    freeCards: [],
                    players: [{
                        username: user.username,
                        avatar: user.avatar,
                        score: 0,
                        cards: cardManager.generateCards().slice(0, 6)
                    },
                    {
                        username: 'test',
                        avatar: 'animal_01',
                        score: 0,
                        cards: cardManager.generateCards().slice(0, 6)
                    }],
                    cards: cardManager.generateCards(),
                    creator: user.username
                };

                redisClient.set('games', JSON.stringify([...games, newGame]));
                redisClient.set(`game-${newGame.id}`, JSON.stringify(newGame));

                socket.emit(userRoom, {
                    type: 'new-game',
                    data: newGame
                });
            });
            break;

        case 'get-detail':
            redisClient.get(`game-${data.game_id}`, function (err, reply) {
                if (err) {
                    return;
                }

                let game;

                try {
                    game = reply ? JSON.parse(reply) : {};
                } catch (e) {
                    game = {};
                }

                socket.emit(userRoom, {
                    type: 'game-detail',
                    data: game
                });
            });
            break;

        case 'join':
            socket.emit('player', {
                type: 'join',
                data: {
                    id: 1,
                    freeCards: [],
                    players: [],
                    creator: {}
                }
            });
            break;
    }
}

function socketHandler(socket) {
    // For test
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });


    socket.on('games', function (data) {
        if (data.token) {
            jwt.decode(config.secret, data.token, function (err, decodedPayload, decodedHeader) {
                proccessSocketGame(socket, data, decodedPayload);
            });

            return;
        }

        proccessSocketGame(socket, data);
    });
}


module.exports = socketHandler;
