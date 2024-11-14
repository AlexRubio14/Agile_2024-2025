class pokemon extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_spriteTag, is_animated, _name, _type, _base_health, _base_physical_attack, _base_physical_defense, _special_attack, _special_defense, _base_speed, _attacks_array)
    {
        super(_scene,_spriteTag);
        _scene.add.existing(this);
        this.scene = _scene;

        this.name = _name;
        this.type = _type;
        this.selected_movement = null;

        this.base_health = _base_health;
        this.base_physical_attack = _base_physical_attack;
        this.base_physical_defense = _base_physical_defense;
        this.special_attack = _special_attack;
        this.special_defense = _special_defense;
        this.base_speed = _base_speed;

        this.attacks_array = _attacks_array;
        
        this.initStats(this);

        if(is_animated)
            this.anims.play(this.name + '_idle', true);
    }

    initStats()
    {
        this.health = this.calculateHealth();
        this.current_health = this.health;
        this.physical_attack = this.calculateStat();
        this.physical_defense = this.calculateStat();
        this.special_attack = this.calculateStat();
        this.special_defense = this.calculateStat();
        this.speed = this.calculateStat();
    }

    calculateHealth(base_stat)
    {
        return (2*base_stat/100) * this.level + this.level + 10;
    }

    calculateStat(base_stat)
    {
        return (2 * base_stat / 100) * this.level + 5;
    }

    selectRandomMovement()
    {
        this.selected_movement = this.attacks_array[Math.floor(Math.random() * attacks_array.length)]
    }

    attack(target_pokemon)
    {
        if (this.selected_movement == "PHYSICAL" || this.selected_movement == "SPECIAL")
            this.damagingAttack(target_pokemon);
        else
            this.nonDamagingAttack(target_pokemon);
    }

    damagingAttack(target_pokemon)
    { //gen II formula
        if  (this.selected_movement == "PHYSICAL")
            damage = (2 * this.level / 5 + 2) * this.selected_movement.power * (this.physical_attack / target_pokemon.physical_defense) / 50;
        else
            damage = (2 * this.level / 5 + 2) * this.selected_movement.power * (this.special_attack / target_pokemon.special_defense) / 50;

        //critical probability
        if (Math.floor(Math.random() * 256) < 17)
            damage *= 2;

        damage += 2;

        //stab
        for (i = 0; i < type.length; i++) 
        {
            if (type[i] == this.selected_movement.type)
            {
                damage *= 1.5;
                break;
            }
        }

        //min_max damage
        random_multiplier = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
        damage *= random_multiplier / 255;

        target_pokemon.receiveDamage(damage);
    }

    receiveDamage(damage)
    {
        this.current_health -= damage;
        if(current_health <= 0)
        {
            this.current_health = 0;
            die();
            return;
        }
        //llamar a una funcion de la escena que haga cosas visuales
    }

    nonDamagingAttack(target_pokemon)
    {

    }

    die()
    {
        //llamar a una funcion de la escena q haga cosas visuales
    }
}