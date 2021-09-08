import Phaser from "phaser";

declare global
{
    namespace Phaser.GameObjects
    {
        interface GameObjectFactory
        {
            hero(x: number, y: number, texture: string, frame?: string | number): Hero
        }
    }
}

enum HealthState{
    IDLE, 
    DAMAGE
}

export default class Hero extends Phaser.Physics.Arcade.Sprite{

    private healthState = HealthState.IDLE
    private damageTime = 0

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number){
        
        super(scene, x, y, texture, frame)

        this.anims.play('hero-walk-down')
        

    }

    handleDamage(dir: Phaser.Math.Vector2)
    {
        if (this.healthState === HealthState.DAMAGE)
        {
            return
        }
        this.setVelocity(dir.x, dir.y)

        this.setTint(0xff0000)

        this.healthState = HealthState.DAMAGE
        this.damageTime = 0
    }

    preUpdate(t: number, dt: number)
    {
        super.preUpdate(t, dt)
        switch(this.healthState){
            case HealthState.IDLE:
                break
            case HealthState.DAMAGE:
                this.damageTime += dt
                if (this.damageTime >= 250)
                {
                    this.healthState = HealthState.IDLE
                    this.setTint(0xffffff)
                    this.damageTime = 0
                }
                break
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys){
        if (this.healthState === HealthState.DAMAGE){
            return
        }
        if(!cursors){
            return
        }
        const speed = 100

        if(cursors.left?.isDown)
        {
            this.setVelocity(-speed, 0)
            this.anims.play('hero-walk-left', true)
        }
        else if (cursors.right?.isDown)
        {
            this.setVelocity(speed, 0)
            this.anims.play('hero-walk-right', true)
        }
        else if (cursors.up?.isDown)
        {
            this.setVelocity(0, -speed)
            this.anims.play('hero-walk-up', true)
        }
        else if (cursors.down?.isDown)
        {
            this.setVelocity(0, speed)
            this.anims.play('hero-walk-down', true)
        }

        else{
            const parts = this.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.setVelocity(0,0)
            this.play(parts.join('-'))
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('hero', function(this: Phaser.GameObjects.GameObjectFactory, x : number, y: number, texture: string, frame?: string | number){
    var sprite = new Hero(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    sprite.body.setSize(sprite.width * 0.7)

    return sprite
})