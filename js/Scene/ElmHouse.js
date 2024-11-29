import {scenePrefs, gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';

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
        this.game.scale.setGameSize(gamePrefs.gameWidth / 2, gamePrefs.gameHeight / 2);
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
        this.load.tilemapTiledJSON('ElmHouse','ElmHouse.json');
    }

    CreateMap()
    {
        this.map = this.add.tilemap('ElmHouse');

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
            scenePrefs.elmHouseWidth,scenePrefs.elmHouseHeight);
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