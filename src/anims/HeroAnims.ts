import Phaser from "phaser";

const createHeroAnims = (anims: Phaser.Animations.AnimationManager) =>{

    anims.create({
        key: 'hero-idle-down',
        frames: [{key: 'hero', frame:'Hero2.png'}]
    })

    anims.create({
     key: 'hero-idle-up',
     frames: [{key: 'hero', frame:'HeroB2.png'}]
 })

 anims.create({
     key: 'hero-idle-left',
     frames: [{key: 'hero', frame:'HeroL2.png'}]
 })

 anims.create({
     key: 'hero-idle-right',
     frames: [{key: 'hero', frame:'HeroR2.png'}]
 })

    anims.create({
        key: 'hero-walk-down',
        frames: anims.generateFrameNames('hero', { start: 1, end:3, prefix: 'Hero', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    })

    anims.create({
     key: 'hero-walk-right',
     frames: anims.generateFrameNames('hero', { start: 1, end:3, prefix: 'HeroR', suffix: '.png' }),
     repeat: -1,
     frameRate: 10
 })

 anims.create({
     key: 'hero-walk-left',
     frames: anims.generateFrameNames('hero', { start: 1, end:3, prefix: 'HeroL', suffix: '.png' }),
     repeat: -1,
     frameRate: 10
 })

 anims.create({
     key: 'hero-walk-up',
     frames: anims.generateFrameNames('hero', { start: 1, end:3, prefix: 'HeroB', suffix: '.png' }),
     repeat: -1,
     frameRate: 10
 })

}

export{ 
    createHeroAnims
}