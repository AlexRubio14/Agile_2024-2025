import {scenePrefs, gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';
import NPC from '/js/prefabs/npc.js';
import dialogue from '/js/prefabs/dialogue.js';
import AudioManager from '/js/audioManager.js';

export default class ElmHouse extends Phaser.Scene
{
    constructor()
    {
        super({key:'elmhouse'});
    }

    init(data) {
        this.fromScene = data.from;
    }

    preload()
    { 
        this.game.scale.setGameSize(gamePrefs.gameWidth * 5, gamePrefs.gameHeight * 5);
        this.LoadMap();

        this.load.setPath('assets/sprites');
        this.load.image('elm_house_dialogue','elm_house_dialogue.png');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});
        this.load.spritesheet('npc_elm_Sprite','npc_elm_house.png',
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
        this.load.tilemapTiledJSON('ElmHouse','ElmHouse.json');
    }

    CreateMap()
    {
        this.map = this.add.tilemap('ElmHouse');

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
        this.player = new player(this, 560, 1120).setScale(10);
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
                    var dialogueNPC = new dialogue(this, this.cameras.main.centerX, this.cameras.main.centerY + 300, 'elm_house_dialogue').setScale(8);
                    var npc = new NPC(this, element.x * 10, element.y * 10, 'npc_elm_Sprite', dialogueNPC).setScale(10);
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
        this.audioManager.playSound('door_sound');
    }


}