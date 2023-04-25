//NAME: Gene Park
//TITLE: Rocket Reloaded 2: The Quickening
//TIME TO COMPLETE:
//MODS CHOSEN:
//  - Allow the player to control the Rocket after it's fired (5)
//  Was very simple, just removed if(!isFiring) check.
//  - Implement the 'FIRE' UI text from the original game (5)
//  Added new text component. Only make visible alpha when isFiring.
//  TOTAL POINT VALUE: 
//CITATIONS:

//notes:
// for high score that persists across screens, just get the highest score value and attach it to the UI (above border, where FIRE is)

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