"use strict";

var values = [6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];

class Card {

  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  toString() {
    return values[this.value] + " of " + this.suit;
  }
}

module.exports = Card;
