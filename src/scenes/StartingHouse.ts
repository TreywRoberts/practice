import Phaser, { Tilemaps } from 'phaser'

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
        // const spawn = map.findObject('test', obj => obj.name === 'test')
        const aboveLayer = map.createLayer('Above', tileset, 0, 0)
        const exit = map.createFromObjects('exit', {gid:218})

        exit.forEach(door=>{
            this.physics.world.enable(door)
            console.log(door)
        })
      
     


    
        
        createHeroAnims(this.anims)
        this.hero = this.add.hero(80, 70, 'hero') 

       worldLayer.setCollisionByProperty({ collides: true })
    




    //    const debugGraphics = this.add.graphics().setAlpha(0.75);
    //    worldLayer.renderDebug(debugGraphics, {
    //      tileColor: null, // Color of non-colliding tiles
    //      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //      faceColor: new Phaser.Display.Color(40, 309, 37, 255) // Color of colliding face edges
    //    });
    
 

       this.physics.add.collider(this.hero, worldLayer)
       this.physics.add.collider(this.hero, exit, ()=>{
           this.scene.start('town')
       })

       
       
    }
    update(t: number, dt: number)
    {
        if(this.hero){
            this.hero.update(this.cursors)
        }
        
       
    }

}
