import {scenePrefs, gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';
import NPC from '/js/prefabs/npc.js';
import dialogue from '/js/prefabs/dialogue.js';
import AudioManager from '/js/audioManager.js';

export default class City extends Phaser.Scene
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
        this.game.scale.setGameSize(gamePrefs.gameWidth * 5, gamePrefs.gameHeight * 5);
        this.LoadMap();

        this.load.setPath('assets/sprites');
        this.load.image('npc_city_dialogue','npc_city_dialogue.png');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});
        this.load.spritesheet('city_man', 'city_man.png',
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
        this.CreateNPC();
        this.CreateAudio();
    }

    CreateAudio()
    {
        this.audioManager = new AudioManager(this);
        this.audioManager.updateScene(this);
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
            });
        this.anims.create(
            {
                key: 'waterAttack',
                frames: this.anims.generateFrameNumbers('water_attack', 
                    {start:0, end:3}), 
                frameRate: 10,
                repeat:-1
            });
        this.anims.create(
            {
                key: 'tackleAttack',
                frames: this.anims.generateFrameNumbers('tackle_attack', 
                    {start:0, end:3}), 
                frameRate: 10,
                repeat:-1
            });
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

        this.map.createLayer('Floor','city_tiles').setScale(10);
        this.extraWall = this.map.createLayer('ExtraWall','city_tiles').setScale(10);
        this.wall = this.map.createLayer('Wall','city_tiles').setScale(10);
        this.playerHouseDoor = this.map.createLayer('PlayerHouseDoor','city_tiles').setScale(10);
        this.LabDoor = this.map.createLayer('LabDoor','city_tiles').setScale(10);
        this.ElmHouseDoor = this.map.createLayer('ElmHouseDoor','city_tiles').setScale(10);
        this.NPCHouseDoor = this.map.createLayer('NPCHouseDoor','city_tiles').setScale(10);
        this.Route1Door = this.map.createLayer('Route1Door','city_tiles').setScale(10);

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
            this.player = new player(this, 2240, 1040).setScale(10);
        else if(this.fromScene == "laboratory")
            this.player = new player(this, 1120, 720).setScale(10);
        else if(this.fromScene == "elmhouse")
            this.player = new player(this, 640, 2080).setScale(10);
        else if(this.fromScene == "npchouse")
            this.player = new player(this, 1920, 2400).setScale(10);
        else if(this.fromScene == "route")
        {
            this.player = new player(this, 240, 1520).setScale(10);
            this.player.currentDirection = 3;
        }
     
        this.cameras.main.startFollow(this.player).setBounds(0, 0,
            this.map.widthInPixels * 10,this.map.heightInPixels * 10);
    }

    CreateNPC()
    {
        this.interactives = [];
        this.game_objects = this.map.getObjectLayer('Objects');
        this.game_objects.objects.forEach(function(element)
        {
            switch(element.type)
            {
                case 'npc':
                    var dialogueNPC = new dialogue(this, this.cameras.main.centerX, this.cameras.main.centerY + 300, 'npc_city_dialogue').setScale(8);
                    var npc = new NPC(this, element.x * 10, element.y * 10, 'city_man', dialogueNPC).setScale(10);
                    this.interactives.push(npc);
                break;
            }
        },this);
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
        this.audioManager.playSound('door_sound');
    }

    handleLabDoorCollision()
    {
        this.scene.start('laboratory', { from: this.scene.key });
        this.audioManager.playSound('door_sound');
    }

    handleElmHouseDoorCollision()
    {
        this.scene.start('elmhouse', { from: this.scene.key });
        this.audioManager.playSound('door_sound');
    }

    handleRouteDoorCollision()
    {
        this.scene.start('route', { from: this.scene.key });
        this.audioManager.stopAll();
        this.audioManager.playSound('routeMusic');
    }

    handleNPCDoorCollision()
    {
        this.scene.start('npchouse', { from: this.scene.key });
        this.audioManager.playSound('door_sound');
    }
}




