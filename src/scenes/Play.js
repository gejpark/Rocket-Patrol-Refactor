class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // Load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight:32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        if (!this.anims.exists('explode')) { // only create an 'explode' animation if it doesn't exist.
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
                frameRate: 30
            });
        }

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //Add fireUI
        scoreConfig.align = 'center';
        this.fireUI = this.add.text(game.config.width/2, borderUISize + borderPadding*2, "FIRE", scoreConfig);
        this.fireUI.alpha = 0;

        //Add high score to UI
        if (this.highScore == null) {
            this.highScore = 0;
        }
        scoreConfig.fontSize = '14px';
        this.highScoreUI = this.add.text(game.config.width/4, borderUISize + borderPadding*2, `HIGH SCORE: ${this.highScore}`, scoreConfig);
        scoreConfig.fontSize = '28px';

        //
        if (this.playMusic == null) { // if no such instance exists.
            // console.log('Music instance created')
            this.playMusic = this.sound.add('sfx_play'); //create music/sound instance.
            this.playMusic.setLoop(true); //set it to loop
        }
        this.playMusic.play(); //play the music

        //speed increase spaceships after 30-second delay
        this.speedUpClock = this.time.delayedCall(30000, () => {
            // console.log('Speed increase activated!');
            this.ship01.moveSpeed += 2;
            this.ship02.moveSpeed += 2;
            this.ship03.moveSpeed += 2;
        })
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            if(this.p1Score > this.highScore) {
                this.highScore = this.p1Score;
            }
            this.playMusic.stop(); //stop music when exit to menu
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            if(this.p1Score > this.highScore) {
                this.highScore = this.p1Score;
            }
            this.playMusic.stop(); //stop music when exit to menu
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite
        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            // console.log('kaboom ship 03');
            this.p1Rocket.reset();
            // this.ship03.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            // console.log('kaboom ship 02');
            this.p1Rocket.reset();
            // this.ship02.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            // console.log('kaboom ship 01');
            this.p1Rocket.reset();
            // this.ship01.reset();
            this.shipExplode(this.ship01);
        }

        if(this.p1Rocket.isFiring) {
            this.fireUI.alpha = 1;
        } else {
            this.fireUI.alpha = 0;
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}