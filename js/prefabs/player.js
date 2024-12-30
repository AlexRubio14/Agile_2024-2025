import {gamePrefs} from '../globals.js';
import Pokeball from './pokeball.js';

export default class player extends Phaser.GameObjects.Sprite 
{
    constructor(_scene,_posX,_posY,_spriteTag='player_Sprite')
    { //instanciar el objeto
        super(_scene,_posX,_posY,_spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.player = this;
        this.scene = _scene;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setColliders();
        this.currentDirection = 0;
        this.LoadAnimations();
        this.keyPressed = false;

        const interactionDistance = 160;
    }

    preUpdate(time,delta)
    {
        if (this.cursors.space.isUp)
            this.keyPressed = false;

        this.PlayerMovement();
        this.PlayerInteraction();
        super.preUpdate(time, delta);
    }

    setColliders()
    {
        this.scene.physics.add.collider
        (
            this.player,
            this.scene.extraWall
        );
        this.scene.physics.add.collider
        (
            this.player,
            this.scene.wall
        );
    }

    LoadAnimations()
    {
        this.anims.create(
            {
                key: 'walkDown',
                frames: this.anims.generateFrameNumbers('player_Sprite', 
                    {start:0, end:2}), 
                frameRate: 10,
                repeat:-1
            }
            );
        this.anims.create(
            {
                key: 'walkLeft',
                frames: this.anims.generateFrameNumbers('player_Sprite', 
                    {start:6, end:7}), 
                frameRate: 10,
                repeat:-1
                
            }
            );
        this.anims.create(
            {
                key: 'walkUp',
                frames: this.anims.generateFrameNumbers('player_Sprite', 
                    {start:3, end:5}), 
                frameRate: 10,
                repeat:-1
                
            }
            );
        this.anims.create(
            {
                key: 'walkRight',
                frames: this.anims.generateFrameNumbers('player_Sprite', 
                    {start:8, end:9}), 
                frameRate: 10,
                repeat:-1
                
            }
            );
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

    PlayerInteraction()
    {
        if (this.cursors.space.isDown && !this.keyPressed)
        {
        this.keyPressed = true; 

            if(this.scene.interactives != null)
            {
                for (const interactiveObject of this.scene.interactives){
                    if(interactiveObject.inZone)
                    {
                    const playerX = this.player.x;
                    const playerY = this.player.y;
                    const npcX = interactiveObject.x;
                    const npcY = interactiveObject.y;

                    const deltaX = npcX - playerX;
                    const deltaY = npcY - playerY;

                    let canInteract = false;
                    if ((this.currentDirection === 0 && deltaY > 0 && Math.abs(deltaX) < Math.abs(deltaY)) || 
                    (this.currentDirection === 1 && deltaY < 0 && Math.abs(deltaX) < Math.abs(deltaY)) ||
                    (this.currentDirection === 2 && deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) ||
                    (this.currentDirection === 3 && deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY))) {
                        canInteract = true;
                    }

                    if (canInteract) {
                        interactiveObject.interaction(this.player.currentDirection);
                        break;
                    }
                    }
                }
            }

        }
    }

}