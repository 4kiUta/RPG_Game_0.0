
const summons = {
    // ----------------- ENEMY MONSTERS ----------------

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
        attacks: [attacks.Cure, attacks.Tackle], // attacks for this character ...
        experience: 30,
        level: 5

    },
    Emby2: {
        position: {
            x: 150,
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
        isEnemy: true,
        name: "Emby",
        attacks: [attacks.Tackle, attacks.Fireball],
        experience: 99,
        level: 5

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
        experience: 0,
        level: 5


    },

    RedHood: {
        position: {
            x: 740,
            y: 260
        },
        image: {
            src: './img/summons/redHood.png'
        },
        frames: {
            max: 18,
            hold: 30
        },
        animate: true,
        isEnemy: false,
        name: "Red Hood",
        attacks: [attacks.ComboSlice, attacks.Fireball], // attacks for this character ...
        experience: 0,
        level : 1,
    }
}