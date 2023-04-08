// A simple solver
function solve(){
    console.log("SOLVE")
    let cards = document.querySelectorAll(".card");
    // console.log(cards);
    let piles = document.querySelectorAll("#piles .deck");
    // console.log(piles);
    let compareFunction = (a, b) => {values.indexOf(a) - values.indexOf(b)};
    let spades = [...cards].filter(card => card.dataset.suit == suits[0]).sort(compareFunction);
    let clubs = [...cards].filter(card => card.dataset.suit == suits[1]).sort(compareFunction);
    let diamonds = [...cards].filter(card => card.dataset.suit == suits[2]).sort(compareFunction).reverse();
    let hearts = [...cards].filter(card => card.dataset.suit == suits[3]).sort(compareFunction).reverse();
    let mySuits = [spades, clubs, diamonds, hearts];
    for(let i = 0; i < piles.length; i++){
        let pile = piles[i];
        let suit = mySuits[i];
        pile.dataset.pilesuit = suits[i];
        console.log(pile);
        console.log(suit)
        for(let index = 0; index < 13; index++){
            console.log(index);
            let card = suit[index];
            // console.log(card)
            card.dataset.facedown = false;
            card.draggable = true;
            pile.appendChild(card);
        }
    }
    let extraSpace = document.querySelectorAll("#columns .deck")[4];
    extraSpace.appendChild(clubs[11]);
}
solve();