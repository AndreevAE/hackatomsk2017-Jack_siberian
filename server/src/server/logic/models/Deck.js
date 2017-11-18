"use strict";

var Card = require("./Card.js");

class Deck {
  constructor() {
    var suits = ["clubs", "hearts", "diamonds", "spades"];
    var cardValues = [6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];
    var cards = [];

    suits.forEach(function(suit) {
      for (var i = 0; i < cardValues.length; i++) {
        cards.push(new Card(suit, i));
      }
    });

    this.cards = cards;
  }

  shuffle() {
    var numCards = this.cards.length;
    while (numCards > 0) {
      var rnd = Math.floor(Math.random() * numCards--);
      var tmp = this.cards[numCards];
      this.cards[numCards] = this.cards[rnd];
      this.cards[rnd] = tmp;
    }
    return this.cards;
  }

  take(requested) {
    var output = [];
    var num = Math.min(requested, this.cards.length);
    if (num > 0) {
      for (var i = 0; i < num; i++) {
        output.push(this.cards.pop());
      }
    }
    return output;
  }
}

module.exports = Deck;
