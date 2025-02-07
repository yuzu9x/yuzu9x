let angle = 0;
let img;
let trails = []; // Array to store the trails


// Import fish image :)
function preload() {
  img = loadImage('p5games/OpIllusion/pixil-frame-0.png', 
    () => console.log('Image loaded successfully'), 
    () => console.error('Failed to load image') // tells me if it worked or not xD
  ); 
}

function setup() {
  noCursor()
  createCanvas(600, 600).parent("testing");
  strokeWeight(4); // Water ripple thickness
}

function draw() {
  background(65, 223, 240); // "water" background
  
  // Repeating spiral animation
  stroke(255);
  
  for (let i = 20; i < 3000; i += 15) {
    push();
    translate(150, 150);
    rotate(i + angle * 2);
    noFill();
    
    // Color of ripples
    stroke(10, i - 100, i * 255);
    ellipse(0, 0, i + 15, i);
    pop();
  
    angle += 0.0007; // The angle once per frame
  }
  
  // Check if the image has loaded
  if (img) {
    image(img, mouseX, mouseY, 80, 80); // Display the image after the spirals
  } else {
    console.log('Image not loaded yet.'); // Debugging message
  }
  
  
  // Update and draw bubble trails
  let currentTime = millis(); // Get the current time
  
  // Loop through the trails array
  for (let i = trails.length - 1; i >= 0; i--) {
    let trail = trails[i];
    
    // Check if the trail is older than 3 seconds
    if (currentTime - trail.time > 2000) {
      trails.splice(i, 1); // Remove it from the array if it’s too old
    } else {
      // Draw the circle
      push()
      strokeWeight(1)
      fill(255, 255, 255, map(currentTime - trail.time, 0, 3000, 255, 0)); // Fade out
      ellipse(trail.x, trail.y, 15, 15); // Draw the circle
      pop()
    }
  }
}

// Capture mouse position and add a new trail
function mouseMoved() {
  trails.push({ x: mouseX, y: mouseY, time: millis() });
  
  // BECOME THE FISH
  push()
  fill(0)
  textSize(10)
  text('BECOME ONE WITH THE FISH.', 300, 300)
  pop()

}