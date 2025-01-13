import {gamePrefs, pokemonPrefs} from '../globals.js';
import movement from '/js/prefabs/movement.js';
import pokemon from '/js/prefabs/pokemon.js';
import button from '/js/prefabs/button.js';
import ValueBar from '../prefabs/healthBar.js';
import healthBar from '../prefabs/healthBar.js';
import AudioManager from '/js/audioManager.js';
import dialogueCombat from '../prefabs/dialogueCombat.js';

export default class combatScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'Combat'});
        this.handleKeyPress = null
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
        this.load.image('dialogue_box', 'dialogue_box.png')
        this.load.image('roar_attack','roar.png')
        this.load.spritesheet('hoothoot','combat_hoothoot.png',
        {frameWidth:276,frameHeight:276});
        this.load.spritesheet('air_attack','air_attack.png',
            {frameWidth:16,frameHeight:8});
        this.load.spritesheet('water_attack','water_attack.png',
            {frameWidth:16,frameHeight:16});
        this.load.spritesheet('tackle_attack','tackle.png',
            {frameWidth:32,frameHeight:32});

        this.airAttackKeyname = 'airCut'
        this.waterAttackKeyname = 'waterAttack'
        this.tackleAttackKeyname = 'tackleAttack'

        this.load.setPath('assets/audio');
        this.load.audio('combatMusic', 'Combat.wav');
        this.load.setPath('assets/audio/attacks');
        this.load.audio('tackle_sound', 'Tackle.wav');
        this.load.audio('tail_whip_sound', 'TailWhip.wav');
        this.load.audio('water_gun_sound', 'WaterGun.wav');
        this.load.audio('wing_attack_sound', 'WingAttack.wav');
    }

    create()
    {
        this.isUIActive = true;
        this.uiPlayerCurrentHp = null;
        this.pokemonIsAttacking = false

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

        this.air = this.add.sprite(-81, 100,'air_attack').setScale(7);
        this.water = this.add.sprite(-97, 100,'water_attack').setScale(7);
        this.tackle = this.add.sprite(-129, 100,'tackle_attack').setScale(2);
        this.tail_whip = this.add.sprite(-161,100,'roar_attack').setScale(4);

        this.enemyBar = new healthBar(this, 160,97.5,240,12,100);
        this.playerBar = new healthBar(this, 480, 378, 240,12,100);

        this.createMovementsAnims()
        this.CreateAudio();
        
    }

    createMovementsAnims()
    {
        this.anims.create(
                {
                    key: this.airAttackKeyname,
                    frames: this.anims.generateFrameNumbers('air_attack', 
                        {start:0, end:5}), 
                    frameRate: 10,
                    repeat:0
                }
                );
            this.anims.create(
                {
                    key: this.waterAttackKeyname,
                    frames: this.anims.generateFrameNumbers('water_attack', 
                        {start:0, end:3}), 
                    frameRate: 10,
                    repeat:0
                }
                );
            this.anims.create(
                {
                    key: this.tackleAttackKeyname,
                    frames: this.anims.generateFrameNumbers('tackle_attack', 
                        {start:0, end:3}), 
                    frameRate: 10,
                    repeat:2
                }
                );
    }

    playMovementAnim(selectedMovementName, pokemonAttacksPos, pokemonReceivesAttackPos) 
    {
        if(selectedMovementName == pokemonPrefs.TAIL_WHIP_NAME)
        {
            this.pokemonIsAttacking = true
            this.tail_whip.setPosition(pokemonAttacksPos.x + 100, pokemonAttacksPos.y)
            this.time.delayedCall(1000, () => {
                // Move the image off the screen (for example, to the right)
                this.tail_whip.setPosition(-100,300);
                this.pokemonIsAttacking = false;

            });
            return;
        }

        if(selectedMovementName == pokemonPrefs.TACKLE_NAME)
        {
            this.tackle.setPosition(pokemonReceivesAttackPos.x, pokemonReceivesAttackPos.y)
            this.tackle.play(this.tackleAttackKeyname,true)
            this.tackle.on('animationcomplete', (animation) => {
                if (animation.key === this.tackleAttackKeyname) {
                    // After the tackle animation finishes, change the position
                    this.tackle.setPosition(-100, 300);  // Set the new position after the animation
                }
            });
            return;
        }

        if(selectedMovementName == pokemonPrefs.WATER_GUN_NAME) 
        {
            this.water.setPosition(pokemonReceivesAttackPos.x, pokemonReceivesAttackPos.y)
            this.water.play(this.waterAttackKeyname,true)
            this.water.on('animationcomplete', (animation) => {
                if (animation.key === this.waterAttackKeyname) {
                    // After the water_gun animation finishes, change the position
                    this.water.setPosition(-100, 300);  // Set the new position after the animation
                }
            });
            return;
        }

        if(selectedMovementName == pokemonPrefs.WING_ATTACK_NAME) 
        {
            this.air.setPosition(pokemonReceivesAttackPos.x, pokemonReceivesAttackPos.y)
            this.air.play(this.airAttackKeyname,true)
            this.air.on('animationcomplete', (animation) => {
                if (animation.key === this.airAttackKeyname) {
                    // After the water_gun animation finishes, change the position
                    this.air.setPosition(-100, 300);  // Set the new position after the animation
                }
            });
            return;
        }
    }

    CreateAudio()
    {
        this.audioManager = new AudioManager(this);
        this.audioManager.updateScene(this);

        this.audioManager.stopSound('backgroundMusic');

        this.audioManager.addSound('combatMusic', { loop: true, volume: 0.3 });
        this.audioManager.playSound('combatMusic');

        this.audioManager.addSound('tackle_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('tail_whip_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('water_gun_sound', { loop: false, volume: 0.3 });
        this.audioManager.addSound('wing_attack_sound', { loop: false, volume: 0.3 });
    }

    createMovements()
    {
        this.tackle = new movement(this, 'tackle_sound', pokemonPrefs.TACKLE_NAME, pokemonPrefs.TACKLE_TYPE, pokemonPrefs.TACKLE_CATEGORY,
            pokemonPrefs.TACKLE_POWER, pokemonPrefs.TACKLE_ACCURACY, pokemonPrefs.TACKLE_PRIORITY, pokemonPrefs.TACKLE_PP, this.tackleAttackKeyname
        );

        this.tail_whip = new movement(this, 'tail_whip_sound', pokemonPrefs.TAIL_WHIP_NAME, pokemonPrefs.TAIL_WHIP_TYPE, pokemonPrefs.TAIL_WHIP_CATEGORY,
            pokemonPrefs.TAIL_WHIP_POWER, pokemonPrefs.TAIL_WHIP_ACCURACY, pokemonPrefs.TAIL_WHIP_PRIORITY,
            pokemonPrefs.TAIL_WHIP_PP, pokemonPrefs.TAIL_WHIP_STAT_AFFECTED
        );

        this.water_gun = new movement(this, 'water_gun_sound', pokemonPrefs.WATER_GUN_NAME, pokemonPrefs.WATER_GUN_TYPE, pokemonPrefs.WATER_GUN_CATEGORY,
            pokemonPrefs.WATER_GUN_POWER, pokemonPrefs.WATER_GUN_ACCURACY, pokemonPrefs.WATER_GUN_PRIORITY, pokemonPrefs.WATER_GUN_PP, this.waterAttackKeyname
        );

        this.wing_attack = new movement(this, 'wing_attack_sound', pokemonPrefs.WING_ATTACK_NAME, pokemonPrefs.WING_ATTACK_TYPE, pokemonPrefs.WING_ATTACK_CATEGORY,
            pokemonPrefs.WING_ATTACK_POWER, pokemonPrefs.WING_ATTACK_ACCURACY, pokemonPrefs.WING_ATTACK_PRIORITY, pokemonPrefs.WING_ATTACK_PP, this.airAttackKeyname
        );
    }

    createTotodile()
    {
        var totodile_movements = [this.tackle, this.tail_whip, this.water_gun];

        this.player_pokemon = new pokemon(this, "totodile", pokemonPrefs.playerPokemonPosX, pokemonPrefs.playerPokemonPosY, false, "TOTODILE", ["WATER"], 
            pokemonPrefs.TOTODILE_HEALTH, pokemonPrefs.TOTODILE_PHYSICAL_ATTACK, pokemonPrefs.TOTODILE_PHYSICAL_DEFENSE,
            pokemonPrefs.TOTODILE_SPECIAL_ATTACK, pokemonPrefs.TOTODILE_SPECIAL_DEFENSE, pokemonPrefs.TOTODILE_SPEED,
            totodile_movements, false
        );
    }

    createHootHoot()
    {
        var hoothoot_movements = [this.tackle, this.wing_attack, this.tail_whip];

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

        this.combatText = new dialogueCombat(this,10,495,"")
    }

    deactiveButton()
    {
        this.buttonSelected.deselectButton();
    }

    activeButton()
    {

        this.buttonSelected.selectButton();
        this.isUIActive = true;

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

            if(this.cursors.space.isDown && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 250) )
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
        { //Movimiento del player tiene prioridad
            this.playerAttackFirst();
        }
        else if (this.player_pokemon.selected_movement.priority < this.enemy_pokemon.selected_movement.priority)
        { //Movimiento del enemigo tiene prioridad
            this.enemyAttackFirst();
        }
        else
        { // Ninguno de los movimientos tiene prioridad
            if (this.player_pokemon.speed > this.enemy_pokemon.speed)
            {
                this.playerAttackFirst();
            }
            else if (this.player_pokemon.speed < this.enemy_pokemon.speed)
            {
                this.enemyAttackFirst();
            }
            else
            { //speed tie
                if(Math.round(Math.random()) == 0)
                {
                    this.playerAttackFirst();
                }
                else
                {
                    this.enemyAttackFirst();
                }
            }
        }
    }

    enemyAttackFirst()
    {
        this.deactiveButton();

        this.enemy_pokemon.attack(this.player_pokemon);
        this.playMovementAnim(this.enemy_pokemon.selected_movement.name, this.enemy_pokemon, this.player_pokemon)
        this.combatText.ActivateText(this.enemy_pokemon.name, this.enemy_pokemon.selected_movement.name)
        this.audioManager.playSound(this.enemy_pokemon.selected_movement.sound_key);
        this.updateUI();


        this.playerBar.decreaseHealthTo(this.player_pokemon.current_health, this.player_pokemon.health, () => {
            this.player_pokemon.checkIfDie();
            
            
            this.waitForSpaceInput(() => {

                this.player_pokemon.attack(this.enemy_pokemon);
                this.playMovementAnim(this.player_pokemon.selected_movement.name, this.player_pokemon, this.enemy_pokemon)
                this.audioManager.playSound(this.player_pokemon.selected_movement.sound_key);
                this.updateUI();
                this.combatText.DeactivateText();
                this.combatText.ActivateText(this.player_pokemon.name, this.player_pokemon.selected_movement.name)
                this.enemyBar.decreaseHealthTo(this.enemy_pokemon.current_health, this.enemy_pokemon.health, () => {
                    this.enemy_pokemon.checkIfDie()
                    this.activeButton();
                    this.combatText.DeactivateText()
                });
            })
         });

    }

    playerAttackFirst()
    {
        this.deactiveButton();

        this.player_pokemon.attack(this.enemy_pokemon);
        this.playMovementAnim(this.player_pokemon.selected_movement.name, this.player_pokemon, this.enemy_pokemon)
        this.combatText.ActivateText(this.player_pokemon.name, this.player_pokemon.selected_movement.name)
        this.audioManager.playSound(this.player_pokemon.selected_movement.sound_key);
        this.updateUI();


        this.playerBar.decreaseHealthTo(this.player_pokemon.current_health, this.player_pokemon.health, () => {

            this.enemy_pokemon.checkIfDie()
            

            this.waitForSpaceInput(() => {
                this.enemy_pokemon.attack(this.player_pokemon);
                this.playMovementAnim(this.enemy_pokemon.selected_movement.name, this.enemy_pokemon, this.player_pokemon)
                this.audioManager.playSound(this.enemy_pokemon.selected_movement.sound_key);
                this.updateUI();
                this.combatText.DeactivateText()
                this.combatText.ActivateText(this.enemy_pokemon.name, this.enemy_pokemon.selected_movement.name)
                this.enemyBar.decreaseHealthTo(this.enemy_pokemon.current_health, this.enemy_pokemon.health, () => {
                    this.player_pokemon.checkIfDie()
                    this.activeButton();
                    this.combatText.DeactivateText()
                });
            })
        });
        
    }

    waitForSpaceInput(callback)
    {
        this.handleKeyPress = (event) => {
            if (event.code === "Space" && !this.pokemonIsAttacking) {
                // Remove the event listener after detecting the space bar
                document.removeEventListener("keydown", this.handleKeyPress);
    
                // Execute the next step
                callback();
            }
        };
    
        // Add the event listener for the space bar
        document.addEventListener("keydown", this.handleKeyPress);
    }

    endTurn()
    {
        
    }

    updateUI()
    {
        this.uiPlayerCurrentHp.text = this.player_pokemon.current_health;
    }

    returnToWorld(isEnemy)
    {
        this.audioManager.stopAll();
        this.audioManager.playSound('backgroundMusic');

        if (this.handleKeyPress) {
            document.removeEventListener("keydown", this.handleKeyPress);
        }

        if(isEnemy)
            this.scene.start('tittle', { from: this.scene.key });
        else
            this.scene.start('laboratory', { from: this.scene.key });
    }
}