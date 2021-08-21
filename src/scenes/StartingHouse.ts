import Phaser from 'phaser'

import { createHeroAnims } from '../anims/HeroAnims'

import '../characters/Hero'

export default class StartingHouse extends Phaser.Scene
{

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private hero!: Hero

    
	constructor()
	{
		super('startingHouse')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create()
    {   
        
        const map = this.make.tilemap({ key: 'heroHouse'})
        const tileset = map.addTilesetImage('InteriorSet', 'house')
    
        
        map.createLayer('Ground', tileset, 0, 0)
        const worldLayer = map.createLayer('World', tileset, 0, 0)
        const aboveLayer = map.createLayer('Above', tileset, 0, 0)
        const spawn = map.findObject('exit', obj => obj.name === 'spawn')
    
        
        createHeroAnims(this.anims)
        this.hero = this.add.hero(spawn.x, spawn.y, 'hero') 

       worldLayer.setCollisionByProperty({ collides: true })

       const exit = map.findObject('exit', obj => obj.name === 'Exit')

       console.log(spawn)


    //    const debugGraphics = this.add.graphics().setAlpha(0.75);
    //    worldLayer.renderDebug(debugGraphics, {
    //      tileColor: null, // Color of non-colliding tiles
    //      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //      faceColor: new Phaser.Display.Color(40, 309, 37, 255) // Color of colliding face edges
    //    });
    
 

       this.physics.add.collider(this.hero, worldLayer)



    }
    update(t: number, dt: number)
    {
        if(this.hero){
            this.hero.update(this.cursors)
        }
        
    }

}
