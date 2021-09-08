import Phaser from 'phaser'

import { createHeroAnims } from '../anims/HeroAnims'

export default class Bar extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private hero!: Hero

    constructor()
	{
		super('bar')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
        const map = this.make.tilemap({ key: 'bar'})
        const tileset = map.addTilesetImage('atlas_32x', 'bar')
        map.createLayer('Ground', tileset, 0, 0)
        const worldLayer = map.createLayer('World', tileset, 0, 0)
        map.createLayer('Above', tileset, 0, 0)

        const exit = map.createFromObjects('exit', {id:1})

        exit.forEach(door=>{
            this.physics.world.enable(door)
            console.log(door)
        })

        worldLayer.setCollisionByProperty({ collides: true })
        // const house = map.createFromObjects('house', {id:2})
        // const forest = map.createFromObjects('forest', {id:8})

        // console.log(house)

        // house.forEach(door=>{
        //     this.physics.world.enable(door)
        // })
        // forest.forEach(door=>{
        //     this.physics.world.enable(door)
        // })

        
        
        createHeroAnims(this.anims)
        this.hero = this.add.hero(365, 400, 'hero') 
        this.hero.anims.play('hero-idle-up')
        this.cameras.main.startFollow(this.hero, true)

        this.physics.add.collider(this.hero, worldLayer)
        this.physics.add.collider(this.hero, exit, ()=>{
            this.scene.start('town')
        })
    

        // this.physics.add.collider(this.hero, house, ()=>{
        //     this.scene.start('startingHouse')
        // })
        // this.physics.add.collider(this.hero, forest, ()=>{
        //     this.scene.start('forest')
        // })
    }

    update(t: number, dt: number)
    {
        if(this.hero){
            this.hero.update(this.cursors)
        }
        
       
    }
}
