const Card = require("./Card.js");


class Player {
    constructor(name, avatar, cards, deck) {
        this.name = name;
        this.cards = cards;
        this.size = 6;
        this.avatar = avatar;

        if (deck) {
            this.deck = deck;
            this.fill(deck);
        }
    }

    eat(cards) {
        this.cards.push.apply(this.cards, cards);
    }

    remove(card) {
        const index = this.cards.indexOf(card);

        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }

    fill(deck) {
        if (this.cards.length < this.size) {
            this.eat(deck.take(this.size - this.cards.length));
        }

        return this.cards;
    }

    toDict() {
        return {
            name: this.name,
            size: this.size,
            cards: this.cards.map(card => (card.toDict())),
            avatar: this.avatar
        }
    }
}

module.exports = Player;
