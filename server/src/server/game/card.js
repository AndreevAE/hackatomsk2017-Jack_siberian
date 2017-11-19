const cardManager = {
    generateCards: () => {
        let cards = [];

        for (let i = 6; i < 11; i++) {
            cards.push({
                num: i,
                suit: 'clubs'
            });
        }

        for (let i = 6; i < 11; i++) {
            cards.push({
                num: i,
                suit: 'diamonds'
            });
        }

        for (let i = 6; i < 11; i++) {
            cards.push({
                num: i,
                suit: 'hearts'
            });
        }

        for (let i = 6; i < 11; i++) {
            cards.push({
                num: i,
                suit: 'spades'
            });
        }


        cards.push({
            num: 1,
            suit: 'clubs'
        });
        cards.push({
            num: 1,
            suit: 'diamonds'
        });
        cards.push({
            num: 1,
            suit: 'hearts'
        });
        cards.push({
            num: 1,
            suit: 'spades'
        });

        return cards;
    }
}


module.exports = cardManager;
