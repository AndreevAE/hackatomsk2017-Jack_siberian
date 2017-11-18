import React, {Component} from "react";
import AuthAPI from "../../../utils/AuthAPI";
import openSocket from "socket.io-client";
import $ from "jquery";


const authApi = new AuthAPI();


export default class GameDetail extends Component {
    constructor(props) {
        super(props);
        const socket = openSocket('http://localhost:3000');

        if (!authApi.isAuth()) {
            this.props.history.push('/auth');
        }


        this.state = {
            socket,
            game: {
                currentPlayer: {
                    cards: []
                },
                players: [
                    {
                        id: 1,
                        username: 'test',
                        cards: []
                    },
                    {
                        id: 2,
                        username: 'SUPER!!!!!!',
                        cards: []
                    }
                ],
                cards: [],
                mainCard: {},
                busyCards: []
            },

            user: authApi.getUser()
        };
    }

    componentDidMount() {
        const {user, socket} = this.state;

        socket.emit('games', {
            action: 'get-detail',
            token: $.cookie('token'),
            game_id: this.props.match.params.id
        });

        socket.on(`user-${user.username}`, (data) => {
            switch (data.type) {
                case 'game-detail':
                    if (parseInt(this.props.match.params.id) !== parseInt(data.data.id)) {
                        return
                    }

                    let currentPlayer = {
                        cards: []
                    };

                    for (let i = 0; i < data.data.players.length; i++) {
                        if (data.data.players[i].username === user.username) {
                            currentPlayer = data.data.players[i];
                            data.data.players.splice(i, 1);
                            break;
                        }
                    }

                    for (let i = 0; i < data.data.players.length; i++) {
                        let player = data.data.players[i];

                        for (let j = 0; j < player.cards.length; j++) {
                            let card = data.data.players[i].cards[j];
                            let num = player.cards.length * 3;
                            let radius = 50;

                            let f = 2 / num * j * Math.PI - 0.78;  // Рассчитываем
                            // угол каждой картинки в радианах
                            let left = radius * Math.sin(f) + 'px';
                            let top = radius * Math.cos(f) + 'px';

                            card.style = {
                                'top': top,
                                'left': left
                            };

                            data.data.players[i].cards[j] = card;
                        }
                    }


                    data.data.currentPlayer = currentPlayer;

                    this.setState({
                        game: data.data,
                    });

                    console.log(data.data);

                    break;
            }
        });
    }

    popCard(num, suit) {
        alert(num + ' ' + suit)
    }

    render() {
        const {game} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <div className="busy-cards">
                            {game.busyCards.map(card => (
                                <img
                                    key={`${card.num}-${card.suit}`}
                                    className="game-card"
                                    src={`/cards2/${card.suit}-${card.num}.png`}
                                    onClick={this.popCard.bind(this, card.num, card.suit)}
                                    alt=""
                                />
                            ))}
                        </div>
                        <div className="free-cards">
                            {game.cards.map(card => (
                                <img
                                    key={`${card.num}-${card.suit}`}
                                    className="game-card"
                                    src={`/cards2/back.png`}
                                    onClick={this.popCard.bind(this, card.num, card.suit)}
                                    alt=""
                                />
                            ))}
                            <img className="main-card" src={`/cards2/${game.mainCard.suit}-${game.mainCard.num}.png`} alt=""/>
                        </div>
                        <div className="players">
                            {game.players.map(player => (
                                <div key={player.id}
                                     className="player">
                                    <img
                                        src={`/animal_avatars/${player.avatar}.png`}
                                        className={`avatar ${player.isActive && 'active'}`} alt="avatar"/>
                                    <span>{player.username}</span>
                                    <div className="player-cards">
                                        {player.cards.map(card => (
                                            <img
                                                key={`${card.num}-${card.suit}`}
                                                className="game-card"
                                                src={`/cards2/back.png`}
                                                onClick={this.popCard.bind(this, card.num, card.suit)}
                                                alt=""
                                                style={card.style}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="user-cards">
                            {game.currentPlayer.cards.map(card => (
                                <img key={`${card.num}-${card.suit}`}
                                     className="game-card"
                                     src={`/cards2/${card.suit}-${card.num}.png`}
                                     onClick={this.popCard.bind(this, card.num, card.suit)}
                                     alt=""/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
