const audio = {
    Map: new Howl({
        src: './audio/Albinoni-adagio-in-g-minor-acoustic-guitar.mp3',
        html5: true,
        volume: 0.1,
        loop: true
    }),
    initBattle: new Howl({
        src: './audio/initBattle.wav',
        html5: true,
        volume: 0.1
    }),
    battle: new Howl({
        src: './audio/battle.mp3',
        html5: true,
        volume: 0.1
    }),
    tackleHit: new Howl({
        src: './audio/tackleHit.wav',
        html5: true,
        volume: 0.1
    }),
    firebalHit: new Howl({
        src: './audio/fireballHit.wav',
        html5: true,
        volume: 0.1
    }),
    initFireBall: new Howl({
        src: './audio/initFireball.wav',
        html5: true,
        volume: 0.1
    }),
    victory: new Howl({
        src: './audio/victory.wav',
        html5: true,
        volume: 0.1
    })

}