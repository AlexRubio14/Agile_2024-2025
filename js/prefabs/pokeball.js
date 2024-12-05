export default class Pokeball extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { 
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.pokeball = this;
        this.scene = _scene;
        this.setColliders();
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time, delta);
    }

    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.pokeball,
            this.scene.player
        );
    }

    interaction(playerDirection)
    {
        console.log("pokeball");
    }
}