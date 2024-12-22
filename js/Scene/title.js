export default class Tittle extends Phaser.Scene
{
    constructor()
    {
        super({key:'tittle'});
    }

    preload()
    { 
        this.game.scale.setGameSize(160,144);

        this.load.setPath('assets/sprites');
        this.load.image('tittle', 'Tittle.png');
        this.load.image('skytittle', 'sky.png');
        this.load.spritesheet('ho-ho','Ho-Ho.png',
            {frameWidth:64,frameHeight:56});

        this.load.spritesheet('spark','sparks.png',
            {frameWidth:7,frameHeight:16});
    }

    create()
    {
        this.tittle = this.add.image(0,0,'tittle').setOrigin(0);
        this.sky = this.physics.add.image(0,92,'skytittle').setOrigin(0);
        this.secondSky = this.physics.add.image(-159,92,'skytittle').setOrigin(0);
        this.hoho = this.add.sprite(80, 87, 'ho-ho');
        this.LoadAnimation();
        this.hoho.play('fly');

        this.cursors = this.input.keyboard.createCursorKeys(); 

        this.time.addEvent({
            delay: 500, 
            callback: this.createSpark, 
            callbackScope: this,
            loop: true 
        });
    }
 
    LoadAnimation()
    {
        this.anims.create(
            {
                key: 'fly',
                frames: this.anims.generateFrameNumbers('ho-ho', 
                    {start:0, end:4}), 
                frameRate: 5, 
                repeat:-1
            }
            );
            this.anims.create(
                {
                    key: 'sparking',
                    frames: this.anims.generateFrameNumbers('spark', 
                        {start:0, end:1}), 
                    frameRate: 5, 
                    repeat:-1
                }
                );
    }

    update()
    {
        this.sky.body.setVelocityX(15);
        this.secondSky.body.setVelocityX(15);

        if(this.sky.body.x > 159)
            this.sky.body.x = -159;
        if(this.secondSky.body.x > 159)
            this.secondSky.body.x = -159;
 
        if(this.cursors.space.isDown )
        {    
            this.scene.start('playerHouseF1', { from: this.scene.key });
        }
    }

    createSpark() {
        const spark = this.physics.add.sprite(Phaser.Math.Between(100, 110),Phaser.Math.Between(100, 70), 'spark');
        spark.play('sparking');
        
        spark.body.setVelocity(30 ,20, );

        this.time.delayedCall(5000, () => {
            spark.destroy();
        });
    }
}