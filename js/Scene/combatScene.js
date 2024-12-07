import {gamePrefs, pokemonPrefs} from '../globals.js';
import movement from '/js/prefabs/movement.js';
import pokemon from '/js/prefabs/pokemon.js';
import button from '/js/prefabs/button.js';

export default class combatScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'Combat'});
    }

    preload()
    {
        this.game.scale.setGameSize(gamePrefs.gameWidth * 5, gamePrefs.gameHeight * 5);
        this.cameras.main.setBackgroundColor("f8f8f8");

        this.load.setPath('assets/sprites');
        this.load.image('combat_bg','combat_bg.png');
        this.load.image('arrow_sprite','arrow.png');
        this.load.image('combat_gold','combat_gold.png');
        this.load.image('combat_trainer','combat_trainer.png');
        this.load.image('totodile','combat_totodile.png');
        this.load.spritesheet('hoothoot','combat_hoothoot.png',
        {frameWidth:276,frameHeight:276});

    }

    create()
    {
        this.isUIActive = true;
        this.uiPlayerCurrentHp = null;

        

        this.combatBg = this.add.sprite(0,0,'combat_bg').setOrigin(0).setScale(5);
        //crear trainer enemigo
        //crear player
        //crear totodile
        this.createMovements();
        this.createTotodile();
        this.createHootHoot();

        this.createUI();
        this.createPlayerUI();
        this.createEnemyUI();

        this.loadAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createMovements()
    {
        this.tackle = new movement(this, pokemonPrefs.TACKLE_NAME, pokemonPrefs.TACKLE_TYPE, pokemonPrefs.TACKLE_CATEGORY,
            pokemonPrefs.TACKLE_POWER, pokemonPrefs.TACKLE_ACCURACY, pokemonPrefs.TACKLE_PRIORITY, pokemonPrefs.TACKLE_PP
        );

        this.tail_whip = new movement(this, pokemonPrefs.TAIL_WHIP_NAME, pokemonPrefs.TAIL_WHIP_TYPE, pokemonPrefs.TAIL_WHIP_CATEGORY,
            pokemonPrefs.TAIL_WHIP_POWER, pokemonPrefs.TAIL_WHIP_ACCURACY, pokemonPrefs.TAIL_WHIP_PRIORITY,
            pokemonPrefs.TAIL_WHIP_PP, pokemonPrefs.TAIL_WHIP_STAT_AFFECTED
        );

        this.water_gun = new movement(this, pokemonPrefs.WATER_GUN_NAME, pokemonPrefs.WATER_GUN_TYPE, pokemonPrefs.WATER_GUN_CATEGORY,
            pokemonPrefs.WATER_GUN_POWER, pokemonPrefs.WATER_GUN_ACCURACY, pokemonPrefs.WATER_GUN_PRIORITY, pokemonPrefs.WATER_GUN_PP
        );

        this.wing_attack = new movement(this, pokemonPrefs.WING_ATTACK_NAME, pokemonPrefs.WING_ATTACK_TYPE, pokemonPrefs.WING_ATTACK_CATEGORY,
            pokemonPrefs.WING_ATTACK_POWER, pokemonPrefs.WING_ATTACK_ACCURACY, pokemonPrefs.WING_ATTACK_PRIORITY, pokemonPrefs.WING_ATTACK_PP
        );
    }

    createTotodile()
    {
        var totodile_movements = [this.tackle, this.tail_whip, this.water_gun];

        this.player_pokemon = new pokemon(this, "totodile", pokemonPrefs.playerPokemonPosX, pokemonPrefs.playerPokemonPosY, false, "TOTODILE", ["WATER"], 
            pokemonPrefs.TOTODILE_HEALTH, pokemonPrefs.TOTODILE_PHYSICAL_ATTACK, pokemonPrefs.TOTODILE_PHYSICAL_DEFENSE,
            pokemonPrefs.TOTODILE_SPECIAL_ATTACK, pokemonPrefs.TOTODILE_SPECIAL_DEFENSE, pokemonPrefs.TOTODILE_SPEED,
            totodile_movements
        );
    }

    createHootHoot()
    {
        var hoothoot_movements = [this.tackle, this.wing_attack];

        this.enemy_pokemon = new pokemon(this, "hoothoot", pokemonPrefs.enemyPokemonPosX, pokemonPrefs.enemyPokemonPosY, true, "HOOTHOOT", ["NORMAL", "FLYING"], 
            pokemonPrefs.HOOTHOOT_HEALTH, pokemonPrefs.HOOTHOOT_PHYSICAL_ATTACK, pokemonPrefs.HOOTHOOT_PHYSICAL_DEFENSE,
            pokemonPrefs.HOOTHOOT_SPECIAL_ATTACK, pokemonPrefs.HOOTHOOT_SPECIAL_DEFENSE, pokemonPrefs.HOOTHOOT_SPEED,
            hoothoot_movements
        );
    }

    createPlayerUI()
    {
        this.add.text(pokemonPrefs.uiPlayerNamePosX, pokemonPrefs.uiPlayerNamePosY, this.player_pokemon.name, {
            font: '50px "Pixelify Sans"',
            fill: '#0'
        }).setOrigin(0,0);

        this.uiPlayerLevel = this.add.text(pokemonPrefs.uiPlayerLevelPosX, pokemonPrefs.uiPlayerLevelPosY, this.player_pokemon.level, {
            font: '45px "Pixelify Sans"',
            fill: '#0'
        }).setOrigin(0,0);

        this.uiPlayerCurrentHp = this.add.text(pokemonPrefs.uiPlayerCurrentHpPosX, pokemonPrefs.uiPlayerCurrentHpPosY, this.player_pokemon.current_health, {
            font: '45px "Pixelify Sans"',
            fill: '#0'
        }).setOrigin(1,0);

        this.add.text(pokemonPrefs.uiPlayerTotalHpPosX, pokemonPrefs.uiPlayerTotalHpPosY, this.player_pokemon.health, {
            font: '45px "Pixelify Sans"',
            fill: '#0'
        }).setOrigin(0,0);
    }

    createEnemyUI()
    {
        this.add.text(pokemonPrefs.uiEnemyNamePosX, pokemonPrefs.uiEnemyNamePosY, this.enemy_pokemon.name, {
            font: '50px "Pixelify Sans"',
            fill: '#0'
        }).setOrigin(0,0);

        this.add.text(pokemonPrefs.uiEnemyLevelPosX, pokemonPrefs.uiEnemyLevelPosY, this.enemy_pokemon.level, {
            font: '45px "Pixelify Sans"',
            fill: '#0'
        }).setOrigin(0,0);
    }

    createUI()
    {
        //Player Attack Buttons
        this.button0 = null;
        this.button1 = null;
        this.button2 = null;
        this.button3 = null;

        if(this.player_pokemon.attacks_array[0] != null)
            this.button0 = new button(this, 0, this.player_pokemon.attacks_array[0].name, pokemonPrefs.uiAttack0X, pokemonPrefs.uiAttack0Y)
        if(this.player_pokemon.attacks_array[1] != null)
            this.button1 = new button(this, 1, this.player_pokemon.attacks_array[1].name, pokemonPrefs.uiAttack1X, pokemonPrefs.uiAttack1Y)
        if(this.player_pokemon.attacks_array[2] != null)
            this.button2 = new button(this, 2, this.player_pokemon.attacks_array[2].name, pokemonPrefs.uiAttack2X, pokemonPrefs.uiAttack2Y)
        if(this.player_pokemon.attacks_array[3] != null)
            this.button3 = new button(this, 3, this.player_pokemon.attacks_array[3].name, pokemonPrefs.uiAttack3X, pokemonPrefs.uiAttack3Y)

        if(this.button0 != null)
            this.button0.setButtonConnectors(null, this.button2, this.button1, null);
        if(this.button1 != null)
            this.button1.setButtonConnectors(null, this.button3, null, this.button0);
        if(this.button2 != null)
            this.button2.setButtonConnectors(this.button0, null, this.button3, null);
        if(this.button3 != null)
            this.button3.setButtonConnectors(this.button1, null, null, this.button2);

        this.buttonSelected = this.button0;
        this.buttonSelected.selectButton();
    }

    deactiveButtons()
    {
        if(this.button0) this.button0.setVisible(false);
        if(this.button1) this.button1.setVisible(false);
        if(this.button2) this.button2.setVisible(false);
        if(this.button3) this.button3.setVisible(false);
    }

    activeButtons()
    {
        this.button0.setVisible(true);
        this.button1.setVisible(true);
        this.button2.setVisible(true);
        this.button3.setVisible(true);
    }

    loadAnimations()
    {
        //animacion HOOTHOOT_idle
        this.anims.create(
        {
            key: 'HOOTHOOT_idle',
            frames: this.anims.generateFrameNumbers('hoothoot', 
                {start:0, end:1}),
            frameRate: 10,
            repeat: 2
        });
    }

    update()
    {
        //si la UI esta habilitada navegar por ella
        if(this.isUIActive)
        {
            if (Phaser.Input.Keyboard.DownDuration(this.cursors.up, 250))
            {
                if(this.buttonSelected.up != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.up;
                    this.buttonSelected.selectButton();
                }
            }
            else if (Phaser.Input.Keyboard.DownDuration(this.cursors.down, 250))
            {
                if(this.buttonSelected.down != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.down;
                    this.buttonSelected.selectButton();
                }
            }
            else if (Phaser.Input.Keyboard.DownDuration(this.cursors.right, 250))
            {
                if(this.buttonSelected.right != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.right;
                    this.buttonSelected.selectButton();
                }
            }
            else if (Phaser.Input.Keyboard.DownDuration(this.cursors.left, 250))
            {
                if(this.buttonSelected.left != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.left;
                    this.buttonSelected.selectButton();
                }
            }

            if(Phaser.Input.Keyboard.DownDuration(this.cursors.space, 250))
            {
                this.player_pokemon.selected_movement = this.player_pokemon.attacks_array[this.buttonSelected.id];
                this.combat();
            }
        }
    }

    combat()
    {
        //desactivar UI
        this.isUIActive = false;
        
        //elegir de manera random el ataque del enemigo
        this.enemy_pokemon.selectRandomMovement();

        //comprobar si alguno de los dos ataques tiene prioridad
        if (this.player_pokemon.selected_movement.priority > this.enemy_pokemon.selected_movement.priority)
        {
            this.player_pokemon.attack(this.enemy_pokemon);
            this.enemy_pokemon.attack(this.player_pokemon);
        }
        else if (this.player_pokemon.selected_movement.priority < this.enemy_pokemon.selected_movement.priority)
        {
            this.enemy_pokemon.attack(this.player_pokemon);
            this.player_pokemon.attack(this.enemy_pokemon);
        }
        else
        {
            if (this.player_pokemon.speed > this.enemy_pokemon.speed)
            {

                this.player_pokemon.attack(this.enemy_pokemon);
                this.enemy_pokemon.attack(this.player_pokemon);
            }
            else if (this.player_pokemon.speed < this.enemy_pokemon.speed)
            {
                this.enemy_pokemon.attack(this.player_pokemon);
                this.player_pokemon.attack(this.enemy_pokemon);
            }
            else
            { //speed tie
                if(Math.round(Math.random()) == 0)
                {
                    this.player_pokemon.attack(this.enemy_pokemon);
                    this.enemy_pokemon.attack(this.player_pokemon);
                }
                else
                {
                    this.enemy_pokemon.attack(this.player_pokemon);
                    this.player_pokemon.attack(this.enemy_pokemon);
                }
            }
        }
        this.deactiveButtons();
        this.UpdateUI();
    }

    UpdateUI()
    {
        this.uiPlayerCurrentHp.text = this.player_pokemon.current_health;
    }

}