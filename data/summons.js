
const summons = {
    // ----------------- ENEMY MONSTERS ----------------

    RedHood: {
        position: {
            x: 800,
            y: 100
        },
        image: {
            src: './img/summons/redHood.png'
        },
        frames: {
            max: 18,
            hold: 30
        },
        animate: true,
        isEnemy: true,
        name: "Red Hood",
        attacks: [attacks.ComboSlice] // attacks for this character ...
    },

    Draggle: {
        position: {
            x: 150,
            y: 300
        },
        image: {
            src: './img/summons/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        isEnemy: true,
        name: "Draggle",
        attacks: [attacks.Cure], // attacks for this character ...
        experience: 30
    },




    // ----------------- OUR MONSTER ----------------
    Emby: {
        position: {
            x: 788,
            y: 300
        },
        image: {
            src: './img/summons/embySprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        isEnemy: false,
        name: "Good Guy",
        attacks: [attacks.Tackle, attacks.Fireball, attacks.ComboSlice, attacks.Cure, attacks.ComboSlice, attacks.ComboSlice],
        experience: 0

    }
}