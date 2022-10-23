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

const ourMonster = new Summon(summons.RedHood)

let enemyMoster;
let renderedSprites;
let queue = [];


function initBattle() {

    // Monster Availuable --> make it more effecient 
    let a = new Summon(summons.Emby2)
    let b = new Summon(summons.Draggle)

    const monsterColection = [b, a]
    const enemyMoster = monsterColection[Math.floor(Math.random() * monsterColection.length)]



    document.querySelector("#userInterface").style.display = 'block'
    document.querySelector("#dialgueBox").style.display = 'none'
    document.querySelector("#enemyHealthBar").style.width = '100%'
    document.querySelector('#statusInfoBad .currentLevel').innerHTML = enemyMoster.level;
    document.querySelector('#statusInfoGood .currentLevel').innerHTML = ourMonster.level
    document.querySelector("#playerHealthBar").style.width = ourMonster.health + '%'
    document.querySelector("#attacksBox").replaceChildren()




    renderedSprites = [enemyMoster, ourMonster]
    queue = []


    document.querySelector("#statusInfoBad .name").innerHTML = enemyMoster.name;

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

            let originalSummonHealth = ourMonster.health

            ourMonster.attack({
                attack: selectedAttack,
                recipient: enemyMoster,
                renderedSprites
            })

            let finalSummonHealth = ourMonster.health

            const result = finalSummonHealth - originalSummonHealth

            // ----------------------------- OUR MONSTER ATTACK OUR MONSTER ATTACK  OUR MONSTER ATTACK !!!---------------------- //
            // -------------- SEND TO THE QUE SOME INFORMATION ABOUT THE ATTACK -------------------- //

            if (selectedAttack.type === "Healing") {
                queue.push(() => {
                    document.querySelector("#dialgueBox").innerHTML = ourMonster.name + " recovered " + result + " points of life"
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


                    // -----------------------------LEVEL UP ---------------------- //

                    if (ourMonster.experience >= 100) {
                        ourMonster.experience = 100;
                    }

                    gsap.to(".lv-increase", {
                        width: ourMonster.experience + '%',
                        onComplete: () => {
                            if (ourMonster.experience === 100) {
                                ourMonster.level += 1;
                                ourMonster.addAttack()
                                ourMonster.experience = 0;
                                document.querySelector("#dialgueBox").innerHTML = "Level Up"

                                gsap.to(".lv-increase", {
                                    width: 0,
                                    opacity: 0,
                                    duration: 2,
                                    onComplete: () => {
                                        document.querySelector('#statusInfoGood .currentLevel').innerHTML = ourMonster.level
                                    }
                                })
                            }
                        }
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
                            document.querySelector("#attackInfo").style.cssText = 'display:flex;'
                            document.querySelector("#attacksBox").style.cssText = 'display:grid;'
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

            let originaEnemyHealth = enemyMoster.health

            queue.push(() => {
                enemyMoster.attack({
                    attack: randomAttack,
                    recipient: ourMonster,
                    renderedSprites
                })

                let finalEnemyHealth = enemyMoster.health

                const enemyResult = finalEnemyHealth - originaEnemyHealth

                // -------------- SEND TO THE QUE SOME INFORMATION ABOUT THE ATTACK -------------------- //

                if (randomAttack.type === "Healing") {
                    queue.push(() => {
                        document.querySelector("#dialgueBox").innerHTML = enemyMoster.name + " recovered " + enemyResult + " points of life"
                    })
                } else {
                    queue.push(() => {
                        document.querySelector("#dialgueBox").innerHTML = enemyMoster.name + " did " + randomAttack.damage + " damage"
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
                                document.querySelector("#attackInfo").style.cssText = 'display:flex;'
                                document.querySelector("#attacksBox").style.cssText = 'display:grid;'
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