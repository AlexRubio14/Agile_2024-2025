import dialogue from '/js/prefabs/dialogue.js';

export default class NPC extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag, _dialogues_array, _wantsCombat = false)
    { 
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.npc = this;
        this.scene = _scene;
        this.detectionZone = this.scene.add.zone(this.x, this.y).setSize(25, 25); 
        this.scene.physics.world.enable(this.detectionZone);  
        this.detectionZone.body.setImmovable(true);
        this.inZone;
        this.setColliders();

        this.currentDialogue = 0;
        this.dialogues_array = _dialogues_array;
        this.dialogue = this.dialogues_array[0]

        this.wantsCombat = _wantsCombat;
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
            this.npc,
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

        console.log(this.dialogues_array.lenght);
        if(this.currentDialogue < this.dialogues_array.lenght)
        {
            //crear dialogo
            this.dialogue = new dialogue(this.dialogues_array[this.currentDialogue].scene, this.dialogues_array[this.currentDialogue].text,
                 this.dialogues_array[this.currentDialogue].posX, this.dialogues_array[this.currentDialogue].posY);
            this.currentDialogue++;
        }
        else 
        {
            currentdialogue = 0;
            this.dialogue.setVisible(false);
            if(this.wantsCombat)
                this.scene.handleNPCCombatInteraction();
        }
    }
}