let cakeHeight = 50; // Initial height of the cake
let risingSpeed = 1; // speed of cake rising
let maxHeight = 100; // maximum height of the cake
let rising = false; // if the cake is rising

function setup() {
  createCanvas(600, 600).parent("game-container");
  noStroke();
}

function draw() {
  background(213, 245, 236);

  // Draw floor
  fill(125, 62, 29);
  rect (0, 400, 600, 600);
  
  // Draw oven
  fill(255, 209, 228);
  rect(100, 100, 400, 400, 10); 
  rect (130, 50, 335,80, 20)
  
  // shadow
  fill (230, 179, 205)
  rect (130, 90, 335, 10)
  rect ( 150, 150, 300, 30,5)
  rect ( 150, 280, 300, 150, 5)
  
  // Draw oven window
  fill (150, 133, 117);
  rect (150, 200, 300, 210, 5);
  
  // Draw oven rack
  fill (107, 99, 92);
  rect (150, 350, 300, 10);
  
  // Draw oven handle
  push();
  fill (204, 202, 202);
  rect (150, 140, 300, 25, 10);
  pop();
  
  push();
  fill (181, 179, 179);
  rect (150, 140, 30, 25, 10);
  rect (420, 140, 30, 25, 10);
  pop();
  
  // Draw rug
  fill (200, 174, 214)
   ellipse (300,540, 350, 60)

  
  // Draw cake
  fill(235, 185, 131); // color for cake
  rect(220, 350 - cakeHeight, 150, cakeHeight, 230); 
  
  // Draw cake tin
  fill (212, 212, 212)
  rect(210, 300, 170, 50)
  
  // "Press Space to Bake!"
  noStroke()
  fill(225)
  textSize(30)
  
  text ('Press Space to Bake!', 160, 550)

  // If the cake is rising, increase its height
  if (rising) {
    cakeHeight += risingSpeed;
    // Stop rising when it reaches the maximum height
    if (cakeHeight >= maxHeight) {
      cakeHeight = maxHeight;
      rising = false; // Stop rising after reaching max height
    }
    
  }
}

// Function to handle key presses
function keyPressed() {
  if (key === ' ') { // Check if the space bar is pressed
    rising = true; // Start rising
  }
}