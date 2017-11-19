const Card = require("./Card.js");


class Deck {
    constructor(deck) {
        const suits = ["clubs", "hearts", "diamonds", "spades"];
        const cardValues = [6, 7, 8, 9, 10, "v", "q", "k", "1"];
        const cards = [];

        if (deck) {
            deck.cards.forEach(card => {
                cards.push(new Card(card.suit, card.num, card.value));
            });
        } else {
            suits.forEach(suit => {
                for (let i = 0; i < cardValues.length; i++) {
                    cards.push(new Card(suit, cardValues[i], i));
                }
            });
        }

        this.cards = cards;
    }

    shuffle() {
        let numCards = this.cards.length;
        while (numCards > 0) {
            let rnd = Math.floor(Math.random() * numCards--);
            let tmp = this.cards[numCards];
            this.cards[numCards] = this.cards[rnd];
            this.cards[rnd] = tmp;
        }
        return this.cards;
    }

    take(requested) {
        let output = [];
        let num = Math.min(requested, this.cards.length);
        if (num > 0) {
            for (let i = 0; i < num; i++) {
                output.push(this.cards.pop());
            }
        }
        return output;
    }

    toDict() {
        let cards = [];

        for (let i = 0; i < this.cards.length; i++) {
            cards.push(this.cards[i].toDict());
        }

        return {
            cards
        }
    }
}

module.exports = Deck;
