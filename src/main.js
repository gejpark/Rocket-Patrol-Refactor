//NAME: Gene Park
//MOD TITLE: ROCKET PATROL 2: THE QUICKENING
//TIME TO COMPLETE: 12 HOURS
//MODS CHOSEN:
//  - Allow the player to control the Rocket after it's fired (5)
//      Was very simple, just removed if(!isFiring) check.
//  - Implement the 'FIRE' UI text from the original game (5)
//      Added new text component. Only make visible alpha when isFiring.
//  - Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
//      Found royalty free music, added it to game.
//  - Track a high score that persists across scenes and display it in the UI (5)
//      Adjusted some textboxes.
//  - Implement the speed increase that happens after 30 seconds in the original game (5)
//      Added timer that increments moveSpeed after 30 seconds.
//  - Randomize each spaceship's movement direction at the start of each play (5)
//      Various changes to Spaceship.js update (a "direction" argument was added.) Adjusted Play.js to account for different directions (sprite flipping, etc.)
//  - Display the time remaining (in seconds) on the screen (10)
//      Added time by using elapsed time on 'this.clock' or the time.delayedCall instance. Also added a UI element to display time.
//  - Create 4 new explosion sound effects and randomize which one plays on impact (10)
//      Added randomizer function, and 4 new sounds that it chooses randomly
//  - Create a new scrolling tile sprite for the background (5)
//      Added 4 different tilesprites
//  - Implement parallax scrolling for the background (10)
//      The 4 new tilesprites scroll in the background at different directions/speeds and overlap to create a parallax scrolling effect.
//  - Implement mouse control for player movement and mouse click to fire (15)
//      Click primary button to fire, move left and right with mouse to control. If left or right key is used then mouse is disabled and vice versa.
//  - Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)
//      Phaser's example repository was incredibly helpful in getting explosions to work.
//  - Create a new title screen (e.g., new artwork, typography, layout) (10)
//      Created new title art, changed text style and moved it around. Changed color in play scene to match palette (for consistency)
//  TOTAL POINT VALUE = 105 = 5 + 5 + 5 + 5 + 5 + 5 + 10 + 10 + 5 + 10 + 15 + 15 + 10
//CITATIONS:
//  - Music by Dream-Protocol from Pixabay (https://pixabay.com/music/video-games-space-invaders-classic-arcade-game-116826/)
//  - Phaser 3 Audio Notes (https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/)
//  - Random Javascript (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
//  - elapsed member on time object (https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.TimerEvent#elapsed)
//  - 'sfxr.me' used to make explosion sounds (https://sfxr.me/)
//  - Color palette (https://lospec.com/palette-list/nyx8)
//  - TileSprite documentation (https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.TileSprite.html)
//  - Phaser 3 mouse pointer documentation (https://newdocs.phaser.io/docs/3.60.0/Phaser.Input.Pointer) + example (https://github.com/photonstorm/phaser3-examples/blob/master/public/src/input/pointer/pointer%20debug.js)
//  - Particles help (https://labs.phaser.io/index.html?dir=game%20objects/particle%20emitter/&q=) + (https://labs.phaser.io/view.html?src=src/game%20objects/particle%20emitter/emit%20at%20pointer.js)
//  - NYX8 Palette used (https://lospec.com/palette-list/nyx8)

let config = {
    type: Phaser.AUTO, //Phaser.CANVAS => webgl isn't pixel perfect when rendering for some reason
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, mousePOINTER, mouseControl=false, emitter;
// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;