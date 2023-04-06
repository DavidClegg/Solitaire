const values = ["A", "2", "3","4", "5", "6", "7","8", "9", "10", "J","Q", "K"];
const suits = ["♠", "♣", "♦", "♥"];
const stuckdeck = document.querySelector("#stuck-deck");
const dealtdeck = document.querySelector("#dealt-deck");

// Create Deck
let deck = new Array();
for(let suit = 0; suit < suits.length; suit++){
  for(let value = 0; value < values.length; value++){
    deck.push(new Card(suits[suit], values[value]));
  }
}
console.log("CREATED DECK")
console.log(deck)
// Shuffle
deck = shuffle(deck);

function shuffle(deck){
  let newDeck = new Array(deck.length);
  newDeck.fill(0);
  for(let card of deck){
    let spot = Math.floor(Math.random() * deck.length);
    while(newDeck[spot]){ 
      // if the newDeck[spot] has a value, then generate a new spot
      // I would like to make this better, but computers are fast enough
      spot = Math.floor(Math.random() * deck.length)
    }
    newDeck[spot] = card;
  }
  console.log("NEW DECK")
  console.log(newDeck)
  return newDeck;
}
console.log("SHUFFLED DECK")
console.log(deck)


// Deal Cards
deck.forEach(card => {console.log(card);stuckdeck.appendChild(card)});
console.log("CARDS DEALT TO STUCK DECK");

// Deal to other decks

dealToColumns()
function dealToColumns(){
  // Deal one facedown card to each column if the current number <= facedown number
  let cards = stuckdeck.querySelectorAll(".card");
  let columnDecks = document.querySelectorAll("#columns > .deck");
  let currentCard = cards.length - 1;

  // Then deal successive cards to the bottom of the pile
  
  for(let deck of columnDecks){
    let facedowns = parseInt(deck.dataset.facedowns);
    let count = 0;
    while(count < facedowns + 1){
      count++;
      let topCard = cards[currentCard];
      currentCard--;
      lastElement(deck).appendChild(topCard);
      let foundBottom = false;
      let checkedCard = deck;
    }

    console.log("CARDS DEALT TO COLUMNS");
    
    console.log("FLIPPING BOTTOM CARDS");
    lastElement(deck).dataset.facedown = false;
  }
  
  // I need a method for getting the bottom card in a stack
  // I need a method for getting the top card in a run
}

function lastElement(element){
  /**
   * May need to rewrite this.
   * I think using QuerySelector might be better.
   */
  // I could be given any element
  // If the element is a deck then check that it has nodes
  let type = element.dataset.type;
  let count = element.childElementCount;
  // console.log({element,type,count,element.childNodes})
  if(type == "deck"){
    if(count == 0){
      return element;
    } else {
      return lastElement(element.lastElementChild)
    }
  } else if(type == "card"){
    if(count > 1){
      return lastElement(element.lastElementChild);
    } else {
      return element;
    }
  } else {
    console.error("Last Element Not Given A Card Or Deck");
  }
}


const cards = document.querySelectorAll(".card");
const decks = document.querySelectorAll(".deck");
let dragged = null;

[...cards].forEach(card=>{
  card.addEventListener("dragstart", dragstart);
})

function dragstart(event){
  dragged = event.target;
};

[...decks].forEach(deck=>{
  deck.addEventListener("dragover", preventDefault);
  deck.addEventListener("drop", drop);
})




function preventDefault(event){
  event.preventDefault();
}


function drop(event){
  // drop on a card?
  // drop on a deck?
  /// empty space
  /// occupied
  /// piles
  //// I should be able to bubble update events up.
  //// So when I pick a card I should be able to tell parent cards to flip if they have no more child cards

  //// `this` is the deck
  //// I can always get the deck, and so the bottom card, or check the suit and cards on a pile
  //// And it means I can give the columns a different stacking rule to the piles
  //console.log(this)
  if(event.target.dataset.suit == dragged.dataset.suit){// && this.dataset.value == dragged.dataset.value){
    // This works to check if the dragged node is the same as the target
    // but to check if it's a parent I should go up the node tree,
    /// If I reach this node up the tree then stop
    console.log("SAME")
    return
  }

  if(event.target.className == "deck" || event.target.className == "card"){
    console.log(event);

    console.log(event.target);

    console.log(dragged)
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
}

function Card(suit, value){
  let card = document.createElement("div");
  let p = document.createElement("p");
  p.classList.add("unselectable");
  let text = document.createTextNode(value + "" + suit);
  card.classList.add("card")
  p.appendChild(text);
  card.appendChild(p)
  card.dataset.suit = suit;
  card.dataset.value = value;
  card.dataset.facedown = true;
  card.dataset.type = "card";
  card.draggable = true;
  return card;
}



// Initialise
// Create Field
// Add deck events

// Create the deck
// Deal the cards
// Add card events

/**
 * Logic:
 */


stuckdeck.addEventListener("click", event=>{
  console.log("CLICKED STUCK DECK")
  let cards = stuckdeck.querySelectorAll(".card");
  console.log(cards)
  if(cards.length){
    let topCard = cards[cards.length - 1];
    topCard.dataset.facedown = false;
    dealtdeck.appendChild(topCard);
  } else {
    cards = dealtdeck.querySelectorAll(".card")
    for(let index = cards.length - 1; index >= 0; index-- ){
      cards[index].dataset.facedown = true;
      stuckdeck.appendChild(cards[index]);
    }
  }
})


/**TODO:
 *  Facedown cards should be draggable
 *  There should be rules for which cards can be placed on which
 *    (Black~Red in decending order on columns, Suit-specific in ascending order on piles)
 *  Cards need to be placed on the piles as children of the pile, and taken off in order
 *  Need a fix for parents being placed on children and getting deleted
 *  Need to handle runs properly
 *  Need to flip cards if a facedown card is the bottom mode card
 */