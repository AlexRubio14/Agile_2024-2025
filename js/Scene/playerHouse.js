import {scenePrefs, gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';
import NPC from '/js/prefabs/npc.js';
import dialogue from '/js/prefabs/dialogue.js';

export default class PlayerHouse extends Phaser.Scene
{
    constructor()
    {
        super({key:'playerHouseF0'});
    }

    init(data) {
        this.fromScene = data.from;
    }

    preload()
    { 
        
        this.game.scale.setGameSize(gamePrefs.gameWidth / 2, gamePrefs.gameHeight / 2);
        this.LoadMap();

        this.load.setPath('assets/sprites');
        this.load.image('mother_dialogue','mother_dialogue.png');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});

        this.load.spritesheet('mother_Sprite', 'mother.png',
             {frameWidth:16,frameHeight:16});
    }
  
    create()
    {
        this.CreateMap();
        this.CreatePlayer();
        this.AddCollisions();
        this.CreateNPC();
    }

    LoadMap()
    {
        this.load.setPath('assets/tilesets');
        this.load.image('CityTiles','CityTiles.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('PlayerHouseF0','PlayerHouseF0.json');
    }

    CreateMap()
    {
        this.map = this.add.tilemap('PlayerHouseF0');

        this.map.addTilesetImage('CityTiles');

        this.map.createLayer('Floor','CityTiles');
        this.extraWall = this.map.createLayer('ExtraWall','CityTiles');
        this.wall =this.map.createLayer('Wall','CityTiles');
        this.doorDown =this.map.createLayer('DoorDown','CityTiles');
        this.doorTop =this.map.createLayer('DoorTop','CityTiles');

        this.map.setCollisionByExclusion(-1,true,true,'Wall'); 
        this.map.setCollisionByExclusion(-1,true,true,'ExtraWall'); 
        this.map.setCollisionByExclusion(-1, true,true, 'DoorDown');
        this.map.setCollisionByExclusion(-1, true,true, 'DoorTop');
    }

    CreatePlayer()
    {
        if(this.fromScene == "playerHouseF1")
            this.player = new player(this, 160, 32);
        else
        {
            this.player = new player(this, 120, 112);
            this.player.currentDirection = 1;
        }
     
        const extraSpace = 200;
        this.cameras.main.setBounds(
            -extraSpace, 
            -extraSpace, 
            this.map.widthInPixels + extraSpace * 2, 
            this.map.heightInPixels + extraSpace * 2
        );
    
        this.cameras.main.startFollow(this.player, true);

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
                    var dialogueNPC = new dialogue(this, this.cameras.main.centerX, this.cameras.main.centerY + 30, 'mother_dialogue');
                    var npc = new NPC(this, element.x, element.y, 'mother_Sprite', dialogueNPC);
                    this.interactives.push(npc);
                break;
            }
        },this);
    }

    AddCollisions()
    {
        this.physics.add.collider(this.player, this.doorDown, () => {
            this.handleDoorDownCollision();
        });
    
        this.physics.add.collider(this.player, this.doorTop, () => {
            this.handleDoorTopCollision();
        });
    }

    handleDoorDownCollision() {
        this.scene.start('city', { from: this.scene.key });
    }

    handleDoorTopCollision() {
        this.scene.start('playerHouseF1', { from: this.scene.key });
    }

}