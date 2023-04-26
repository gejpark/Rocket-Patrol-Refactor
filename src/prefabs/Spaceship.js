// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                       // add to existing scene
        this.points = pointValue;                       // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;  // pixels per frame
        this.direction = 1;
    }

    update() {
        // console.log(this.x);
        // move spaceship left
        this.x -= this.moveSpeed * this.direction;
        // if(this.direction == 1) {
        //     this.x -= this.moveSpeed;
        // }
        // if(this.direction == -1) {
        //     this.x += this.moveSpeed;
        // }
        // wrap around from left edge to right edge if direction = 1
        if(this.x <= 0 - this.width && this.direction == 1) { 
            this.reset(this.direction);
        }
        // wrap around from right edge to left edge if direction = -1
        if(this.x >= game.config.width + this.width && this.direction == -1) {
            this.reset(this.direction);
        }
    }

    // position reset
    reset(direction=1) {
        if(direction == 1) { // if wrap around from left to right, then spawn at right
            this.x = game.config.width;
        } else {             // if wrap around from right to left, then spawn at left
            this.x = 0 - this.width;
        }
    }
}