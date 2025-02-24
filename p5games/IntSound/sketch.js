let squares = []; // Squares for my sounds
let sounds = [];
let images = [];
let particles = []; // Array to hold the particles for the sparkle effect

function preload() {
  images.push(loadImage('../p5games/IntSound/armoire.jpg')); 
  images.push(loadImage('../p5games/IntSound/candycastle.jpg'));
  images.push(loadImage('../p5games/IntSound/fog.jpg'));
  images.push(loadImage('../p5games/IntSound/forest.jpg'));
  images.push(loadImage('../p5games/IntSound/lace.jpg'));
  images.push(loadImage('../p5games/IntSound/lines.jpg'));
  images.push(loadImage('../p5games/IntSound/moon.jpg'));
  images.push(loadImage('../p5games/IntSound/musicvillage.jpg'));
  images.push(loadImage('../p5games/IntSound/pillars.jpg'));
  images.push(loadImage('../p5games/IntSound/snow.jpg'));
  images.push(loadImage('../p5games/IntSound/closecastle.jpg'));
  images.push(loadImage('../p5games/IntSound/cupcake.jpg')); 
  images.push(loadImage('../p5games/IntSound/planet.jpg'));  // Planet image is the background
  images.push(loadImage('../p5games/IntSound/title.png'));  // Title image 
  
  // all sounds
  sounds.push(loadSound('../p5games/IntSound/sounds/sound1.wav')); 
  sounds.push(loadSound('../p5games/IntSound/sounds/sound2.wav'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound3.mp3'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound4.mp3'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound5.mp3'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound6.mp3'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound7.mp3'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound8.wav'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound9.wav'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound10.mp3'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound11.wav'));
  sounds.push(loadSound('../p5games/IntSound/sounds/sound12.mp3'));
}

function setup() {
  createCanvas(500, 600);
  
  // Set planet.jpg as the background image
  let planetBackground = images[images.length - 2]; 
  background(planetBackground); 
  
  // Display title
  noSmooth();
  let titleImage = images[images.length - 1];  
  image(titleImage, 15, 30, 470, 200);  
  
  // Square image size
  let size = 70; 
  
  // Calculate the spacing for the images 
  let padding = 20;
  let xOffset = 80;
  let yOffset = 300; 
  let maxColumns = 4; 
  
  // Squares with images and the corresponding sounds
  for (let i = 0; i < images.length - 2; i++) {  
    let x = xOffset + (i % maxColumns) * (size + padding); // x position
    let y = yOffset + Math.floor(i / maxColumns) * (size + padding); // y position
    
    squares.push({
      x: x,
      y: y,
      size: size,
      img: images[i],
      sound: sounds[i % sounds.length],
    });
  }
}

function draw() {
  // Backgournd
  let planetBackground = images[images.length - 2]; 
  background(planetBackground);
  
  // Title
  let titleImage = images[images.length - 1];  // title.png is the last image
  image(titleImage, 15, 30, 470, 200);
  
  // Soundboard Squares
  for (let i = 0; i < squares.length; i++) {
    let sq = squares[i];
    
    // Draw the image inside the square
    image(sq.img, sq.x, sq.y, sq.size, sq.size);
  }

  // Update and draw all the particles for the sparkling bubble effect
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isFinished()) {
      particles.splice(i, 1); // Remove the particle if it's finished
    }
  }
}

// Detect mouse click and check if it is on one of the squares
function mousePressed() {
  for (let i = 0; i < squares.length; i++) {
    let sq = squares[i];
    
    // Check if the mouse click is within the square's bounds
    if (mouseX > sq.x && mouseX < sq.x + sq.size &&
        mouseY > sq.y && mouseY < sq.y + sq.size) {
      // Play the associated sound when clicked
      if (!sq.sound.isPlaying()) {
        sq.sound.play();
      }
    }
  }
}

// Function to create sparkling effect at the cursor position
function mouseMoved() {
  // Create new particle at mouse position
  let p = new Particle(mouseX, mouseY);
  particles.push(p); 
}

// Particle class to simulate the sparkle effect
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);  // Random size for each particle
    this.alpha = 255;  // Full opacity initially
    this.speedX = random(-2, 2);  // Random horizontal speed
    this.speedY = random(-2, 2);  // Random vertical speed
  }

  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 5;  // Fade out the particle
  }

  // the sparkle bubbles
  display() {
    noStroke();
    fill(255, 255, 255, this.alpha);  
    ellipse(this.x, this.y, this.size, this.size);  
  }

 
  isFinished() {
    return this.alpha <= 0;
  }
}
