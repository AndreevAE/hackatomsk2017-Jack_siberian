"use strict";

class Player {

    constructor(name, cards, deck) {
      this.name = name;
      this.cards = cards;
      this.size = 6;
      if (deck != 'undefined') {
        this.deck = deck;
        this.fill(deck);
      }
    }

    eat(cards) {
      this.cards.push.apply(this.cards, cards);
    }

    remove(card) {
      var index = this.cards.indexOf(card)
      if(index > -1) {
        this.cards.splice(index, 1);
      }
    }

    fill(deck) {
      if (this.cards.length < this.size) {
        this.eat(deck.take(this.size - this.cards.length));
      }
      return this.cards;
    }

    getName() {
      return this.name;
    }
}

module.exports = Player;
