class player extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag='player_Sprite')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.player = this;
        this.scene = _scene;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.currentDirection = 0;
    }

    preUpdate(time,delta)
    {
        this.PlayerMovement();
        super.preUpdate(time, delta);
    }

    PlayerMovement()
    {
        if(this.cursors.left.isDown)
            { 
                this.player.body.setVelocityY(0);
                this.player.body.setVelocityX(-gamePrefs.PLAYER_SPEED);
                this.player.anims.play('walkLeft',true);
                this.currentDirection = 2;
            }
            else if(this.cursors.right.isDown)
            { 
                this.player.body.setVelocityY(0);
                this.player.body.setVelocityX(gamePrefs.PLAYER_SPEED);
                this.player.anims.play('walkRight',true);
                this.currentDirection = 3;
            }
            else if(this.cursors.up.isDown)
            {
                this.player.body.setVelocityX(0);
                this.player.body.setVelocityY(-gamePrefs.PLAYER_SPEED);
                this.player.anims.play('walkUp',true);
                this.currentDirection = 1;
            }
            else if(this.cursors.down.isDown)
            {
                this.player.body.setVelocityX(0);
                this.player.body.setVelocityY(gamePrefs.PLAYER_SPEED);
                this.player.anims.play('walkDown',true);
                this.currentDirection = 0;
            }
            else 
            { 
                this.player.body.setVelocityX(0);
                this.player.body.setVelocityY(0);
    
                this.StopWallking();
            }
    }
    StopWallking()
    {
        if(this.currentDirection == 0)
            this.player.anims.stop().setFrame(1);
        else if(this.currentDirection == 1)
            this.player.anims.stop().setFrame(4);
        else if(this.currentDirection == 2)
            this.player.anims.stop().setFrame(6);
        else
            this.player.anims.stop().setFrame(8);
    }

}