export default class movement extends Phaser.GameObjects.GameObject
{
    constructor(_scene, _sound_key, _name, _type, _category, _power, _accuracy, _priority, _pp,_stat_affected = null)
    {
        super(_scene, _name);
        this.scene = _scene;
        
        this.sound_key = _sound_key;

        this.name = _name;
        this.type = _type;
        this.category = _category;
        this.power = _power;
        this.accuracy = _accuracy;
        this.priority = _priority;
        this.pp = _pp;
        this.stat_affected = _stat_affected;
    }
}
