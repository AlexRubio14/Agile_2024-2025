import {scenePrefs, gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';
import NPC from '/js/prefabs/npc.js';

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
        this.game.scale.setGameSize(gamePrefs.gameWidth / 2, gamePrefs.gameHeight / 2);
        this.LoadMap();

        this.load.setPath('assets/sprites');
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

        this.map.createLayer('Floor','CityTiles');
        this.extraWall = this.map.createLayer('ExtraWall','CityTiles');
        this.wall =this.map.createLayer('Wall','CityTiles');
        this.door = this.map.createLayer('Door','CityTiles');

        this.map.setCollisionByExclusion(-1,true,true,'Wall'); 
        this.map.setCollisionByExclusion(-1,true,true,'ExtraWall'); 
        this.map.setCollisionByExclusion(-1, true,true, 'Door');
    }

    CreatePlayer()
    {
        this.player = new player(this, 944, 152)
        this.player.currentDirection = 2
        
        this.cameras.main.startFollow(this.player).setBounds(0, 0,
            this.map.widthInPixels,this.map.heightInPixels);
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
                    var npc = new NPC(this, element.x, element.y, 'silver_Sprite', true);
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
    }

    handleNPCCombatInteraction()
    {
        this.scene.start('Combat', { from: this.scene.key });
    }

}