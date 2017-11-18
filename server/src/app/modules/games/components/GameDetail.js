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

        let cards = [];

        for (let i = 6; i < 14; i++) {
            cards.push({
                num: i,
                suit: 'clubs'
            });
        }

        for (let i = 6; i < 14; i++) {
            cards.push({
                num: i,
                suit: 'diamonds'
            });
        }

        for (let i = 6; i < 14; i++) {
            cards.push({
                num: i,
                suit: 'hearts'
            });
        }

        for (let i = 6; i < 14; i++) {
            cards.push({
                num: i,
                suit: 'spades'
            });
        }


        cards.push({
            num: 1,
            suit: 'clubs'
        });
        cards.push({
            num: 1,
            suit: 'diamonds'
        });
        cards.push({
            num: 1,
            suit: 'hearts'
        });
        cards.push({
            num: 1,
            suit: 'spades'
        });


        this.state = {
            socket,
            game: {
                players: [
                    {
                        id: 1,
                        username: 'test',
                        cards: [cards[0], cards[1], cards[2]]
                    },
                    {
                        id: 2,
                        username: 'SUPER!!!!!!',
                        cards: [cards[0], cards[1], cards[2]]
                    }
                ],
                cards: cards
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

                    this.setState({
                        game: data.data
                    });

                    break;
            }
        });
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
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Avatar_poe84it.png" className="avatar" alt="avatar"/>
                                    <span>{player.username}</span>
                                    <div className="player-cards">
                                        {player.cards.map(card => (
                                            <div
                                                className={`game-card ${card.suit} rank${card.num}`}>
                                                <div className="face"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="user-cards">
                            {game.cards.map(card => (
                                <div
                                    className={`game-card ${card.suit} rank${card.num}`}>
                                    <div className="face"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
