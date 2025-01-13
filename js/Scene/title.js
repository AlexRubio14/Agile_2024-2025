import AudioManager from '/js/audioManager.js';

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

            
        this.load.setPath('assets/audio');
        this.load.audio('cityMusic', 'NewBarkTown.wav');
        this.load.audio('routeMusic', 'RouteMusic.mp3');
        this.load.audio('combatMusic', 'Combat.wav');
        this.load.audio('introMusic', 'IntroMusic.mp3');

        this.load.setPath('assets/audio/attacks');
        this.load.audio('tackle_sound', 'Tackle.wav');
        this.load.audio('tail_whip_sound', 'TailWhip.wav');
        this.load.audio('water_gun_sound', 'WaterGun.wav');
        this.load.audio('wing_attack_sound', 'WingAttack.wav');

        this.load.setPath('assets/audio/sounds');
        this.load.audio('obtain_pokemon_sound', 'fanfare.wav');
        this.load.audio('recovery_sound', 'fanfare.wav');
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

        this.CreateAudio()
    }
 
    CreateAudio()
    {
        this.audioManager = new AudioManager(this);
        this.audioManager.updateScene(this);

        this.audioManager.addSound('cityMusic', { loop: true, volume: 0.3 });
        this.audioManager.addSound('titleMusic', { loop: true, volume: 0.3 });
        this.audioManager.addSound('combatMusic', { loop: true, volume: 0.3 });

        this.audioManager.addSound('tackle_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('tail_whip_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('water_gun_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('wing_attack_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('wing_attack_sound', { loop: false, volume: 0.3 });
        
        this.audioManager.addSound('wing_attack_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('obtain_pokemon', { loop: false, volume: 0.3 });
        this.audioManager.addSound('recovery', { loop: false, volume: 0.3 });

        this.audioManager.playSound('titleMusic');
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