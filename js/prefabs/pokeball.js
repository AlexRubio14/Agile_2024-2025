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
        this.detectionZone = this.scene.add.zone(this.x, this.y).setSize(25, 35); 
        this.scene.physics.world.enable(this.detectionZone);  
        this.detectionZone.body.setImmovable(true);  
        this.inZone;
        this.setColliders();
    }

    preUpdate(time,delta)
    {
        if (!this.detectionZone.getBounds().contains(this.scene.player.x, this.scene.player.y)) {
            this.inZone = false;    
        }
        super.preUpdate(time, delta);
    }

    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.pokeball,
            this.scene.player
        );
        this.scene.physics.add.overlap(
            this.detectionZone,         
            this.scene.player,        
            this.handleOverlap,         
            null,                       
            this
        );
    }

    
    handleOverlap(detectionZone, player) {
        this.inZone = true;  
     }

    interaction(playerDirection)
    {
        console.log("pokeball");
    }
}