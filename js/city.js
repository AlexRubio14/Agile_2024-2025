class City extends Phaser.Scene
{
    constructor()
    {
        super({key:'city'});
    }
    
    init(data) {
        this.fromScene = data.from;
    }

    preload()
    { 
        this.LoadMap();

        this.load.setPath('assets/sprites');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});

        // this.load.spritesheet('air_attack','air_attack.png',
        //     {frameWidth:16,frameHeight:8});

        // this.load.spritesheet('water_attack','water_attack.png',
        //     {frameWidth:16,frameHeight:16});

        // this.load.spritesheet('tackle_attack','tackle.png',
        //     {frameWidth:32,frameHeight:32});
        
        // this.load.image('roar_attack','roar.png')

        // this.load.setPath('assets/audio');
        // this.load.audio('newBarkTown','NewBarkTown.wav');
    }

    create()
    {
        this.CreateMap();
        this.CreatePlayer();
        this.AddCollisions();

        // this.air = this.add.sprite(81, 100,'air_attack');
        // this.water = this.add.sprite(97, 100,'water_attack');
        // this.tackle = this.add.sprite(129, 100,'tackle_attack');
        // this.roar = this.add.sprite(161,100,'roar_attack');

        //this.LoadAnimations();
        //this.loadSounds();
        //this.newBarkTown.play();
    }

        LoadAnimations()
        {

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
        // this.air.anims.play('airCut',true);    
        // this.water.anims.play('waterAttack',true);
        // this.tackle.anims.play('tackleAttack',true);                  
    }

    LoadMap()
    {
        this.load.setPath('assets/tilesets');
        this.load.image('city_tiles','city_tiles.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('init_city','City.json');
    }


    CreateMap()
    {
        this.map = this.add.tilemap('init_city');

        this.map.addTilesetImage('city_tiles');

        this.map.createLayer('Floor','city_tiles');
        this.extraWall = this.map.createLayer('ExtraWall','city_tiles');
        this.wall = this.map.createLayer('Wall','city_tiles');
        this.playerHouseDoor = this.map.createLayer('PlayerHouseDoor','city_tiles');
        this.LabDoor = this.map.createLayer('LabDoor','city_tiles');
        this.ElmHouseDoor = this.map.createLayer('ElmHouseDoor','city_tiles');
        this.NPCHouseDoor = this.map.createLayer('NPCHouseDoor','city_tiles');
        this.Route1Door = this.map.createLayer('Route1Door','city_tiles');

        this.map.setCollisionByExclusion(-1,true,true,'Wall'); 
        this.map.setCollisionByExclusion(-1,true,true,'ExtraWall'); 
        this.map.setCollisionByExclusion(-1, true,true, 'PlayerHouseDoor');
        this.map.setCollisionByExclusion(-1, true,true, 'LabDoor');
        this.map.setCollisionByExclusion(-1,true,true,'ElmHouseDoor'); 
        this.map.setCollisionByExclusion(-1, true,true, 'NPCHouseDoor');
        this.map.setCollisionByExclusion(-1, true,true, 'Route1Door');
    }

    CreatePlayer()
    {
        if(this.fromScene == "playerHouseF0")
            this.player = new player(this, 224, 104);
        else if(this.fromScene == "laboratory")
            this.player = new player(this, 112, 72);
        else if(this.fromScene == "elmhouse")
            this.player = new player(this, 64, 208);
        else if(this.fromScene == "npchouse")
            this.player = new player(this, 192, 240);
        else if(this.fromScene == "route")
        {
            this.player = new player(this, 24, 152);
            this.player.currentDirection = 3;
        }



        this.cameras.main.startFollow(this.player).setBounds(8,8,
            gamePrefs.level1Width,gamePrefs.level1Height);
    }

    AddCollisions()
    {
        this.physics.add.collider(this.player, this.playerHouseDoor, () => {
            this.handlePlayerHouseDoorCollision();
        });

        this.physics.add.collider(this.player, this.LabDoor, () => {
            this.handleLabDoorCollision();
        });

        this.physics.add.collider(this.player, this.ElmHouseDoor, () => {
            this.handleElmHouseDoorCollision();
        });

        this.physics.add.collider(this.player, this.Route1Door, () => {
            this.handleRouteDoorCollision();
        });
        this.physics.add.collider(this.player, this.NPCHouseDoor, () => {
            this.handleNPCDoorCollision();
        });
    }

    handlePlayerHouseDoorCollision() {
        this.scene.start('playerHouseF0', { from: this.scene.key });
    }

    handleLabDoorCollision()
    {
        this.scene.start('laboratory', { from: this.scene.key });
    }

    handleElmHouseDoorCollision()
    {
        this.scene.start('elmhouse', { from: this.scene.key });
    }

    handleRouteDoorCollision()
    {
        this.scene.start('route', { from: this.scene.key });
    }

    handleNPCDoorCollision()
    {
        this.scene.start('npchouse', { from: this.scene.key });
    }

    loadSounds()
    {
        //this.newBarkTown = this.sound.add('newBarkTown');
    }


}




