var gamePrefs=
{
    gameWidth:336,
    gameHeight:304,
    level1Width:320, 
    level1Height:288, 
    PLAYER_SPEED:200
}

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene:[City], 
    render:
    {
        pixelArt:true
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            //gravity:{y:gamePrefs.GRAVITY},
            debug:true
        }
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        width:gamePrefs.gameWidth / 2,
        height:gamePrefs.gameHeight / 2,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }
}


var juego = new Phaser.Game(config);