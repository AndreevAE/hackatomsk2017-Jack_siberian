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
                deck: {
                    cards: []
                },
                strokenCards: [],
                trump: {},
                players: [],
                currentPlayer: {
                    cards: []
                }
            },
            user: authApi.getUser(),
            selectedCard: {}
        };
    }

    updateGame(data, user) {
        if (parseInt(this.props.match.params.id) !== parseInt(data.data.id)) {
            return
        }

        let currentPlayer = {
            cards: []
        };

        for (let i = 0; i < data.data.players.length; i++) {
            if (data.data.players[i].name === user.username) {
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
    }

    componentDidMount() {
        const {user, socket} = this.state;

        socket.emit('games', {
            action: 'get-detail',
            token: $.cookie('token'),
            game_id: this.props.match.params.id
        });

        socket.on(`game-${this.props.match.params.id}`, data => {
            switch (data.type) {
                case 'update':
                    this.updateGame(data, user);
                    break;
            }
        });

        socket.on(`user-${user.username}`, (data) => {
            switch (data.type) {
                case 'game-detail':
                    this.updateGame(data, user);
                    break;
            }
        });
    }

    attack(card) {
        const {socket} = this.state;
        this.setState({selectedCard: card});

        socket.emit('games', {
            action: 'attack',
            token: $.cookie('token'),
            cards: [card],
            game_id: this.props.match.params.id
        });
    }

    defend() {
        const {socket} = this.state;

        socket.emit('games', {
            action: 'defend',
            token: $.cookie('token'),
            card: this.state.selectedCard,
            game_id: this.props.match.params.id
        });
    }

    render() {
        const {game} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <div className="busy-cards">
                            {game.strokenCards.map(card => (
                                <img
                                    key={`${card.value}-${card.suit}`}
                                    className="game-card"
                                    src={`/cards2/${card.suit}-${card.value}.png`}
                                    onClick={this.attack.bind(this, card.value, card.suit)}
                                    alt=""
                                />
                            ))}
                        </div>
                        <div className="free-cards">
                            {game.deck.cards.map(card => (
                                <img
                                    key={`${card.num}-${card.suit}`}
                                    className="game-card"
                                    src={`/cards2/back.png`}
                                    alt=""
                                />
                            ))}
                            <img className="main-card"
                                 src={`/cards2/${game.trump.suit}-${game.trump.num}.png`}
                                 alt=""/>
                        </div>
                        <div className="players">
                            {game.players.map(player => (
                                <div key={player.id}
                                     className="player">
                                    <img
                                        src={`/animal_avatars/${player.avatar}.png`}
                                        className={`avatar ${player.isActive && 'active'}`}
                                        alt="avatar"/>
                                    <span>{player.name}</span>
                                    <div className="player-cards">
                                        {player.cards.map(card => (
                                            <img
                                                key={`${card.num}-${card.suit}`}
                                                className="game-card"
                                                src={`/cards2/back.png`}
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
                                     onClick={this.attack.bind(this, card)}
                                     alt=""/>
                            ))}
                        </div>
                        <div>
                            <button className="btn btn-light" onClick={this.defend.bind(this)}>Defend</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
