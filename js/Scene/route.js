import {scenePrefs, gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';
import NPC from '/js/prefabs/npc.js';
import dialogue from '/js/prefabs/dialogue.js';
import AudioManager from '/js/audioManager.js';

export default class Route extends Phaser.Scene
{
    constructor()
    {
        super({key:'route'});
    }

    init(data) {
        this.fromScene = data.from;
    }

    preload()
    { 
        this.game.scale.setGameSize(gamePrefs.gameWidth * 5, gamePrefs.gameHeight * 5);
        this.LoadMap();

        this.load.setPath('assets/sprites');
        this.load.image('silver_dialogue','silver_dialogue.png');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});
        this.load.spritesheet('silver_Sprite','silver.png',
            {frameWidth:16,frameHeight:16});
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

    LoadMap()
    {
        this.load.setPath('assets/tilesets');
        this.load.image('CityTiles','CityTiles.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('route1','route1.json');
    }

    CreateMap()
    {
        this.map = this.add.tilemap('route1');

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
        this.player = new player(this, 9440, 1520).setScale(10);
        this.player.currentDirection = 2;
        
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
                    var dialogueNPC = new dialogue(this, this.cameras.main.centerX, this.cameras.main.centerY + 300, 'silver_dialogue').setScale(8);
                    var npc = new NPC(this, element.x * 10, element.y * 10, 'silver_Sprite', dialogueNPC, true).setScale(10);
                    this.interactives.push(npc);
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
        this.audioManager.stopAll();
        this.audioManager.playSound('cityMusic');
    }

    handleNPCCombatInteraction()
    {
        this.scene.start('Combat', { from: this.scene.key });
        this.audioManager.stopAll();
        this.audioManager.playSound('combatMusic');
    }

}