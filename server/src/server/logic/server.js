const express = require('express');
const app = express();

var Deck = require('./models/Deck.js');
var Player = require('./models/Player.js');
var Stroke = require('./models/Stroke.js');
var Game = require('./models/Game.js');

prompt = require("prompt");
async = require("async");

var deck = new Deck();
deck.shuffle();

var game = new Game(deck);
console.log("Trump card: " + game.trump);

for (var i = 0; i < 4; i++) {
  game.addPlayer("Igrok" + i);
}

console.log("Players:");
game.players.forEach(function(player) {
  console.log(" - " + player.name);
});

move(game, function(err, res) {
  if (err) console.log(err);
  console.log(res.name + " won");
});

function cardSelection(player, noopt, cb) {
  if (noopt) console.log(" 0 None");
  for (var i = 0; i < player.cards.length; i++) {
    console.log(" " + i + " " + player.cards[i].toString());
  }
  prompt.get("choice", function(err, attack) {
    if (err) cb(err);
    if (noopt && attack.choice == 0) {
      cb(null, null);
    }
    cb(null, player.cards[attack.choice]);
  });
}

function attack(stroke, secondary, cb) {
  var player;
  if (!secondary) {
    player = stroke.attackerPrimary;
  }
  else {
    player = stroke.attackerSecondary;
  }
  console.log(stroke.cards);
  console.log(player.name + " attack with:");
  cardSelection(player, stroke.cards.length > 0, function(err, card) {
    if (err) cb(err);
    if (!card) {
      return cb(null, false);
    }
    if(stroke.attack([card], player)) {
      cb(null, true);
    }
    else {
      console.log("Invalid Card");
      attack(stroke, secondary, cb);
    }
  });
}

function defend(stroke, cb) {
  async.eachSeries(stroke.cards, defendPair(stroke), function(err) {
    cb(err);
  });
}

function defendPair(board) {
  function defendPairInner(pair, cb) {
    if (pair.defense) {
      cb(null);
    }
    console.log("Defend " + pair.attack.toString() + " with:");
    cardSelection(stroke.defendant, true, function(err, card) {
      if (err) {
        cb(err);
      }
      if (!card) {
        stroke.setDefendantDone();
        return cb(true);
      }
      else {
        if (stroke.defend(pair, card)) {
          return cb(null);
        }
        else {
          defendPairInner(pair, cb);
        }
      }
    });
  }
  defendPairInner();
}

function move(game, cb) {
  var stroke = game.nextPlayers();
  console.log(stroke.attackerPrimary.name + " attacks " + stroke.defendant.name);
  console.log(stroke.attackerSecondary.name + " helps.");

  function attackCycle() {
    attack(stroke, false, function(err, res) {
      if (err) cb(err);
      if (!res) {
        if(stroke.setPrimaryDone()) {
          table.pointer++;
          return move(game, cb);
        }
      }
      attack(stroke, true, function(err, res) {
        if (!res) {
          if(stroke.setSecondaryDone()) {
            game.pointer++;
            return move(game, cb);
          }
        }

        defend(stroke, function(res) {
          game.players.forEach(function(player) {
            if(player.cards.length == 0) {
              return cb(null, player);
            }
          });
        });
        if(res) {
          move(game, cb);
        }
        else {
          attackCycle()
        }
      });
    });
  }
  attackCycle();
}
