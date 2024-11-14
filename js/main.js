var gamePrefs=
{
    gameWidth:336,
    gameHeight:304,
    level1Width:320, 
    level1Height:288, 
    PLAYER_SPEED:200,

    TACKLE_NAME: "TACKLE",
    TACKLE_CATEGORY: "PHYSICAL",
    TACKLE_TYPE: "NORMAL",
    TACKLE_PP: 35,
    TACKLE_POWER: 35,
    TACKLE_ACCURACY: 95,
    TACKLE_PRIORITY: 0,
    
    TAIL_WHIP_NAME: "TAIL WHIP",
    TAIL_WHIP_CATEGORY: "NON_DAMAGING",
    TAIL_WHIP_TYPE: "NORMAL",
    TAIL_WHIP_PP: 30,
    TAIL_WHIP_ACCURACY: 100,
    TAIL_WHIP_TARGET: "ENEMY",
    TAIL_WHIP_STAT: "DEFENSE",
    TAIL_WHIP_POWER: 1,
    TAIL_WHIP_PRIORITY: 0,
    TAIL_WHIP_STAT_AFFECTED: "DEFENSE",

    WATER_GUN_NAME: "WATER GUN",
    WATER_GUN_CATEGORY: "SPECIAL",
    WATER_GUN_TYPE: "WATER",
    WATER_GUN_PP: 25,
    WATER_GUN_POWER: 40,
    WATER_GUN_ACCURACY: 100,
    WATER_GUN_PRIORITY: 0,

    WING_ATTACK_NAME: "WING ATTACK",
    WING_ATTACK_CATEGORY: "PHYSICAL",
    WING_ATTACK_TYPE: "FLYING",
    WING_ATTACK_PP: 35,
    WING_ATTACK_POWER: 60,
    WING_ATTACK_ACCURACY: 100,
    WING_ATTACK_PRIORITY: 0,

    TOTODILE_HEALTH: 50,
    TOTODILE_PHYSICAL_ATTACK: 65,
    TOTODILE_PHYSICAL_DEFENSE: 64,
    TOTODILE_SPECIAL_ATTACK: 44,
    TOTODILE_SPECIAL_DEFENSE: 48,
    TOTODILE_SPEED: 43,

    HOOTHOOT_HEALTH: 60,
    HOOTHOOT_PHYSICAL_ATTACK: 30,
    HOOTHOOT_PHYSICAL_DEFENSE: 30,
    HOOTHOOT_SPECIAL_ATTACK: 36,
    HOOTHOOT_SPECIAL_DEFENSE: 56,
    HOOTHOOT_SPEED: 50
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