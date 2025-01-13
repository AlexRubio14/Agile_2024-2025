export default class Forest extends Phaser.Scene
{
    constructor()
    {
        super({key:'forest'});
    }

    preload()
    { 
        this.game.scale.setGameSize(158,150);

        this.load.setPath('assets/sprites');
        this.load.image('forest', 'forest.png');
        this.load.image('note', 'note.png');
        this.load.spritesheet('jigly','pink.png',
        {frameWidth:32,frameHeight:32});
        this.load.spritesheet('pikachu','pikachu.png',
        {frameWidth:56,frameHeight:32});
    }

    create()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.sea = this.add.image(0,0,'forest').setOrigin(0);
        this.pikachu;

        this.canGenerate = true;

        this.cameras.main.setBounds(0, 0, 256, 256); 
        this.cameras.main.setSize(158, 150);        
        this.cameras.main.scrollX = 256; 

        this.jigly = this.physics.add.sprite(10,83,'jigly').setOrigin(0);

        const fade = this.add.rectangle(0, 0, 256, this.scale.height, 0xffffff).setOrigin(0).setAlpha(1); 
        
        this.tweens.add({
            targets: fade,
            alpha: 0, 
            duration: 1000,
            onComplete: () => {
              this.MoveForestX();
            }
        });

        this.LoadAnimation();

        this.jigly.play('sing');
        
        this.time.addEvent({
            delay: 2000, 
            callback: this.createNote, 
            callbackScope: this,
            loop: true 
        });
    }

    update()
    {
        if(this.cursors.space.isDown)
        {
            this.scene.start('tittle', { from: this.scene.key });
        }
    }

    setColliders()
    {
        this.physics.add.collider(this.jigly, this.pikachu, () => {
            this.OnPikachuPushesJiggly();
        });
    }

    OnPikachuPushesJiggly()
    {
        this.jigly.stop('sing');
        this.jigly.setFrame(3);
        this.jigly.body.setVelocityX(15);
    }

    MoveForestX()
    {
        this.tweens.add({
            targets:  this.cameras.main,         
            scrollX: 0,                  
            duration: 3000,           
            ease: 'Linear',           
            onComplete: () => {     
                this.pikachu = this.physics.add.sprite(190,98,'pikachu')
                this.pikachu.play('run')
                this.WaitCreatePikachu();
            }
        });
    }

    WaitCreatePikachu()
    {
        this.time.delayedCall(1000, () => {
            this.MovePikachu();
        });
    }

    MovePikachu()
    {
        this.tweens.add({
            targets:  this.pikachu,         
            x: 110,                  
            duration: 2000,           
            ease: 'Linear',           
            onComplete: () => {     
                this.pikachu.stop('run');
                this.pikachu.setFrame(3);
                this.WaitAttackPikachu();
            }
        });
    }

    WaitAttackPikachu()
    {
        this.time.delayedCall(1000, () => {
            this.pikachu.play('attack')
            this.canGenerate = false;
            this.setColliders();
            this.tweens.add({
                targets:  this.pikachu,         
                x: -60,                  
                duration: 2000,           
                ease: 'Linear',           
                onComplete: () => {   
                    this.pikachu.destroy();
                    this.jigly.destroy();  
                    this.MoveCameraY();
                }
            });
        });
    }

    MoveCameraY()
    {
        const fade = this.add.rectangle(0, 0, 256, 256, 0xffffff).setOrigin(0).setAlpha(0);


        this.tweens.add({
            targets: this.cameras.main,         
            scrollY: 200,                  
            duration: 2000,           
            ease: 'Linear'
        });
    

        this.tweens.add({
            targets: fade,
            alpha: 1, 
            duration: 2000, 
            ease: 'Linear',           
            onComplete: () => {
                this.scene.start('starters', { from: this.scene.key });
            }
        });
    }

 
    LoadAnimation()
    {
        this.anims.create(
            {
                key: 'sing',
                frames: this.anims.generateFrameNumbers('jigly', 
                    {start:0, end:6}), 
                frameRate: 5, 
                repeat:-1
            }
            );
            this.anims.create(
                {
                    key: 'run',
                    frames: this.anims.generateFrameNumbers('pikachu', 
                        {start:0, end:5}), 
                    frameRate: 10, 
                    repeat:-1
                }
                );
                this.anims.create(
                    {
                        key: 'attack',
                        frames: this.anims.generateFrameNumbers('pikachu', 
                            {start:6, end:7}), 
                        frameRate: 10, 
                        repeat:0
                    }
                    );
    }

    createNote() {
        if(this.canGenerate)
        {
            const note = this.physics.add.sprite(35,75, 'note');
        
            note.body.setVelocity(20 ,-15);
    
            this.time.delayedCall(10000, () => {
                note.destroy();
            });
        }

    }
}