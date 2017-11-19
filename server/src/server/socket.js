const redis = require("redis");
const redisClient = redis.createClient();
const jwt = require('json-web-token');
const config = require('./config');
const Deck = require('./logic/Deck');
const Game = require('./logic/Game');


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

                const deck = new Deck();
                deck.shuffle();
                const game = new Game(games.length ? games[games.length - 1].id + 1 : 1, deck);

                game.addPlayer(user.username, user.avatar);

                let newGame = game.toDict();

                console.log(newGame);

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
            redisClient.get(`game-${data.game_id}`, function (err, reply) {
                if (err) {
                    return;
                }

                let rawGame;

                try {
                    rawGame = reply ? JSON.parse(reply) : {};
                } catch (e) {
                    rawGame = {};
                }

                const deck = new Deck(rawGame.deck);
                const game = new Game(rawGame.id, deck, rawGame);
                game.addPlayer(user.username, user.avatar);

                redisClient.set(`game-${data.game_id}`, JSON.stringify(game.toDict()));

                socket.emit(userRoom, {
                    type: 'join',
                    data: game.toDict()
                });

                socket.broadcast.emit(`game-${data.game_id}`, {
                    type: 'update',
                    data: game.toDict()
                });
            });

            break;

        case 'attack':
            redisClient.get(`game-${data.game_id}`, function (err, reply) {
                if (err) {
                    return;
                }

                let rawGame;

                try {
                    rawGame = reply ? JSON.parse(reply) : {};
                } catch (e) {
                    rawGame = {};
                }

                const deck = new Deck(rawGame.deck);
                const game = new Game(rawGame.id, deck, rawGame);

                let ind = game.pointer === -1 ? 0 : game.pointer;
                let currentPlayer = game.players[ind];

                if (currentPlayer.name !== user.username) {
                    return;
                }

                let stroke = game.nextPlayers();
                let cards = [];

                currentPlayer.cards.map(card => {
                    data.cards.map(rowCard => {
                        if (JSON.stringify(card.toDict()) === JSON.stringify(rowCard)) {
                            cards.push(card);
                        }
                    });
                });

                console.log(cards)

                const updatedPlayer = stroke.attack(cards, game.players[ind]);

                if (!updatedPlayer) {
                    return;
                }

                game.players[ind] = updatedPlayer;
                game.strokenCards.push(cards[stroke.cards.length - 1]);

                redisClient.set(`game-${data.game_id}`, JSON.stringify(game.toDict()));

                socket.broadcast.emit(`game-${data.game_id}`, {
                    type: 'update',
                    data: game.toDict()
                });
            });
            break;


        case 'defend':
            redisClient.get(`game-${data.game_id}`, function (err, reply) {
                if (err) {
                    return;
                }

                let rawGame;

                try {
                    rawGame = reply ? JSON.parse(reply) : {};
                } catch (e) {
                    rawGame = {};
                }

                const deck = new Deck(rawGame.deck);
                const game = new Game(rawGame.id, deck, rawGame);

                let ind = game.pointer === -1 ? 0 : game.pointer;
                let currentPlayer = game.players[ind];

                if (currentPlayer.name !== user.username) {
                    return;
                }

                let stroke = game.nextPlayers();
                stroke.defend(data.card);

                let defendCard;
                currentPlayer.cards.map(card => {
                    if (JSON.stringify(card.toDict()) === JSON.stringify(data.card)) {
                        defendCard = card;
                    }
                });

                let coupleCardsId;
                for (let i = 0; i < currentPlayer.cards.length; i++) {
                    if (!currentPlayer.cards.defense) {
                        coupleCardsId = i;
                        break;
                    }
                }

                const isDefended = stroke.defend(coupleCardsId, game.players[ind]);
                console.log(isDefended);

                if (!isDefended) {
                    return;
                }

                game.strokenCards.push(defendCard);

                redisClient.set(`game-${data.game_id}`, JSON.stringify(game.toDict()));

                socket.broadcast.emit(`game-${data.game_id}`, {
                    type: 'update',
                    data: game.toDict()
                });
            });
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
