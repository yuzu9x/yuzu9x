let inputActive = false;
let font;
let wall;

let bgmusic;

let titleScene;
let scene1, scene2, scene3, scene4;
let endScene;

let titleSceneBackground;
let scene1Background, scene2Background, scene3Background, scene4Background;
let endSceneBackground;

let titleText;
let arrowKeys;
let spaceBar;

let currentScene;

let player;
let playerSpriteSheet;
let playerSpritesRight = [];
let playerSpritesLeft = [];
let playerSpritesUp = [];
let playerSpritesDown = [];


let totalFrames = 4; // Number of frames in the sprite sheet for each direction
let frameWidth = 50; // Width of each frame
let frameHeight = 50; // Height of each frame



function preload() {
  
  // bg music
  bgMusic = loadSound("../p5games/AutoBioGame/visualelm/stylesavvy_rosietheme.mp3");
  
  
  // Font
  font = loadFont('../p5games/AutoBioGame/visualelm/GothicPixels.ttf');
  
  // Background images
  titleSceneBackground = loadImage("../p5games/AutoBioGame/assets/title.png");
  scene1Background = loadImage("../p5games/AutoBioGame/assets/scene1bg.png");
  scene2Background = loadImage("../p5games/AutoBioGame/assets/scene2bg.jpg");
  scene3Background = loadImage("../p5games/AutoBioGame/assets/scene3bg.jpg");
  scene4Background = loadImage("../p5games/AutoBioGame/assets/scene4bg.jpg");
  
  titleText = loadImage("../p5games/AutoBioGame/assets/arecordofmydreams.png");
  arrowKeys = loadImage("../p5games/AutoBioGame/assets/arrowkeys.png");
  spaceBar = loadImage("../p5games/AutoBioGame/assets/spacebar.png");
  
  // Load sprite sheet for the player
  playerSpriteSheet = loadImage("../p5games/AutoBioGame/maincharacter.png");
}

function setup() {
  createCanvas(600, 400).parent("game-container");
  
  noSmooth();

   bgMusic.loop();
  
  player = new Player(width/2, height/2);   
  loadPlayerSprites(); 

  // Initialize all the scenes
  titleScene = new TitleScene();
  scene1 = new Scene1();
  scene2 = new Scene2();
  scene3 = new Scene3();
  scene4 = new Scene4();
  endScene = new EndScene();
  
  wall = new Wall();
  
  // Set the current scene to title scene and call enterScene
  currentScene = titleScene;
  currentScene.enterScene();

  inputActive = true;

  
}

function draw() {
  background(220);
  
  // create window boundaries
  if (player.x < 0) {
    player.x = 0;  
  }
  if (player.x > width - frameWidth) {
    player.x = width - frameWidth; 
  }
  if (player.y < 0) {
    player.y = 0; 
  }
  if (player.y > height - frameHeight) {
    player.y = height - frameHeight;  
  }


  // Update and display player in the current scene
  player.update(); 
  player.display(); 
  
  // Update and display the current scene
  currentScene.update();
  currentScene.display();
}  

// Switch between scenes
function switchScenes(targetScene) {
  if (currentScene && typeof currentScene.exitScene === 'function') {
    currentScene.exitScene();  // Exit the current scene
  }

  currentScene = targetScene;  // Set the new scene as the current scene

  if (currentScene && typeof currentScene.enterScene === 'function') {
    currentScene.enterScene();  // Enter the new scene
  } else {
    console.error('No enterScene method found for the target scene!');
  }
}


// Load player sprites from sprite sheet
function loadPlayerSprites() {
  // Load sprites for right movement
  
  
  for (let i = 0; i < totalFrames; i++) {
    playerSpritesRight[i] = playerSpriteSheet.get(i * frameWidth + frameWidth*12, 0, frameWidth, frameHeight)
  }

  // Load sprites for left movement
  for (let i = 0; i < totalFrames; i++) {
    playerSpritesLeft[i] = playerSpriteSheet.get(i * frameWidth + frameWidth*4, 0, frameWidth, frameHeight);
  }

  // Load sprites for up movement
  for (let i = 0; i < totalFrames; i++) {
    playerSpritesUp[i] = playerSpriteSheet.get(i * frameWidth + frameWidth*8, 0, frameWidth, frameHeight);
  }
  
  // Load sprites for down movement
  for (let i = 0; i < totalFrames; i++) {
    playerSpritesDown[i] = playerSpriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    
    
    
  }
}



