"use strict";

var Player = require("./Player.js");
var Stroke = require("./Stroke.js");

class Game {

  constructor(deck) {
    this.deck = deck;
    this.trump = deck.cards[0];
    this.players = new Array();
    this.pointer = -1;
  }

  addPlayer(name) {
    var player = new Player(name, [], this.deck);
    this.players.push(player);
  }

  nextPlayers() {
    this.pointer++;
    var attackerPrimary = this.players[this.pointer % this.players.length];
    var defendant = this.players[(this.pointer + 1) % this.players.length];
    var attackerSecondary = this.players[(this.pointer + 2) % this.players.length];
    return new Stroke(attackerPrimary, attackerSecondary, defendant, this.deck, this.trump);
  }
}

module.exports = Game;
