function createCard(face, suit) {
    const validCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const validSuits = {
        S:'\u2660',
        H:'\u2665',
        D:'\u2666',
        C:'\u2663'
    }

    if(!validCards.includes(face)){
        throw new Error('Invalid card face: ' + face);
    }
    if(!Object.keys(validSuits).includes(suit)){
        throw new Error('Invalid card suit: ' + suit);
    }

    let card = {
        face: face,
        suit: suit,
        toString: function () {
            return this.face + validSuits[this.suit];
        }
    }

    return card;
}

console.log(createCard('K', 'S').toString());