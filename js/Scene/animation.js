export default class Animaiton extends Phaser.Scene
{
    constructor()
    {
        super({key:'Animaiton'});
    }

    preload()
    { 
        this.game.scale.setGameSize(158,150);

        this.load.setPath('assets/sprites');
        this.load.image('sea', 'sea.png')
        this.load.image('sky', 'seaSky.png')
        this.load.spritesheet('wave','wave.png',
            {frameWidth:32,frameHeight:8});
        this.load.spritesheet('shelmet','shelmet.png',
            {frameWidth:15,frameHeight:15});
        this.load.spritesheet('bubble','bubble.png',
            {frameWidth:7,frameHeight:8});
        this.load.spritesheet('magikarp','magikarp.png',
            {frameWidth:22,frameHeight:16});
        this.load.spritesheet('lapras','lapras.png',
            {frameWidth:48,frameHeight:48});

    }

    create()
    {

        this.secondSky = this.physics.add.image(354, 0,'sky').setOrigin(0);
        this.sky = this.physics.add.image(-98, 0,'sky').setOrigin(0);

        this.lapras = this.add.sprite(172, 68, 'lapras').setOrigin(0);

        this.sea = this.add.image(-98,0,'sea').setOrigin(0);

        this.wave1 =  this.add.sprite(0,96,'wave').setOrigin(0);
        this.wave2 =  this.add.sprite(32,96,'wave').setOrigin(0);
        this.wave3 =  this.add.sprite(64,96,'wave').setOrigin(0);
        this.wave4 =  this.add.sprite(96,96,'wave').setOrigin(0);
        this.wave5 =  this.add.sprite(108,96,'wave').setOrigin(0);
        this.wave6 =  this.add.sprite(142,96,'wave').setOrigin(0);

        this.shelmet = this.add.sprite(48,360,'shelmet');
        this.shelmet2 = this.add.sprite(112,350,'shelmet');
        this.shelmet3 = this.add.sprite(65,335,'shelmet');

        this.magikarp = this.physics.add.sprite(-500,190,'magikarp');
        this.magikarp2 = this.physics.add.sprite(-550,140,'magikarp');
        this.magikarp3 = this.physics.add.sprite(-600,165,'magikarp');
        this.magikarp4 = this.physics.add.sprite(-700,155,'magikarp');



        this.cameras.main.setBounds(0, 0, 256, 392); 
        this.cameras.main.setSize(158, 150);        
        this.cameras.main.scrollY = 242; 
        this.LoadAnimation();

        this.time.delayedCall(5000, () => {
            this.MoveSea();
        });

        this.wave1.play('waveAnimation');
        this.wave2.play('waveAnimation');
        this.wave3.play('waveAnimation');
        this.wave4.play('waveAnimation');
        this.wave5.play('waveAnimation');
        this.wave6.play('waveAnimation');

        this.shelmet.play('shelmetAnimation');
        this.shelmet2.play('shelmetAnimation');
        this.shelmet3.play('shelmetAnimation');

        this.magikarp.play('magikarpAnimation');
        this.magikarp2.play('magikarpAnimation');
        this.magikarp3.play('magikarpAnimation');
        this.magikarp4.play('magikarpAnimation');

        this.lapras.play('laprasAnimation');
    

        this.time.addEvent({
            delay: 1000, 
            callback: this.createBuble, 
            callbackScope: this,
            loop: true 
        });
    }

    MoveSea()
    {
        this.tweens.add({
            targets:  this.cameras.main,         
            scrollY: 0,                  
            duration: 10000,           
            ease: 'Linear',           
            onComplete: () => {       
                this.MoveLapras()
            }
        });
    }

    MoveLapras()
    {
        this.tweens.add({
            targets:  this.lapras,         
            x: 66,                  
            duration: 3000,           
            ease: 'Linear',           
            onComplete: () => {     
                this.WaitLapras(); 
            }
        });
    }

    WaitLapras()
    {
        this.time.delayedCall(3000, () => {
            this.MoveLaprasEnd();
        });
    }

    MoveLaprasEnd()
    {
        this.tweens.add({
            targets:  this.lapras,         
            x: -48,                  
            duration: 3000,           
            ease: 'Linear',           
            onComplete: () => {     
                
            }
        });
    }

 
    LoadAnimation()
    {
        this.anims.create(
            {
                key: 'waveAnimation',
                frames: this.anims.generateFrameNumbers('wave', 
                    {start:0, end:3}), 
                frameRate: 5, 
                repeat:-1
            }
            );
            this.anims.create(
                {
                    key: 'shelmetAnimation',
                    frames: this.anims.generateFrameNumbers('shelmet', 
                        {start:0, end:1}), 
                    frameRate: 2, 
                    repeat:-1
                }
                );
            this.anims.create(
                {
                    key: 'bubbleAnimation',
                    frames: this.anims.generateFrameNumbers('bubble', 
                        {start:0, end:1}), 
                    frameRate: 2, 
                    repeat:-1
                }
                );
            this.anims.create(
                {
                    key: 'magikarpAnimation',
                    frames: this.anims.generateFrameNumbers('magikarp', 
                       {start:0, end:1}), 
                    frameRate: 10, 
                    repeat:-1
                }
                );
            this.anims.create(
                {
                    key: 'laprasAnimation',
                    frames: this.anims.generateFrameNumbers('lapras', 
                        {start:0, end:2}), 
                    frameRate: 5, 
                    repeat:-1
                }
                );
    }

    update()
    {
        this.sky.body.setVelocityX(15);
        this.secondSky.body.setVelocityX(15);

        this.magikarp.body.setVelocityX(50);
        this.magikarp2.body.setVelocityX(50);
        this.magikarp3.body.setVelocityX(50);
        this.magikarp4.body.setVelocityX(50);

        if(this.sky.body.x > 150)
            this.sky.body.x = -340;
        if(this.secondSky.body.x > 150)
            this.secondSky.body.x = -340;
    }

    createBuble() {
        const bubble = this.physics.add.sprite(Phaser.Math.Between(14, 150),Phaser.Math.Between(320, 350), 'bubble');
        bubble.play('bubbleAnimation');
        
        bubble.body.setVelocity(0 ,-10);

        this.time.delayedCall(10000, () => {
            bubble.destroy();
        });
    }

}