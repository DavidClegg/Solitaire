const values = ["A", "2", "3","4", "5", "6", "7","8", "9", "10", "J","Q", "K"];
const suits = ["♠", "♣", "♦", "♥"];

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
//deck = shuffle(deck);

function shuffle(deck){
  let newDeck = new Array(deck.length);
  newDeck.fill(0);
  for(let card of deck){
    let spot = Math.floor(Math.random() * deck.length-1);
    while(newDeck[spot]){ 
      // if the newDeck[spot] has a value, then generate a new spot
      // I would like to make this better, but computers are fast enough
      spot = Math.floor(Math.random() * deck.length)
    }
    newDeck[spot] = card;
  }
  return newDeck;
}
console.log("SHUFFLED DECK")
console.log(deck)



// Deal Cards
const stuckdeck = document.querySelector("#stuck-deck");
deck.forEach(card => {console.log(card);stuckdeck.appendChild(card)})
console.log("CARDS DEALT TO STUCK DECK")

const cards = document.querySelectorAll(".card");
const decks = document.querySelectorAll(".deck");
let dragged = null;

[...cards].forEach(card=>{
  // card.innerHTML = randomCard();
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

  // drop on an empty space?


  if(event.target.className == "deck"){
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
    console.log(event);
  }
}

function Card(suit, value){
  let card = document.createElement("div");
  let text = document.createTextNode(value + "" + suit);
  card.classList.add("card")
  card.appendChild(text);
  card.dataset.suit = suit;
  card.dataset.value = value
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