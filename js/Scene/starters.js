export default class Starters extends Phaser.Scene
{
    constructor()
    {
        super({key:'starters'});
    }

    preload()
    { 
        this.game.scale.setGameSize(158,150);

        this.load.setPath('assets/sprites');
        this.load.image('cinda', 'cinda.png');
        this.load.image('chicorita', 'chicorita.png');
        this.load.image('totodile', 'totodile.png');
        this.load.spritesheet('charizard','charizard.png',
            {frameWidth:72,frameHeight:64});
        this.load.spritesheet('fire','fire.png',
            {frameWidth:48,frameHeight:48});

    }

    create()
    {
        this.rectangle = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xffffff).setOrigin(0).setAlpha(1);

        this.cinda = this.add.image(-10,50,'cinda').setOrigin(0).setVisible(false);
        this.totodile = this.add.image(50,50,'totodile').setOrigin(0).setVisible(false);
        this.chicorita = this.add.image(110,50,'chicorita').setOrigin(0);
        this.charizard = this.add.sprite(80,150,'charizard').setOrigin(0);

        this.time.delayedCall(1000, () => {
            this.ActiveCharizard1();
            this.CharizardMovement();
        });

        this.LoadAnimation();
    }

    CharizardMovement()
    {
        this.tweens.add({
            targets:  this.charizard,         
            y: 40,                  
            duration: 5000,           
            ease: 'Linear',           
            onComplete: () => {     
                this.rectangle.setVisible(true);
                this.CharizarAnimation();
            }
        });
    }

    CharizarAnimation()
    {
        this.charizard.play('charizardAttack');

        this.charizard.on('animationcomplete', (animation, frame) => {
            if (animation.key === 'charizardAttack') { 
                this.time.addEvent({
                    delay: 500, 
                    callback: this.createFire, 
                    callbackScope: this,
                    loop: true 
                });

                this.tweens.add({
                    targets:  this.charizard,         
                    x: 180,                  
                    duration: 6000,           
                    ease: 'Linear',           
                    onComplete: () => {   
                        this.scene.start('tittle', { from: this.scene.key });
                    }
                });
            }
        });
    }
    

    ActiveCharizard1()
    {
        this.rectangle.setVisible(false);
        this.chicorita.setVisible(false);
        this.charizard.setVisible(true);
        this.time.delayedCall(1000, () => {
            this.ActiveCinda();
        });
    }

    ActiveCinda()
    {
        this.rectangle.setVisible(true);
        this.cinda.setVisible(true);
        this.charizard.setVisible(false);
        this.time.delayedCall(1000, () => {
            this.ActiveCharizard2();
        });
    }

    ActiveCharizard2()
    {
        this.rectangle.setVisible(false);
        this.cinda.setVisible(false);
        this.charizard.setVisible(true);
        this.time.delayedCall(1000, () => {
            this.ActiveTotodile();
        });
    }

    ActiveTotodile()
    {
        this.totodile.setVisible(true);
        this.rectangle.setVisible(true);
        this.charizard.setVisible(false);
        this.time.delayedCall(1000, () => {
            this.ActiveCharizard3();
        });
    }

    ActiveCharizard3()
    {
        this.rectangle.setVisible(false);
        this.totodile.setVisible(false);
        this.charizard.setVisible(true);
    }
 
    LoadAnimation()
    {
                this.anims.create(
                    {
                        key: 'charizardAttack',
                        frames: this.anims.generateFrameNumbers('charizard', 
                            {start:1, end:3}), 
                        frameRate: 10, 
                        repeat:0
                    }
                    );
                this.anims.create(
                {
                        key: 'fireAnimation',
                        frames: this.anims.generateFrameNumbers('fire', 
                            {start:0, end:2}), 
                        frameRate: 20, 
                        repeat:0
                });
    }

    createFire() {
        const fire = this.add.sprite(Phaser.Math.Between(30, 60),Phaser.Math.Between(50, 80), 'fire');
        fire.play('fireAnimation')

        fire.on('animationcomplete', (animation, frame) => {
            if (animation.key === 'fireAnimation') 
            { 
                fire.destroy();
            }
        });
    }

}