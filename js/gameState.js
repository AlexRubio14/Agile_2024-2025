class gameState extends Phaser.Scene
{
    constructor()
    {
        super({key:'gameState'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor("AAA");

        // Bird Scene
        // this.load.image('backG','assets/sprites/bg.jpg');
        // //this.load.image('player','assets/sprites/bird.png');
        // this.load.spritesheet('birdAnim', 'assets/sprites/birdAnim.png',
        // {frameWidth:17, frameHeight:12}
        // );


        //Link Scene
        this.load.image('backG','assets/sprites/grass.png');
        this.load.spritesheet('linkAnim', 'assets/sprites/link.png',
        {frameWidth:120, frameHeight:130}
        );
    }

    create()
    { //Pinta assets en pantalla
        //this.add.image(0,0,'backG').setOrigin(0,0);
        //this.add.image(0,0,'backG').setOrigin(0);
        //this.add.image(0,0,'backG').setOrigin(0,0.5);
        //this.add.image(config.width/2,config.height/2,'backG');
        //this.fondo = this.add.image(config.width/2,config.height/2,'backG');


        //Bird Scene
        // this.bg = this.add.tileSprite(0,0, config.width, config.height, 'backG')
        // .setOrigin(0);
        // // this.player = this.add.image(config.width / 2 ,config.height /2 , 'player')
        // // .setScale(1)
        // // .setFlipX(true);
        // this.birdAnim = this.add.sprite(config.width / 2, config.height / 2, 'birdAnim')
        // .setOrigin(0.5)
        // .setScale(3)

        // this.LoadAnimations();

        // this.birdAnim.anims.play('fly');

        // // this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // // this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // // this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // // this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // this.cursors = this.input.keyboard.createCursorKeys()

        //Link Scene
         this.bg = this.add.tileSprite(0,0, config.width, config.height, 'backG')
         .setOrigin(0);

         this.link = this.add.sprite(config.width / 2, config.height / 2, 'linkAnim')
         .setOrigin(0.5)
         .setScale(0.5);

         this.LoadAnimations();

         this.direction = -1;

         this.cursors = this.input.keyboard.createCursorKeys()

    }

        LoadAnimations()
        {
            // this.anims.create(
            // {
            //     key: 'fly',
            //     frames: this.anims.generateFrameNumbers('birdAnim', 
            //         {start:0, end:9}), 
            //     frameRate: 10,
            //      repeat: -1,
            //     yoyo: true
            // }
            // );

            this.anims.create(
                {
                    key: 'walkDown',
                    frames: this.anims.generateFrameNumbers('linkAnim', 
                        {start:0, end:9}), 
                    frameRate: 10,
                    
                }
                );
            this.anims.create(
                {
                    key: 'walkLeft',
                    frames: this.anims.generateFrameNumbers('linkAnim', 
                        {start:10, end:19}), 
                    frameRate: 10,
                    
                }
                );
            this.anims.create(
                {
                    key: 'walkUp',
                    frames: this.anims.generateFrameNumbers('linkAnim', 
                        {start:20, end:29}), 
                    frameRate: 10,
                    
                }
                );
            this.anims.create(
                {
                    key: 'walkRight',
                    frames: this.anims.generateFrameNumbers('linkAnim', 
                        {start:30, end:39}), 
                    frameRate: 10,
                    
                }
                );
        }

    update()
    { //Actualiza whatever
        //Bird Scene  
        // this.bg.tilePositionX += 1;
        // //this.birdAnim.angle += 3;

        // this.BirdBehaviour();

        this.LinkBehaviour();
        
    }

    BirdBehaviour()
    {
        this.movementSpeed = 5;

        if(this.cursors.right.isDown)
        {
            this.birdAnim.x += this.movementSpeed;
            this.birdAnim.setFlipX(false);
        }
        if(this.cursors.up.isDown)
        {
            this.birdAnim.y -= this.movementSpeed;
        }
        if(this.cursors.left.isDown)
        {
            this.birdAnim.x -= this.movementSpeed;
            this.birdAnim.setFlipX(true);
        }
        if(this.cursors.down.isDown)
        {
            this.birdAnim.y += this.movementSpeed;
        }
    }

    LinkBehaviour()
    {
        this.movementSpeed = 2.5;

        

        if(this.cursors.right.isDown)
        {
            this.link.x += this.movementSpeed;
            this.link.anims.play('walkRight', true);
            this.direction = 3;
        }
        else if(this.cursors.up.isDown)
        {
            this.link.y -= this.movementSpeed;
            this.link.anims.play('walkUp', true);
            this.direction = 2;

        }
        else if(this.cursors.left.isDown)
        {
            this.link.x -= this.movementSpeed;
            this.link.anims.play('walkLeft', true);
            this.direction = 1;

        }
        else if(this.cursors.down.isDown)
        {
            this.link.y += this.movementSpeed;
            this.link.anims.play('walkDown', true);
            this.direction = 0;

        }
        else
        {
            this.link.setFrame(0);
        }
    }
}