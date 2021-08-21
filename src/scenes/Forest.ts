import Phaser from 'phaser'

import { createBanditAnims } from '../anims/EnemyAnims'
import { createHeroAnims } from '../anims/HeroAnims'

import '../characters/Hero'
import Bandit from '../enimes/bandit'

export default class Forest extends Phaser.Scene
{   
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

    private hero!: Hero

    constructor()
	{
		super('forest')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()

    }

    create()
    {
        const map = this.make.tilemap({ key: 'forest1'})
        const tileset = map.addTilesetImage('Outside ', 'forest')
    

       map.createLayer('Ground', tileset, 0, 0)
       const worldLayer = map.createLayer('World', tileset, 0, 0)
       const aboveLayer = map.createLayer('Above', tileset, 0, 0)

       aboveLayer.setDepth(10)
    
        worldLayer.setCollisionByProperty({ collides: true })
    
        createHeroAnims(this.anims)
       this.hero = this.add.hero(50, 170, 'hero') 
       this.hero.anims.play('hero-idle-right')


       this.cameras.main.startFollow(this.hero, true)
       createBanditAnims(this.anims)
       const bandits = this.physics.add.group({
           classType: Bandit,
           createCallback: (go) =>{
               const bandGo = go as Bandit
               bandGo.body.onCollide = true
           }
       })

       bandits.get(650, 200, 'bad'),

       bandits.get(400, 150, 'bad')
       
    this.physics.add.collider(this.hero, worldLayer)
    this.physics.add.collider(bandits, worldLayer)
    
    this.physics.add.collider(bandits, this.hero, this.handleEnemyCollisions, undefined, this)


    }
    private handleEnemyCollisions(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject){
        const bandit = obj2 as Bandit

        const dx = this.hero.x - bandit.x
        const dy = this.hero.y - bandit.y

        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

        this.hero.handleDamage(dir)

    }

    update(t: number, dt: number)
    {
        if (this.hero)
        {
            this.hero.update(this.cursors)
        }
    }
}
