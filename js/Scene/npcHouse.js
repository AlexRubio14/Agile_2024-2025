import {gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';

export default class NpcHouse extends Phaser.Scene
{
    constructor()
    {
        super({key:'npchouse'});
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
    }
  
    create()
    {
        this.CreateMap();
        this.CreatePlayer();
        this.AddCollisions()
    }

    LoadMap()
    {
        this.load.setPath('assets/tilesets');
        this.load.image('CityTiles','CityTiles.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('NPCHouse','NPCHouse.json');
    }

    CreateMap()
    {
        this.map = this.add.tilemap('NPCHouse');

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
        this.player = new player(this, 56, 112)
        this.player.currentDirection = 1

        this.cameras.main.startFollow(this.player).setBounds(8,8,
            gamePrefs.npcHouseWidth,gamePrefs.npcHouseHeight);
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