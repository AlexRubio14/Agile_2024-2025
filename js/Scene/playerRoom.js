import {gamePrefs} from '../globals.js';
import player from '/js/prefabs/player.js';

export default class PlayerRoom extends Phaser.Scene
{
    constructor()
    {
        super({key:'playerHouseF1'});
    }

    init(data) {
        this.fromScene = data.from;
    }

    preload()
    { 
        this.LoadMap()
        this.load.setPath('assets/sprites');
        this.load.spritesheet('player_Sprite','player.png',
            {frameWidth:16,frameHeight:16});
    }

    
    create()
    {
        this.CreateMap()
        this.CreatePlayer()
        this.AddCollisions()
    }

    LoadMap()
    {
        this.load.setPath('assets/tilesets');
        this.load.image('CityTiles','CityTiles.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('player_house_f1','PlayerHouseF1.json');
    }

    CreateMap()
    {
        this.map = this.add.tilemap('player_house_f1');

        this.map.addTilesetImage('CityTiles');

        this.map.createLayer('Floor','CityTiles');
        this.extraWall = this.map.createLayer('ExtraWall','CityTiles');
        this.wall =this.map.createLayer('Wall','CityTiles');
        this.door = this.map.createLayer('Door','CityTiles');

        this.map.setCollisionByExclusion(-1,true,true,'Wall'); 
        this.map.setCollisionByExclusion(-1,true,true,'ExtraWall'); 
        this.map.setCollisionByExclusion(-1,true,true,'Door'); 
    }

    CreatePlayer()
    {
        if(this.fromScene != "playerHouseF0")
            this.player = new player(this, 45, 60)
        else
            this.player = new player(this, 128, 32)

        this.cameras.main.startFollow(this.player).setBounds(8,8,
            gamePrefs.playerHouseF1Width,gamePrefs.playerHouseF1Height);
    }

    AddCollisions()
    {
        this.physics.add.collider(this.player, this.door, () => {
            this.handleDoorCollision();
        });
    }

    handleDoorCollision() {
        this.scene.start('playerHouseF0', { from: this.scene.key });
    }

}