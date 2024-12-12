export default class healthBar 
{
    constructor(_scene, _posX, _posY, _width, _height, _maxValue, _color = 0x30DB39, _bgColor = 0x808080) {
        this.scene = _scene;
        this.x = _posX;
        this.y = _posY;
        this.width = _width;
        this.height = _height;
        this.maxValue = _maxValue;
        this.currentValue = _maxValue;
        this.color = _color;
        this.bgColor = _bgColor;

        // Create graphics objects for the background and the bar
        this.bgGraphics = this.scene.add.graphics();
        this.barGraphics = this.scene.add.graphics();

        // Draw the initial bar
        this.draw();
    }

    draw() {
        // Clear previous drawings
        this.bgGraphics.clear();
        this.barGraphics.clear();

        // Draw the background
        this.bgGraphics.fillStyle(this.bgColor);
        this.bgGraphics.fillRect(this.x, this.y, this.width, this.height);

        // Draw the filled portion of the bar
        const filledWidth = (this.currentValue / this.maxValue) * this.width;
        this.barGraphics.fillStyle(this.color);
        this.barGraphics.fillRect(this.x, this.y, filledWidth, this.height);
    }

    // Updates the bar width instantly to match the current health
    updateHealth(newHealth, maxHealth) {
        this.currentValue = (newHealth / maxHealth) * this.maxValue;
        this.draw();
    }

    decreaseHealthTo(newHealth, maxHealth, duration = 1000) {
        // Clamp the new health value to valid range
        newHealth = Phaser.Math.Clamp(newHealth, 0, maxHealth);
    
        // Calculate the target health percentage
        const targetValue = (newHealth / maxHealth) * this.maxValue;
    
        // Animate the currentValue property
        this.scene.tweens.add({
            targets: this,
            currentValue: targetValue, // Interpolates currentValue
            duration: duration,
            ease: 'Linear',
            onUpdate: () => {
                this.draw(); // Redraw the bar with updated currentValue
            },
            onComplete: () => {
                if (typeof onComplete === 'function') {
                    onComplete(); // Call the callback function if provided
                }
            }
        });
    }

    setValue(newValue) {
        // Update the current value and redraw the bar
        this.currentValue = Phaser.Math.Clamp(newValue, 0, this.maxValue);
        this.draw();
    }

    setMaxValue(newMaxValue) {
        // Update the max value and redraw the bar
        this.maxValue = newMaxValue;
        this.currentValue = Phaser.Math.Clamp(this.currentValue, 0, newMaxValue);
        this.draw();
    }

    destroy() {
        // Destroy graphics objects if the bar is no longer needed
        this.bgGraphics.destroy();
        this.barGraphics.destroy();
    }
}