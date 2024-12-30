export default class dialogue extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_posX,_posY,_spriteTag)
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);

        this.scene = _scene;
        this.scene.add.existing(this);

        this.setScale(0.8);
        this.setOrigin(0.5);
        this.setScrollFactor(0)
        // this.text = _text;
        // console.log(this.text);

        this.setVisible(false);
    }

    ActivateText()
    {
        this.setVisible(true);
        // this.text_box = this.scene.add.text(5, this.scene.cameras.main.centerY + 18, this.text, {
        //     font: '8px "Pixelify Sans"',
        //     fill: '#0'
        // }).setScrollFactor(0).setOrigin(0);
    }

    DeactivateText()
    {
        this.setVisible(false);
        // this.text_box.destroy();
    }


}