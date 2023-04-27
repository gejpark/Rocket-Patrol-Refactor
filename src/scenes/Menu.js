class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        
        //load explosions audio
        // this.load.audio('sfx_explosion', './assets/explosion_sfx/explosion38.wav'); //original
        this.load.audio('sfx_explosion0', './assets/explosion_sfx/explosion0.wav');
        this.load.audio('sfx_explosion1', './assets/explosion_sfx/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/explosion_sfx/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion_sfx/explosion3.wav');

        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_play', './assets/space-invaders-classic-arcade-game-116826.mp3'); //play scene music
    }

    create() {
        // this.add.text(20, 20, "Rocket Patrol Menu");
        // this.scene.start("playScene");

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}