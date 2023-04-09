// The victory animation
// This is modular because I had the terrible idea that I can replace this with different victory animations.
// I'm not making more victory animations
/// Other options for victory animations could be:
////    Mouse trail effect
////    Firework effect
////    Cards circling
////    Raining
// Physics Variables
let floor = 600;
let rightWall;
let gravity;
let maxSpeed = 100;

function victory(){

    let piles = document.querySelectorAll("#piles .deck");
    let cards = [];
    for(let i = 0; i < 13; i++){
        for(let j = 0; j < 4; j++){
            cards.unshift(piles[j].childNodes[i])
        }
    }
    let activeCards = cards.map(card => new ActiveCard(card));

    // console.log("PILES")
    // console.log(piles)

    // console.log("CARDS")
    // console.log(cards)

    // console.log("ACTIVE CARDS")
    // console.log(activeCards)

    //activeCards[0].log = true;

    let timeout = 1000;
    activeCards.forEach(card => {setTimeout(card.flipflag.bind(card), timeout); timeout+=3000});

    let keyTime = 0;

    function animate(time){
        //console.log(time)
        activeCards.forEach(card => card.update(card));
        if(time - keyTime > 30){
            activeCards.forEach(card => card.draw(card));
            keyTime = time;
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

class ActiveCard{
    constructor(card, x = 1200, y = 100){
        this.flag = false;
        this.log = false;
        this.card = card;
        this.x = x;
        this.y = y;
        this.upForce = 0;
        this.downForce = 0;
        this.vertical = Math.floor(Math.random() * 20) + 3; // the constant leftward speed, but randomised to give it a varied feel.
    }
    update(){
        //console.log(this.flag)
        if(this.flag == true){
            // Physics logic
            this.x -= this.vertical;
            this.downForce += (maxSpeed - this.downForce) / maxSpeed
            this.y = this.y + ( this.downForce + this.upForce)
            this.upForce *= 0.9;

            if(this.y > 600){
                // bounce
                this.y = 600;
                this.upForce = -this.downForce;
                this.downForce = 0;
            }

            if(this.x < 0){
                //console.info(this)
                this.flag = false;
            }
        }
    }
    draw(){
        if(this.log){
            console.log(this)
        }
        let newCard = this.card.cloneNode(true);
        newCard.style.position = "absolute";
        newCard.style.top = this.y + "px";
        newCard.style.left = this.x + "px";
        document.body.appendChild(newCard)
    }
    flipflag(){
        //console.log(this)
        this.flag = true;
    }
}





// let timeout = 1000;
// activeCards.forEach(card => {setTimeout(card.flipflag, timeout); timeout+=1000});

// function animate(time){
//     activeCards.forEach(card => card.update());
//     requestAnimationFrame(animate);
// }
// requestAnimationFrame(animate);

// class ActiveCard{
//     constructor(){
//         this.flag = false;
//         this.x = 100;
//     }
//     update(){
//         console.log(this.flag)
//         if(this.flag == true){
//             // do stuff
//             this.x = this.x - 1;
//             if(this.x < 0){
//                 this.flag = false;
//             }
//         }
//     }
//     flipflag(){
//         this.flag = true;
//     }
// }












/*
function victory(){
    console.log("--VICTORY");

    let flag = true;
    let piles = document.querySelectorAll("#piles .deck");
    let pileIndex = 0;
    let pile = piles[0]
    let x = pile.offsetLeft;
    let y = pile.offsetTop;
    let card = pile.lastElementChild;
    card.style.position = "absolute";
    card.style.setProperty("left", x);
    card.style.setProperty("top", y);

    let upForce = 0;
    let downForce = 1;
    let maxSpeed = 10;
    let gravity = 1;
    let vertical = 1;

    let decay = force => force * 0.9;
    let bounce = () => {upForce += maxSpeed; downForce = 0;};
    let applyForces = () => {upForce = decay(upForce); downForce += (maxSpeed - downForce) / maxSpeed;};
    let phys = physics(card)

    function animate(frameTime){
        // frameTime is time in miliseconds since the document loaded;
        console.log(frameTime);
        phys.next();

        if(flag){
            requestAnimationFrame(animate);
        }
    }
    
    function* physics(card){
        // Maybe this could be a generator function
        
        
        while(x > 0){
            console.log(x)
            if(y < 120){bounce()} else {applyForces()};
            y -= upForce - downForce;
            x -= vertical;
            card.style.setProperty("top", y);
            card.style.setProperty("left", x);
            yield card.cloneNode(true);
        }
        card.remove()
    }
    requestAnimationFrame(animate);
}

*/