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

        //rocket patrol menu screen
        this.load.image('menuScreen', './assets/rocket_patrol_title_Screen.png');
    }

    create() {
        this.menuImage = this.add.tileSprite(0, 0, 640, 480, 'menuScreen').setOrigin(0, 0);
        // this.add.text(20, 20, "Rocket Patrol Menu");
        // this.scene.start("playScene");

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Trebuchet MS',
            fontSize: '28px',
            backgroundColor: '#816271',
            color: '#c3a38a',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'ROCKET PATROL 2: THE QUICKENING', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        menuConfig.fontSize = '14px';
        this.add.text(game.config.width*(3/4), game.config.height*(3/4), 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width*(3/4), game.config.height*(3/4) + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        mousePOINTER = this.input.activePointer; //set mouse pointer
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