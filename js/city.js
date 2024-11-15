class City extends Phaser.Scene
{
    constructor()
    {
        super({key:'city'});
    }

    preload()
    { 
        this.load.setPath('assets/tilesets');
        this.load.image('city_tiles','city_tiles.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('init_city','City.json');

        this.load.setPath('assets/sprites');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});

        this.load.spritesheet('air_attack','air_attack.png',
            {frameWidth:16,frameHeight:8});

        this.load.spritesheet('water_attack','water_attack.png',
            {frameWidth:16,frameHeight:16});

        this.load.spritesheet('tackle_attack','tackle.png',
            {frameWidth:32,frameHeight:32});
        
        this.load.image('roar_attack','roar.png')

        this.load.setPath('assets/audio');
        this.load.audio('newBarkTown','NewBarkTown.wav');
    }

    create()
    {
        this.map = this.add.tilemap('init_city');

        this.map.addTilesetImage('city_tiles');

        this.walls = this.map.createLayer('Floor','city_tiles');
        this.map.createLayer('ExtraWall','city_tiles');
        this.map.createLayer('Wall','city_tiles');
        this.map.createLayer('Door','city_tiles');

        this.player = new player(this, 65, 100)

        this.cameras.main.startFollow(this.player).setBounds(8,8,
            gamePrefs.level1Width,gamePrefs.level1Height);

        this.air = this.add.sprite(81, 100,'air_attack');
        this.water = this.add.sprite(97, 100,'water_attack');
        this.tackle = this.add.sprite(129, 100,'tackle_attack');
        this.roar = this.add.sprite(161,100,'roar_attack');

        this.LoadAnimations();
        this.loadSounds();
        this.newBarkTown.play();
    }

        LoadAnimations()
        {

            this.anims.create(
                {
                    key: 'walkDown',
                    frames: this.anims.generateFrameNumbers('player_Sprite', 
                        {start:0, end:2}), 
                    frameRate: 10,
                    repeat:-1
                }
                );
            this.anims.create(
                {
                    key: 'walkLeft',
                    frames: this.anims.generateFrameNumbers('player_Sprite', 
                        {start:6, end:7}), 
                    frameRate: 10,
                    repeat:-1
                    
                }
                );
            this.anims.create(
                {
                    key: 'walkUp',
                    frames: this.anims.generateFrameNumbers('player_Sprite', 
                        {start:3, end:5}), 
                    frameRate: 10,
                    repeat:-1
                    
                }
                );
            this.anims.create(
                {
                    key: 'walkRight',
                    frames: this.anims.generateFrameNumbers('player_Sprite', 
                        {start:8, end:9}), 
                    frameRate: 10,
                    repeat:-1
                    
                }
                );
            this.anims.create(
                {
                    key: 'airCut',
                    frames: this.anims.generateFrameNumbers('air_attack', 
                        {start:0, end:5}), 
                    frameRate: 10,
                    repeat:-1
                }
                );
            this.anims.create(
                {
                    key: 'waterAttack',
                    frames: this.anims.generateFrameNumbers('water_attack', 
                        {start:0, end:3}), 
                    frameRate: 10,
                    repeat:-1
                }
                );
            this.anims.create(
                {
                    key: 'tackleAttack',
                    frames: this.anims.generateFrameNumbers('tackle_attack', 
                        {start:0, end:3}), 
                    frameRate: 10,
                    repeat:-1
                }
                );
        }

    update()
    { 
        this.air.anims.play('airCut',true);    
        this.water.anims.play('waterAttack',true);
        this.tackle.anims.play('tackleAttack',true);                  
    }

    loadSounds()
    {
        this.newBarkTown = this.sound.add('newBarkTown');
    }
}




