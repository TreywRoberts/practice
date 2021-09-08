import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        this.load.image('house', 'tiles/atlas_32x.png')
        this.load.tilemapTiledJSON('heroHouse', 'backdrops/Hero-house.json')

        this.load.image('bar', 'tiles/atlas_32x.png')
        this.load.tilemapTiledJSON('bar', 'backdrops/Bar.json')

        this.load.image('forest', 'tiles/outside12.png')
        this.load.tilemapTiledJSON('forest1', 'backdrops/Forest1.json')

        this.load.image('town', 'tiles/building.png')
        this.load.tilemapTiledJSON('town', 'backdrops/town.json')
        

        this.load.image('town', 'tiles/building.png')
        this.load.tilemapTiledJSON('town', 'backdrops/town.json')


        

        this.load.atlas('hero', 'characters/Hero.png', 'characters/Hero.json')
        this.load.atlas('bad', 'characters/Bandit.png', 'characters/Bandit.json')

    }
    create()
    {
        this.scene.start('startingHouse')
    }
}
