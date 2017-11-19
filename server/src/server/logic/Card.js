class Card {
    constructor(suit, num, value) {
        this.suit = suit;
        this.value = parseInt(value);
        this.num = num;
    }

    toDict() {
        return {
            suit: this.suit,
            value: this.value,
            num: this.num
        }
    }
}

module.exports = Card;
