function socketHandler(socket) {
    // For test
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });


    socket.on('games', function (data) {
        switch (data.action) {
            // TODO
            case 'get':
                socket.emit('player', {
                    type: 'game-list',
                    data: [
                        {
                            id: 1,
                            freeCards: [],
                            players: []
                        },
                        {
                            id: 2,
                            freeCards: [],
                            players: []
                        }
                    ]
                });
                break;

            // TODO
            case 'create':
                socket.emit('player', {
                    type: 'new-game',
                    data: {
                        id: 3,
                        freeCards: [],
                        players: [],
                        creator: {}
                    }
                });
                break;

            // TODO
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
    });
}

module.exports = confing;
