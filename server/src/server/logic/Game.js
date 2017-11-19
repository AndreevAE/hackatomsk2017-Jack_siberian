const Player = require("./Player.js");
const Stroke = require("./Stroke.js");
const Card = require("./Card.js");


class Game {
    constructor(id, deck, game) {
        this.id = id;
        this.deck = deck;

        if (game) {
            this.trump = new Card(game.trump.suit, game.trump.num, game.trump.value);
            this.players = game.players.map(player => {
                const cards = player.cards.map(card => (
                    new Card(card.suit, card.num, card.value)
                ));

                return new Player(player.name, player.avatar, cards, this.deck);
            });
            this.pointer = parseInt(game.pointer);
            game.strokenCards = game.strokenCards || [];
            this.strokenCards = game.strokenCards.map(card => {
                return {
                    attack: card.attack && new Card(card.attack.suit, card.attack.num, card.attack.value),
                    defense: card.defense && new Card(card.defense.suit, card.defense.num, card.defense.value)
                }
            });
            this.playerSize = parseInt(game.playerSize);
            this.status = game.status;
        } else {
            this.trump = deck.cards[0];
            this.players = [];
            this.pointer = -1;
            this.strokenCards = [];
            this.playerSize = 3;
            this.status = 'waiting';
        }
    }

    addPlayer(name, avatar) {
        if (this.playerSize <= this.players.length) {
            return;
        }

        let player = new Player(name, avatar, [], this.deck);
        this.players.push(player);


        if (this.playerSize <= this.players.length) {
            this.status = 'game';
        }
    }

    nextPlayers() {
        if (++this.pointer >= this.players.length) {
            this.pointer = 0;
        }

        const attackerPrimary = this.players[this.pointer % this.players.length];
        const defendant = this.players[(this.pointer + 1) % this.players.length];
        const attackerSecondary = this.players[(this.pointer + 2) % this.players.length];

        console.log('attackerPrimary', attackerPrimary);
        console.log('attackerSecondary', attackerSecondary);
        console.log('defendant', defendant);
        return new Stroke(attackerPrimary, attackerSecondary, defendant, this.deck, this.trump, this.strokenCards);
    }

    toDict() {
        return {
            id: this.id,
            deck: this.deck.toDict(),
            trump: this.trump.toDict(),
            players: this.players.map(player => (player.toDict())),
            pointer: this.pointer,
            strokenCards: this.strokenCards.map(card => {
                return {
                    attack: card.attack && card.attack.toDict(),
                    defense: card.defense && card.defense.toDict()
                }
            }),
            status: this.status,
            playerSize: this.playerSize
        }
    }
}

module.exports = Game;
