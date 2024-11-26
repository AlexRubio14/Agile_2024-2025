export default class button extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_id,_text,_posX,_posY,_spriteTag='arrow_sprite')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        
        this.scene = _scene;
        this.scene.add.existing(this);
        this.setScale(5);
        this.setOrigin(0);
        this.up = null;
        this.down = null;
        this.right = null;
        this.left = null;

        this.id = _id;

        this.text = _text;
        this.scene.add.text(_posX + 40, _posY, this.text, {
            font: '50px "Pixelify Sans"',
            fill: '#0'
        }).setOrigin(0,0.2);

        this.setVisible(false);
    }

    setButtonConnectors(_up, _down, _right, _left)
    {
        this.up = _up;
        this.down = _down;
        this.right = _right;
        this.left = _left;
    }

    selectButton()
    {
        this.setVisible(true);
    }

    deselectButton()
    {
        this.setVisible(false);
    }

}