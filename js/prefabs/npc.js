export default class NPC extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag = 'npc_Sprite')
    { 
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.npc = this;
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
            this.npc,
            this.scene.player
        );
    }

    interaction(playerDirection)
    {
        console.log("npc");
        switch(playerDirection)
        {
            case 0:
                this.npc.setFrame(1);
                break;
            case 1:
                this.npc.setFrame(0);
                break;
            case 2:
                this.npc.setFrame(3);
                break;
            case 3:
                this.npc.setFrame(2);
                break;
        }
    }
}