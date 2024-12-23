export default class dialogue extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_text,_posX,_posY,_spriteTag='dialogue_box')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        
        this.scene = _scene;
        this.scene.add.existing(this);
        this.setScale(1);
        this.setOrigin(0);

        this.text = _text;
        this.scene.add.text(_posX, _posY, this.text, {
            font: '50px "Pixelify Sans"',
            fill: '#0'
        });
    }

}