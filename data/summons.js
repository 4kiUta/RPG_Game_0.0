
const summons = {
    // ----------------- ENEMY MONSTERS ----------------

    Skeleton: {
        position: {
            x: 150,
            y: 300
        },
        image: {
            src: './img/summons/skeleton.png'
        },
        frames: {
            max: 6,
            hold: 8
        },
        animate: true,
        isEnemy: true,
        name: "Skeleton",
        attacks: [attacks.Punch, attacks.swordBomb], // attacks for this character ...
        experience: 100,
        level: 5

    },


    Goblin: {
        position: {
            x: 150,
            y: 300
        },
        image: {
            src: './img/summons/GoblinSprite.png'
        },
        frames: {
            max: 5,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: "Goblin",
        attacks: [attacks.Bomb, attacks.Punch], // attacks for this character ...
        experience: 100,
        level: 5

    },

    FlyingEye: {
        position: {
            x: 150,
            y: 300
        },
        image: {
            src: './img/summons/FlyingEyeSprite.png'
        },
        frames: {
            max: 5,
            hold: 20
        },
        animate: true,
        isEnemy: true,
        name: "FlyingEye",
        attacks: [attacks.Cure, attacks.Punch], // attacks for this character ...
        experience: 100,
        level: 5

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
        attacks: [attacks.Cure, attacks.Punch], // attacks for this character ...
        experience: 100,
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
        attacks: [attacks.Punch, attacks.Fireball],
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
        attacks: [attacks.Punch, attacks.Fireball, attacks.ComboSlice, attacks.Cure, attacks.ComboSlice, attacks.ComboSlice],
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
        attacks: [attacks.ComboSlice, attacks.Fireball, attacks.Punch], // attacks for this character ...
        experience: 0,
        level: 1,
    }
}