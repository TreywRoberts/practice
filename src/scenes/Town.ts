import Phaser from 'phaser'

import { createHeroAnims } from '../anims/HeroAnims'

export default class Town extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private hero!: Hero

    constructor()
	{
		super('town')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {
        const map = this.make.tilemap({ key: 'town'})
        const tileset = map.addTilesetImage('building', 'town')
        

        map.createLayer('Ground', tileset, 0, 0)
        const worldLayer = map.createLayer('World', tileset, 0, 0)
        const aboveLayer = map.createLayer('Above', tileset, 0, 0)

       aboveLayer.setDepth(10)


        const house = map.createFromObjects('house', {id:2})
        const forest = map.createFromObjects('forest', {id:8})
        const bar = map.createFromObjects('bar', {id:10})

        console.log(house)

        house.forEach(door=>{
            this.physics.world.enable(door)
        })
        forest.forEach(door=>{
            this.physics.world.enable(door)
        })
        bar.forEach(door=>{
            this.physics.world.enable(door)
        })

        worldLayer.setCollisionByProperty({ collides: true })
        
        
        createHeroAnims(this.anims)
        this.hero = this.add.hero(200, 700, 'hero') 
        this.cameras.main.startFollow(this.hero, true)
    
        this.physics.add.collider(this.hero, worldLayer)

        this.physics.add.collider(this.hero, house, ()=>{
            this.scene.start('startingHouse')
        })
        this.physics.add.collider(this.hero, forest, ()=>{
            this.scene.start('forest')
        })
        this.physics.add.collider(this.hero, bar, ()=>{
            this.scene.start('bar')
        })
    }

    update(t: number, dt: number)
    {
        if(this.hero){
            this.hero.update(this.cursors)
        }
        
       
    }
}
