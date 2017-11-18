import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class GameDetail extends Component {
    constructor(props) {
        super(props);

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
            }
        };

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
