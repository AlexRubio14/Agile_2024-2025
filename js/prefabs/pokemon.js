export default class pokemon extends Phaser.GameObjects.Sprite
{
    constructor(_scene, _spriteTag, _posX, _posY, is_animated, _name, _type, _base_health, _base_physical_attack, _base_physical_defense, _special_attack, _special_defense, _base_speed, _attacks_array)
    {
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        this.scene = _scene;

        this.setOrigin(0.5);

        this.level = 8;

        this.name = _name;
        this.type = _type;
        this.selected_movement = null;

        this.base_health = _base_health;
        this.base_physical_attack = _base_physical_attack;
        this.base_physical_defense = _base_physical_defense;
        this.special_attack = _special_attack;
        this.special_defense = _special_defense;
        this.base_speed = _base_speed;

        this.damage = 0;

        this.attacks_array = _attacks_array;
        
        this.initStats();

        if(is_animated)
            this.anims.play(this.name + '_idle', true);
    }

    initStats()
    {
        this.health = this.calculateHealth();
        this.current_health = this.health;
        this.physical_attack = this.calculateStat(this.base_physical_attack);
        this.physical_defense = this.calculateStat(this.base_physical_defense);
        this.special_attack = this.calculateStat(this.special_attack);
        this.special_defense = this.calculateStat(this.special_defense);
        this.speed = this.calculateStat(this.base_speed);
    }

    calculateHealth()
    {
        return Math.floor((2*this.base_health/100) * this.level + this.level + 10);
    }

    calculateStat(base_stat)
    {
        return (2 * base_stat / 100) * this.level + 5;
    }

    selectRandomMovement()
    {
        this.selected_movement = this.attacks_array[Math.floor(Math.random() * this.attacks_array.length)]
    }

    attack(target_pokemon)
    {
        if(this.health == 0)
            return;

        if (this.selected_movement.category === "PHYSICAL" || this.selected_movement.category === "SPECIAL")
            this.damagingAttack(target_pokemon);
        else
            this.nonDamagingAttack(target_pokemon);
    }

    damagingAttack(target_pokemon)
    { //gen II formula
        var damage = 0;

        if  (this.selected_movement.category == "PHYSICAL")
            damage = (2 * this.level / 5 + 2) * this.selected_movement.power * (this.physical_attack / target_pokemon.physical_defense) / 50;
        else
            damage = (2 * this.level / 5 + 2) * this.selected_movement.power * (this.special_attack / target_pokemon.special_defense) / 50;

        console.log(damage)
        //critical probability
        if (Math.floor(Math.random() * 256) < 17)
            damage *= 2;

        damage += 2;

        //stab
        var i = 0;
        for (i = 0; i < this.type.length; i++) 
        {
            if (this.type[i] == this.selected_movement.type)
            {
                damage *= 1.5;
                break;
            }
        }

        //min_max damage
        var random_multiplier = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
        damage *= random_multiplier / 255;
        damage = Math.floor(damage);
        target_pokemon.receiveDamage(damage);
    }

    receiveDamage(damage)
    {
        console.log(this.name + " " + this.current_health)
        this.current_health -= damage;
        console.log(this.name + " " + this.current_health)
        if(this.current_health <= 0)
        {
            this.current_health = 0;
            this.die();
            return;
        }
        //llamar a una funcion de la escena que haga cosas visuales
    }

    nonDamagingAttack(target_pokemon)
    {
        target_pokemon.physical_defense /= 2;
    }

    die()
    {
        //llamar a una funcion de la escena q haga cosas visuales
        this.scene.returnToWorld(); 
    }
}