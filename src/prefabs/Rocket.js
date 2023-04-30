// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add object to existing scene
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        //console.log(mousePOINTER.x);         //x position
        // console.log(mousePOINTER.distance);  //distance moved?
        
        // console.log();

        // enable/disable mouse control if mouse is moved a bit then enable, if keyboard keys are used, disable mouse.
        if(mousePOINTER.distance > 0) {             //if move with mouse then allow mouse control
            mouseControl = true;
        }
        if(keyLEFT.isDown || keyRIGHT.isDown || keyF.isDown) {     //if move with keyboard then disable mouse control
            mouseControl = false;
        }

        if(mouseControl == false) { //keyboard control
            // left/right movement (even after firing)
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown &&  this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }

            // fire button
            if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                this.sfxRocket.play(); // play sfx
                this.isFiring = true;
            }
        }
        if(mouseControl == true) { //mouse control
            // left/right movement (even after firing)
            // move rocket towards mouse position.
            if(this.x > mousePOINTER.x && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            }
            if(this.x < mousePOINTER.x && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
            if(mousePOINTER.leftButtonDown() && !this.isFiring) {
                this.sfxRocket.play();
                this.isFiring = true;
            }
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}