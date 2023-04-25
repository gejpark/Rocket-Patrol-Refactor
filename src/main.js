//NAME: Gene Park
//TITLE: Rocket Reloaded 2: The Quickening
//TIME TO COMPLETE:
//MODS CHOSEN:
//  Allow the player to control the Rocket after it's fired (5)
//
//CITATIONS:

let config = {
    type: Phaser.AUTO, //Phaser.CANVAS => webgl isn't pixel perfect when rendering for some reason
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;