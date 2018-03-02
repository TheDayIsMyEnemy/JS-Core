function printDeckOfCards(cards) {
    let deck = [];
    for (let c of cards) {
        let face = c.length > 2 ? c[0] + c[1] : c[0];
        let suit = c.length > 2 ? c[2] : c[1];
        try{
            let card = createCard(face,suit);
            deck.push(card);
        }catch(ex){
            console.log("Invalid card: " + c);
            return;
        }
    }
    
    console.log(deck.join(' '));
    
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
}
printDeckOfCards(['5S', '3D', 'QD', '1C']);
//printDeckOfCards(['AS', '10D', 'KH', '2C']);