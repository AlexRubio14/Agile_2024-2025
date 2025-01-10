import {scenePrefs, gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';
import NPC from '/js/prefabs/npc.js';
import Pokeball from '/js/prefabs/pokeball.js';
import dialogue from '/js/prefabs/dialogue.js';

export default class Laboratory extends Phaser.Scene
{
    constructor()
    {
        super({key:'laboratory'});
    }

    init(data) {
        this.fromScene = data.from;
    }

    preload()
    { 
        this.game.scale.setGameSize(gamePrefs.gameWidth * 5, gamePrefs.gameHeight * 5);
        this.LoadMap();

        this.load.setPath('assets/sprites');
        this.load.image('lab_dialogue','lab_dialogue.png');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});
        this.load.spritesheet('elm_Sprite','elm.png',
            {frameWidth:16,frameHeight:16});
        this.load.spritesheet('pokeball_Sprite','pokeball.png',
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
        this.load.tilemapTiledJSON('Lab','Lab.json');
    }

    CreateMap()
    {
        this.map = this.add.tilemap('Lab');

        this.map.addTilesetImage('CityTiles');

        this.map.createLayer('Floor','CityTiles').setScale(10);
        this.extraWall = this.map.createLayer('ExtraWall','CityTiles').setScale(10);
        this.wall =this.map.createLayer('Wall','CityTiles').setScale(10);
        this.door = this.map.createLayer('Door','CityTiles').setScale(10);

        this.map.setCollisionByExclusion(-1,true,true,'Wall'); 
        this.map.setCollisionByExclusion(-1,true,true,'ExtraWall'); 
        this.map.setCollisionByExclusion(-1, true,true, 'Door');
    }

    CreatePlayer()
    {
        if(this.fromScene == "Combat")
            this.player = new player(this, 240, 680).setScale(10);
        else
            this.player = new player(this, 880, 1760).setScale(10);
        this.player.currentDirection = 1;

        const extraSpace = 2000;
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
                    var dialogueNPC = new dialogue(this, this.cameras.main.centerX, this.cameras.main.centerY + 300, 'lab_dialogue').setScale(8);
                    var npc = new NPC(this, element.x * 10, element.y * 10, 'elm_Sprite', dialogueNPC).setScale(10);
                    this.interactives.push(npc);
                break;
                case 'pokeball':
                    var pokeball = new Pokeball(this, element.x * 10, element.y * 10, 'pokeball_Sprite').setScale(10);
                    this.interactives.push(pokeball);
                break;
            }
        },this);
    }

    AddCollisions()
    {
        this.physics.add.collider(this.player, this.door, () => {
            this.handleDoorCollision();
        });
    }

    handleDoorCollision() {
        this.scene.start('city', { from: this.scene.key });
    }


}