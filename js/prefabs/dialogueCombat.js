export default class dialogueCombat extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_text, _spriteTag='dialogue_box')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);

        this.scene = _scene;
        this.scene.add.existing(this);

        this.setScale(5);
        this.setOrigin(0);
        this.setScrollFactor(0)
        this.text = _text;
        console.log(this.text);

        this.setDepth(1);
        this.setVisible(false);
        this.text_box = null;
    }

    ActivateText(pokemonName, movementName)
    {
        this.setVisible(true);
        this.text = pokemonName + " used " + movementName;
        if(this.scene) {
            this.text_box = this.scene.add.text(30, this.scene.cameras.main.centerY + 10, this.text, {
                font: '48px "Pixelify Sans"',
                fill: '#0'
            }).setScrollFactor(0).setOrigin(0).setDepth(2);
        }
        
    }

    DeactivateText()
    {
        if(this.scene){
            this.setVisible(false);
            this.text_box.destroy();
        }
    }


}