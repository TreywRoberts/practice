import Phaser from "phaser";

const createBanditAnims = (anims: Phaser.Animations.AnimationManager) =>{

    anims.create({
        key: 'bad-idle',
        frames: anims.generateFrameNames('bad', {start:1, end:  3, prefix: 'Bandit', suffix: '.png'}),
        repeat: -1,
        frameRate: 10
    })

    anims.create({
     key: 'bad-run-right',
     frames: anims.generateFrameNames('bad', {start:1, end:  3, prefix: 'BanditR', suffix: '.png'}),
     repeat: -1,
     frameRate: 10
 })

 anims.create({
    key: 'bad-run-left',
    frames: anims.generateFrameNames('bad', {start:1, end:  3, prefix: 'BanditL', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
})

anims.create({
    key: 'bad-run-up',
    frames: anims.generateFrameNames('bad', {start:1, end:  3, prefix: 'BanditB', suffix: '.png'}),
    repeat: -1,
    frameRate: 10
})

}

export{ 
    createBanditAnims
}