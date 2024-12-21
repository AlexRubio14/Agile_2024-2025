
/// <reference path="../def/phaser.d.ts" />

import city from '/js/scene/city.js';
import combatScene from '/js/scene/combatScene.js';
import elmHouse from '/js/scene/elmhouse.js';
import laboratory from '/js/scene/laboratory.js';
import npcHouse from '/js/scene/npchouse.js';
import playerHouse from '/js/scene/PlayerHouse.js';
import playerRoom from '/js/scene/PlayerRoom.js';
import route from '/js/scene/route.js';
import tittle from '/js/scene/title.js'

import {gamePrefs} from '/js/globals.js';

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.gameWidth,
    height: gamePrefs.gameHeight,
    scene: [tittle, playerRoom, playerHouse, city, laboratory, elmHouse, npcHouse, route, combatScene],
    render:
    {
        pixelArt:true
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            debug:false
        }
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        width:gamePrefs.gameWidth * 5,
        height:gamePrefs.gameHeight * 5,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }
}

var juego = new Phaser.Game(config);