import {gamePrefs, scenePrefs} from '../globals.js';
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
        this.game.scale.setGameSize(gamePrefs.gameWidth * 5, gamePrefs.gameHeight * 5);

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

        this.map.createLayer('Floor','CityTiles').setScale(10);
        this.extraWall = this.map.createLayer('ExtraWall','CityTiles').setScale(10);
        this.wall =this.map.createLayer('Wall','CityTiles').setScale(10);
        this.door = this.map.createLayer('Door','CityTiles').setScale(10);

        this.map.setCollisionByExclusion(-1,true,true,'Wall'); 
        this.map.setCollisionByExclusion(-1,true,true,'ExtraWall'); 
        this.map.setCollisionByExclusion(-1,true,true,'Door'); 
    }

    CreatePlayer()
    {
        if(this.fromScene != "playerHouseF0")
            this.player = new player(this, 350, 920).setScale(10);
        else
            this.player = new player(this, 1280, 320).setScale(10);
     
            const extraSpace = 2000;
            this.cameras.main.setBounds(
                -extraSpace, 
                -extraSpace, 
                this.map.widthInPixels + extraSpace * 2, 
                this.map.heightInPixels + extraSpace * 2
            );
        
            this.cameras.main.startFollow(this.player, true);
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