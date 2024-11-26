class combatScene extends Phaser.Scene
{
    constructor()
    {
        super({key:'Combat'});
    }

    preload()
    {
        this.cameras.main.setBackgroundColor("666");

        this.load.setPath('assets/sprites');
        this.load.image('combat_bg','combat_bg.png');
        this.load.image('combat_gold','combat_gold.png');
        this.load.image('combat_trainer','combat_trainer.png');
        this.load.image('totodile','combat_totodile.png');
        this.load.spritesheet('hoothoot','combat_hoothoot.png',
        {frameWidth:276,frameHeight:276});

    }

    create()
    {
        this.isUIActive = true;
        this.combatBg = this.add.sprite(0,0,'combat_bg').setOrigin(0,0);
        //crear trainer enemigo
        //crear player
        //crear totodile
        this.createMovements();
        this.createTotodile();
        this.createHootHoot();

        this.createUI();
        this.buttonSelected = this.button0;

        this.loadAnimations();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createMovements()
    {
        this.tackle = new movement(this, gamePrefs.TACKLE_NAME, gamePrefs.TACKLE_TYPE, gamePrefs.TACKLE_CATEGORY,
            gamePrefs.TACKLE_POWER, gamePrefs.TACKLE_ACCURACY, gamePrefs.TACKLE_PRIORITY, gamePrefs.TACKLE_PP
        );

        this.tail_whip = new movement(this, gamePrefs.TAIL_WHIP_NAME, gamePrefs.TAIL_WHIP_TYPE, gamePrefs.TAIL_WHIP_CATEGORY,
            gamePrefs.TAIL_WHIP_POWER, gamePrefs.TAIL_WHIP_ACCURACY, gamePrefs.TAIL_WHIP_PRIORITY,
            gamePrefs.TAIL_WHIP_PP, gamePrefs.TAIL_WHIP_STAT_AFFECTED
        );

        this.water_gun = new movement(this, gamePrefs.WATER_GUN_NAME, gamePrefs.WATER_GUN_TYPE, gamePrefs.WATER_GUN_CATEGORY,
            gamePrefs.WATER_GUN_POWER, gamePrefs.WATER_GUN_ACCURACY, gamePrefs.WATER_GUN_PRIORITY, gamePrefs.WATER_GUN_PP
        );

        this.wing_attack = new movement(this, gamePrefs.WING_ATTACK_NAME, gamePrefs.WING_ATTACK_TYPE, gamePrefs.WING_ATTACK_CATEGORY,
            gamePrefs.WING_ATTACK_POWER, gamePrefs.WING_ATTACK_ACCURACY, gamePrefs.WING_ATTACK_PRIORITY, gamePrefs.WING_ATTACK_PP
        );
    }

    createTotodile()
    {
        var totodile_movements = [this.tackle, this.tail_whip, this.water_gun];

        this.player_pokemon = new pokemon(this, "totodile", false, "TOTODILE", ["WATER"], 
            gamePrefs.TOTODILE_HEALTH, gamePrefs.TOTODILE_PHYSICAL_ATTACK, gamePrefs.TOTODILE_PHYSICAL_DEFENSE,
            gamePrefs.TOTODILE_SPECIAL_ATTACK, gamePrefs.TOTODILE_SPECIAL_DEFENSE, gamePrefs.TOTODILE_SPEED,
            totodile_movements
        );
    }

    createHootHoot()
    {
        var hoothoot_movements = [this.tackle, this.tail_whip, this.wing_attack];

        this.enemy_pokemon = new pokemon(this, "hoothoot", true, "HOOTHOOT", ["NORMAL", "FLYING"], 
            gamePrefs.HOOTHOOT_HEALTH, gamePrefs.HOOTHOOT_PHYSICAL_ATTACK, gamePrefs.HOOTHOOT_PHYSICAL_DEFENSE,
            gamePrefs.HOOTHOOT_SPECIAL_ATTACK, gamePrefs.HOOTHOOT_SPECIAL_DEFENSE, gamePrefs.HOOTHOOT_SPEED,
            hoothoot_movements
        );
    }

    createUI()
    {
        this.button0 = null;
        this.button1 = null;
        this.button2 = null;
        this.button3 = null;

        if(this.player_pokemon.attacks_array[0] != null)
            this.button0 = new button(this, 0, this.player_pokemon.attacks_array[0].name, gamePrefs.uiAttack0X, gamePrefs.uiAttack0Y)
        if(this.player_pokemon.attacks_array[1] != null)
            this.button1 = new button(this, 1, this.player_pokemon.attacks_array[1].name, gamePrefs.uiAttack0X, gamePrefs.uiAttack0Y)
        if(this.player_pokemon.attacks_array[2] != null)
            this.button2 = new button(this, 2, this.player_pokemon.attacks_array[2].name, gamePrefs.uiAttack0X, gamePrefs.uiAttack0Y)
        if(this.player_pokemon.attacks_array[3] != null)
            this.button3 = new button(this, 3, this.player_pokemon.attacks_array[3].name, gamePrefs.uiAttack0X, gamePrefs.uiAttack0Y)

        if(this.button0 != null)
            this.button0.setButtonConnectors(null, this.button2, this.button1, null);
        if(this.button1 != null)
            this.button1.setButtonConnectors(null, this.button3, null, this.button0);
        if(this.button2 != null)
            this.button2.setButtonConnectors(this.button0, null, this.button3, null);
        if(this.button3 != null)
            this.button3.setButtonConnectors(this.button1, null, null, this.button2);

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
                if(this.buttonSelected.up != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.up;
                    this.buttonSelected.selectButton();
                }
            else if (Phaser.Input.Keyboard.DownDuration(this.cursors.down, 250))
                if(this.buttonSelected.down != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.down;
                    this.buttonSelected.selectButton();
                }
            else if (Phaser.Input.Keyboard.DownDuration(this.cursors.right, 250))
                if(this.buttonSelected.right != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.right;
                    this.buttonSelected.selectButton();
                }
            else if (Phaser.Input.Keyboard.DownDuration(this.cursors.left, 250))
                if(this.buttonSelected.left != null)
                {
                    this.buttonSelected.deselectButton();
                    this.buttonSelected = this.buttonSelected.left;
                    this.buttonSelected.selectButton();
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
    }

}