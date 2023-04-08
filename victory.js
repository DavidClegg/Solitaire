// The victory animation
// This is modular because I had the terrible idea that I can replace this with different victory animations.
// I'm not making more victory animations


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

