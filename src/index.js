/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('rpgGame');


// canvas.height = window.innerHeight;
// canvas.width = window.innerWidth;

canvas.width = 1024;
canvas.height = 576;
const c = canvas.getContext('2d');



// ----------------------- DRAW GAME CONSTANTS  ------------------------- //

const offset = {
    x: -929,
    y: -680
}

// ------- MAP ------ //
const mapImage = new Image();
mapImage.src = "./img/Pokemon_Style_Game_Map2.png"

const map = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapImage
})

// ------- ForeGround ------ //
const foregroundImage = new Image();
foregroundImage.src = "./img/foregrounds2.png";

const foreground = new Sprite({
    position: {
        x: offset.x, //-929,
        y: offset.y //-630
    },
    image: foregroundImage, // the background image

})





// ----------------------- CONTROL GAME CONSTANTS ------------------------- //

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    r: {
        pressed: false
    }
}

// ----------------------- MENU ONE PLAYER SELECTIOJN  ----------------------- //
// ----------------------- MENU ONE PLAYER SELECTIOJN  ----------------------- //
// ----------------------- MENU ONE PLAYER SELECTIOJN  ----------------------- //
// ----------------------- MENU ONE PLAYER SELECTIOJN  ----------------------- //



let test;
let player;
function startgame() {
    document.querySelectorAll(".choose").forEach((button) => {

        button.addEventListener("click", function (e) {
            // selected character
            const char = e.currentTarget.innerHTML;
            player = new Sprite(heroes[char]);

            player.draw()
            document.querySelector('#playerSelection').style.display = 'none'

        })
    })
}

// ----------------------- RedTileS 70 tiles per row  ------------------------- //
const RedTilesMap = []; // RedTiles array in 2d
for (let i = 0; i < collisions.length; i += 70) {
    RedTilesMap.push(collisions.slice(i, 70 + i));
}
const boundaries = []
RedTilesMap.forEach((row, yi) => {
    row.forEach((symbol, xi) => {
        if (symbol === 1025) { // only draw boundaries where we have them in the map
            boundaries.push(new RedTile({
                position: {
                    x: xi * RedTile.width + offset.x,
                    y: yi * RedTile.height + offset.y
                }
            }))
        }
    })
})


// ----------------------- BATTLE LAYERS 70 tiles per row ------------------------- //

const battleZonesMap = []; // battleground array in 2d
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

const battleZones = []
battleZonesMap.forEach((row, yi) => {
    row.forEach((symbol, xi) => {
        if (symbol === 1025) { // only draw boundaries where we have them in the map
            battleZones.push(new RedTile({
                position: {
                    x: xi * RedTile.width + offset.x,
                    y: yi * RedTile.height + offset.y
                }
            }))
        }
    })
})

// ----------------------- CHECK COLISIONS FUNCTION ------------------------- //
function rectangularCollision({ rect1, rect2 }) {
    return (rect1.right() >= rect2.left() &&
        rect1.left() <= rect2.right() &&
        rect1.top() <= rect2.bottom() &&
        rect1.bottom() >= rect2.top())
}
// ----------------------- CHECK COLISIONS FUNCTION ------------------------- //


// ----------------------- BATTLE CHECK ------------------------- //
const battle = {
    initiated: false
}
// ----------------------- BATTLE CHECK ------------------------- //




// ----------------------- ANIMATION ------------------------- //

const movables = [map, ...boundaries, foreground, ...battleZones];
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    let speed;
    if (player) {

        // Draw map
        map.draw()

        // Draw player if it was selected
        player.draw()

        foreground.draw()
        player.animate = false;
        speed = player.velocity
        player.frames.hold = 10 // Could thing to make this better and more general 
        let moving = true;





        // ----------------  BATTLE AND CANCEL MAIN ANIMATION WITH GSAP  ------------ TRIGGERS THE BATTLE SCENARIO 
        if (battle.initiated) return // if the battle is one we can no long run what is bellow

        if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {

            // for loop to check all the tiles that are battleground 
            for (let i = 0; i < battleZones.length; i++) {
                const battleZone = battleZones[i]



                // 100) FIND THE AREA OF THE INTERSECTION 
                const overlappingArea = (Math.min(player.right(), battleZone.right()) -
                    Math.max(player.left(), battleZone.left())) *
                    (Math.min(player.bottom(), battleZone.bottom()) -
                        Math.max(player.top(), battleZone.top()));



                // ----------------  COLISION WITH OBJECT ------------ TRIGGERS THE BATTLE SCENARIO 
                if (rectangularCollision({
                    rect1: player,
                    rect2: battleZone
                }) && overlappingArea > (player.width * player.height) / 2 // force the player to be more than half inside the fighting area
                    && Math.random() < 0.1  // only 1% of the time it activates a battle 
                ) {


                    // CLOSE SCENARIO close loop
                    window.cancelAnimationFrame(animationId); // stop the animation


                    console.log("BATTLE START HERE!!! ");
                    // audio.Map.stop() // stop the background music
                    // audio.initBattle.play() // start the music for battle start 
                    // audio.battle.play() // keep the music for the battle rooling !!

                    battle.initiated = true
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        repeat: 3,
                        yoyo: true,
                        duration: 0.4,
                        onComplete() {
                            gsap.to('#overlappingDiv', {
                                opacity: 1,
                                duration: 0.4,
                                onComplete() {
                                    // ACTIVATE NEW ANIMATION LOOP 
                                    initBattle()
                                    animateBattle()
                                    gsap.to('#overlappingDiv', {
                                        opacity: 0,
                                        duration: 0.4
                                    })
                                }
                            })


                        }

                    })
                    break; // as soon as we coolide we breake the loop
                }

            }
        }







        // ----------------------- MOVE  --------------------- //

        if (run) {
            speed += 10
            player.frames.hold = 3
        }

        if (keys.w.pressed && lastKey == "w") {
            // PREDICTION RedTile WITH THE FUCTURE WITH COPPY
            player.animate = true;


            player.image = player.sprites.up; // image of the player facing up
            for (let i = 0; i < boundaries.length; i++) {
                const RedTile = boundaries[i]
                // 18) RedTile WITH OBJECT 
                if (rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...RedTile, position: {
                            x: RedTile.position.x,
                            y: RedTile.position.y + speed
                        }
                    } // creates a clone of the orginal without overwritting 
                })) {

                    console.log("colliding");
                    moving = false;
                    break; // as soon as we coolide we breake the loop
                }

            }

            if (moving) {
                movables.forEach(movable => {
                    movable.position.y += speed;
                })
            }
        }



        else if (keys.s.pressed && lastKey == "s") {
            player.animate = true;
            player.image = player.sprites.down; // image of the player facing down
            for (let i = 0; i < boundaries.length; i++) {
                const RedTile = boundaries[i]
                // 18) RedTile WITH OBJECT 
                if (rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...RedTile, position: {
                            x: RedTile.position.x,
                            y: RedTile.position.y - speed
                        }
                    } // creates a clone of the orginal without overwritting 
                })) {
                    console.log("colliding");
                    moving = false;
                    break; // as soon as we coolide we breake the loop
                }

            }
            if (moving) {
                movables.forEach(movable => {
                    movable.position.y -= speed;
                })

            }
        }
        else if (keys.d.pressed && lastKey == "d") {
            player.animate = true;
            player.image = player.sprites.right; // image of the player facing right
            for (let i = 0; i < boundaries.length; i++) {
                const RedTile = boundaries[i]
                // 18) RedTile WITH OBJECT 
                if (rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...RedTile, position: {
                            x: RedTile.position.x - speed,
                            y: RedTile.position.y
                        }
                    } // creates a clone of the orginal without overwritting 
                })) {
                    console.log("colliding");
                    moving = false;
                    break; // as soon as we coolide we breake the loop
                }

            }
            if (moving) {
                movables.forEach(movable => {
                    movable.position.x -= speed;
                })

            }
        }
        else if (keys.a.pressed && lastKey == "a") {
            player.animate = true;
            player.image = player.sprites.left;
            for (let i = 0; i < boundaries.length; i++) {
                const RedTile = boundaries[i]
                // 18) RedTile WITH OBJECT 
                if (rectangularCollision({
                    rect1: player,
                    rect2: {
                        ...RedTile, position: {
                            x: RedTile.position.x + speed,
                            y: RedTile.position.y
                        }
                    } // creates a clone of the orginal without overwritting 



                })) {
                    moving = false;
                    break; // as soon as we coolide we breake the loop
                }

            }
            if (moving) {
                movables.forEach(movable => {
                    movable.position.x += speed;
                })


            }
        }
    }
}







// --------------------- CONTROLS --------------------------- // 

let pressShift = {
    shift: false,
};
let lastKey = '';
let run = false;

window.addEventListener("keydown", (event) => {

    if (event.key === "Shift") {
        pressShift.shift = true;
    }

    if (event.key === "w") {
        lastKey = 'w';
        keys.w.pressed = true;
        console.log("wwwww")
    }
    if (event.key === "s") {
        lastKey = 's';
        keys.s.pressed = true

    }
    if (event.key === "a") {
        lastKey = 'a';
        keys.a.pressed = true

    }
    if (event.key === "d") {
        lastKey = 'd';
        keys.d.pressed = true
    }

    if (event.key && pressShift.shift) {
        run = true;

    }

});

window.addEventListener("keyup", (event) => {

    pressShift.shift = false

    if (event.key === "w") {
        keys.w.pressed = false;
    }
    if (event.key === "s") {
        keys.s.pressed = false

    }
    if (event.key === "a") {
        keys.a.pressed = false

    }
    if (event.key === "d") {
        keys.d.pressed = false
    }
    if (event.key === "Shift") {
        keys.d.pressed = false
        keys.a.pressed = false
        keys.s.pressed = false
        keys.w.pressed = false;
        run = false;

    }


});




// let clicked = false;
// addEventListener("click", () => {
//     if (!clicked) {
//         document.querySelector('#playerSelection').style.display = 'block'
//         startgame()
//         animate()
//         clicked = true;

//     }
// })

document.querySelector('#playerSelection').style.display = 'block'
startgame()
animate()


