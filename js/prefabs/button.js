export default class button extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_id,_text,_posX,_posY,_spriteTag='arrow_sprite')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        
        this.scene = _scene;
        this.scene.add.existing(this);

        this.up = null;
        this.down = null;
        this.right = null;
        this.left = null;

        this.id = _id;

        this.text = _text;
        // this.add.text(_posX + 10, _posY, text, {
        //     font: '16px "PokemonFont"',
        //     fill: '#ffffff'
        // });

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