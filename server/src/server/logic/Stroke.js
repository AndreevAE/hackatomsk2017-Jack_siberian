const Card = require("./Card.js");


class Stroke {
    constructor(attackerPrimary, attackerSecondary, defendant, pack, trump, cards) {
        this.attackerPrimary = attackerPrimary;
        this.attackerSecondary = attackerSecondary;
        this.defendant = defendant;
        this.pack = pack;
        this.trump = trump;
        console.log(attackerPrimary.name + " (" + attackerSecondary.name + ") vs. " + defendant.name);

        if (cards) {
            this.cards = cards;
        } else {
            this.cards = [];
        }

        this.primaryDone = false;
        this.secondaryDone = false;
        this.defendantDone = false;
    }

    attack(cards, player) {
        if (this.cards.length && !this.cards[this.cards.length - 1].defense) {
            console.log('attack. bad cards')
            return false;
        }

        if (player !== this.attackerPrimary && player !== this.attackerSecondary) {
            return false;
        }

        if (this.cards.length === 0) {
            if (player !== this.attackerPrimary) {
                return false;
            }
            let value = cards[0].value;
            cards.forEach(function (card) {
                if (card.value !== value) {
                    return false;
                }
            });
        } else {
            let values = [];
            this.cards.forEach(function (card) {
                values.push(card.attack.value);
                if (card.defense) {
                    values.push(card.defense.value);
                }
            });

            cards.forEach(card => {
                if (values.indexOf(card.value) < 0) {
                    return false;
                }
            });
        }

        cards.forEach(card => {
            player.remove(card);

            this.cards.push({
                attack: card,
                defense: null
            });
        });


        this.primaryDone = this.secondaryDone = this.defendantDone = false;
        console.log("allowed");
        return player;
    }

    defend(coupleId, defenseCard) {
        let attack = this.cards[coupleId];
        console.log(coupleId, attack, this.cards);
        console.log(this.defendant.name + " defends " + attack.attack.toDict() + " with" +
            " " + defenseCard.toDict());

        if (defenseCard.suit === this.trump.suit) {
            if (attack.attack.suit === this.trump.suit) {
                if (defenseCard.value < attack.attack.value) {
                    attack.defense = defenseCard;
                    return false;
                }
            }
        } else {
            if (defenseCard.suit === attack.attack.suit) {
                if (defenseCard.value < attack.attack.value) {
                    return false;
                }
            } else {
                return false;
            }
        }

        attack.defense = defenseCard;
        this.defendant.remove(defenseCard);
        this.primaryDone = this.secondaryDone = this.defendantDone = false;
        console.log("successful");
        return attack;
    }

    setPrimaryDone() {
        this.primaryDone = true;
        this.finalize();
    }

    setSecondaryDone() {
        this.secondaryDone = true;
        this.finalize();
    }

    setDefendantDone() {
        this.defendantDone = true;
        this.finalize();
    }

    finalize() {
        if (this.primaryDone && this.secondaryDone || this.defendantDone) {
            let defeated = true;
            let cards = [];
            this.cards.forEach(function (attack) {
                cards.push(attack.attack);
                if (attack.defense) {
                    cards.push(attack.defense);
                }
                if (!attack.defense) {
                    defeated = false;
                }
            });

            if (!defeated && this.defendantDone) {
                this.defendant.eat(cards);
            }

            this.attackerPrimary.fill(this.pack);
            this.attackerSecondary.fill(this.pack);
            this.defendant.fill(this.pack);
            this.cards = [];
            return true;
        } else {
            return false;
        }
    }

    toDict() {
        return {
            cards: this.cards.map(card => {
                return {
                    attack: card.attack && card.attack.toDict(),
                    defense: card.defense && card.defense.toDict()
                }
            })
        }
    }
}

module.exports = Stroke;
