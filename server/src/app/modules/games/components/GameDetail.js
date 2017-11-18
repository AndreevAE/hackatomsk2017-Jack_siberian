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
                cards: []
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

                    let currentPlayer = {};

                    for (let i = 0; i < data.data.players.length; i++) {
                        if (data.data.players[i].username === user.username) {
                            currentPlayer = data.data.players[i].cards;
                            data.data.players = data.data.players.splice(i, 1);
                            break;
                        }
                    }

                    this.setState({
                        game: {...data.data, currentPlayer},
                    });

                    console.log({...data.data, currentPlayer});

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
                        <div className="players">
                            {game.players.map(player => (
                                <div key={player.id}
                                     className="player">
                                    <img
                                        src={`/animal_avatars/${player.avatar}.png`}
                                        className="avatar" alt="avatar"/>
                                    <span>{player.username}</span>
                                    <div className="player-cards">
                                        {player.cards.map(card => (
                                            <img className="game-card"
                                                 src={`/cards2/${card.num}_${card.suit}.png`}
                                                 onClick={this.popCard.bind(this, card.num, card.suit)}
                                                 alt=""/>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="user-cards">
                            {game.currentPlayer.cards.map(card => (
                                <img className="game-card"
                                     src={`/cards2/${card.num}_${card.suit}.png`}
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
