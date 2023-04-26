//NAME: Gene Park
//TITLE: Rocket Reloaded 2: The Quickening
//TIME TO COMPLETE:
//MODS CHOSEN:
//  - Allow the player to control the Rocket after it's fired (5)
//      Was very simple, just removed if(!isFiring) check.
//  - Implement the 'FIRE' UI text from the original game (5)
//      Added new text component. Only make visible alpha when isFiring.
//  - Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
//      Found royalty free music, added it to game.
//TOTAL POINT VALUE: 
//CITATIONS:
//  - Music by Dream-Protocol from Pixabay (https://pixabay.com/music/video-games-space-invaders-classic-arcade-game-116826/)
//  - Phaser 3 Audio Notes (https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/)

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