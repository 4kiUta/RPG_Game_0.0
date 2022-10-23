const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleback1.png';


const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: battleBackgroundImage
});



// --------------------------- BATTLE SCENARIO  (CHANGE THE IMAGE HERE ) --------------------- //

const ourMonster = new Summon(summons.Emby)

let enemyMoster;
let renderedSprites;
let queue = [];


function initBattle() {
    document.querySelector("#userInterface").style.display = 'block'
    document.querySelector("#dialgueBox").style.display = 'none'
    document.querySelector("#enemyHealthBar").style.width = '100%'
    document.querySelector("#playerHealthBar").style.width = ourMonster.health + '%'
    document.querySelector("#attacksBox").replaceChildren()


    // Monster Availuable --> make it more effecient 
    a = new Summon(summons.RedHood)
    b = new Summon(summons.Draggle)
    const monsterColection = [b]
    enemyMoster = monsterColection[Math.floor(Math.random() * monsterColection.length)]


    renderedSprites = [enemyMoster, ourMonster]
    queue = []

    ourMonster.attacks.forEach((attack) => {
        const button = document.createElement("button");

        button.setAttribute("class", "whatAttack");
        button.innerHTML = attack.name
        document.querySelector("#attacksBox").append(button);
    })



    // ----------------------------- OUR ATTACK ---------------------- //


    document.querySelectorAll(".whatAttack").forEach((button) => {
        button.addEventListener("click", (e) => {

            document.querySelector("#attackInfo").style.display = 'none'
            document.querySelector("#attacksBox").style.display = 'none'

            const selectedAttack = attacks[e.currentTarget.innerHTML]; // get the attack that we want 


            let finalHealth = ourMonster.attack({
                attack: selectedAttack,
                recipient: enemyMoster,
                renderedSprites
            })


            // ----------------------------- OUR MONSTER ATTACK OUR MONSTER ATTACK  OUR MONSTER ATTACK !!!---------------------- //
            // -------------- SEND TO THE QUE SOME INFORMATION ABOUT THE ATTACK -------------------- //

            if (selectedAttack.type === "Healing") {
                queue.push(() => {
                    document.querySelector("#dialgueBox").innerHTML = ourMonster.name + " recovered " + finalHealth + " points of life"
                })
            } else {
                queue.push(() => {
                    document.querySelector("#dialgueBox").innerHTML = ourMonster.name + " did " + selectedAttack.damage + " damage"
                })
            }



            // -----------------------------DEAD ENEMY ---------------------- //

            if (enemyMoster.health <= 0) {
                queue.push(() => {
                    enemyMoster.faint()
                    ourMonster.experience += enemyMoster.experience

                    gsap.to(".lv-increase", {
                        width: ourMonster.experience + '%'
                    })

                })


                queue.push(() => {
                    // fade back to black 
                    gsap.to("#overlappingDiv", {
                        opacity: 1,
                        onComplete: () => {
                            window.cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector("#userInterface").style.display = 'none'

                            gsap.to("#overlappingDiv", {
                                opacity: 0
                            })
                            battle.initiated = false
                            // audio.Map.play()
                        }
                    })
                })

                return // to stop 
            }


            // ----------------------------- ENEMY ATTACK ENEMY ATTACK  ENEMY ATTACK !!!---------------------- //
            // ----------------------------- CREATING THE QUUE OF EVENTS  ENEMY ATTACK !!!---------------------- //
            // RANDOM ATTACK FROM ENEMY 
            const randomAttack = enemyMoster.attacks[Math.floor(Math.random() * enemyMoster.attacks.length)]


            queue.push(() => {
                enemyMoster.attack({
                    attack: randomAttack,
                    recipient: ourMonster,
                    renderedSprites
                })



            // -------------- SEND TO THE QUE SOME INFORMATION ABOUT THE ATTACK -------------------- //

            if (selectedAttack.type === "Healing") {
                queue.push(() => {
                    document.querySelector("#dialgueBox").innerHTML = enemyMoster.name + " recovered " + finalHealth + " points of life"
                })
            } else {
                queue.push(() => {
                    document.querySelector("#dialgueBox").innerHTML = enemyMoster.name + " did " + selectedAttack.damage + " damage"
                })
            }

                // -----------------------------WE DEADE  ---------------------- //
                if (ourMonster.health <= 0) {
                    queue.push(() => {
                        ourMonster.faint()

                        // fade back to black 
                        gsap.to("#overlappingDiv", {
                            opacity: 1,
                            onComplete: () => {
                                window.cancelAnimationFrame(battleAnimationId)
                                animate()
                                document.querySelector("#userInterface").style.display = 'none'
                                gsap.to("#overlappingDiv", {
                                    opacity: 0
                                })


                                battle.initiated = false
                                // audio.Map.play()
                            }
                        })
                    })

                    return // to stop 
                }
            })


        })


        // event listener for info about attacks 
        button.addEventListener("mouseenter", (e) => { // when we over the buttons 
            const hoverAttack = attacks[e.currentTarget.innerHTML]; // get the attack that we want 
            document.querySelector("#attackType").innerHTML = hoverAttack.dscr
            document.querySelector("#attackType").style.color = hoverAttack.color


        })
    })
}





let battleAnimationId;
function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)

    battleBackground.draw();

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}




// ------------------------- TRIGGER THE DIALOGO BOX EVENTS WIT HE QUE -------------------------- //
document.querySelector("#dialgueBox").addEventListener("click", (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = "none";
        document.querySelector("#attackInfo").style.cssText = 'display:flex;'
        document.querySelector("#attacksBox").style.cssText = 'display:grid;' // cssText --> allows us to pass a css text to change the style of an DOM object 

    }

})