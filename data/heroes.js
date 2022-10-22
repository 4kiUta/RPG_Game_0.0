

// HERO 1 images
const playerDownImage = new Image()
playerDownImage.src = "./img/heroes/alDown.png";
const playerUpImage = new Image()
playerUpImage.src = "./img/heroes/alUp.png"
const playerRightImage = new Image()
playerRightImage.src = "./img/heroes/alRight.png"
const playerLeftImage = new Image()
playerLeftImage.src = "./img/heroes/alLeft.png"



// HERO 2 images
const player2DownImage = new Image()
player2DownImage.src = "./img/heroes/liDown.png";
const player2UpImage = new Image()
player2UpImage.src = "./img/heroes/liUp.png"
const player2RightImage = new Image()
player2RightImage.src = "./img/heroes/liRight.png"
const player2LeftImage = new Image()
player2LeftImage.src = "./img/heroes/liLeft.png"


const heroes = {
    Al: {
        position: {
            x: 1024 / 2 - (192 / 3) / 2, // location of place in x
            y: 576 / 2 - 68 / 2
        },
        image: playerDownImage,
        frames: {
            max: 3,
            hold: 10
        },
        sprites: {
            up: playerUpImage,
            down: playerDownImage,
            right: playerRightImage,
            left: playerLeftImage
        },
        velocity : 3
    },

    Li: {
        position: {
            x: 1024 / 2 - (192 / 3) / 2, // location of place in x
            y: 576 / 2 - 68 / 2
        },
        image: player2DownImage,
        frames: {
            max: 3,
            hold: 1
        },
        sprites: {
            up: player2UpImage,
            down: player2DownImage,
            right: player2RightImage,
            left: player2LeftImage
        }, 
        velocity : 5

    }
}