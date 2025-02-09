let currentFace = "";
const faces = [':3', ':D', '（＾ω＾） ', ':p', ';-;', 'T_T', '>:3', '>:D', '(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄', '(*´_ゝ｀)', '(◕ㅅ◕✿)', '(≧▽≦)', '乁(ツ)ㄏ'];

function setup() {
    createCanvas(400, 600) .parent("game-container"); 
    
    createCanvas(400, 400);
    textSize(32);
    background(250);
    textAlign(CENTER);

  currentFace = random(faces);
}

function keyPressed() {
  // Change face when a key is pressed
  currentFace = random(faces);
}

function draw() {
  background(250);

  // Display the face
  push();
  textSize(70);
  text(currentFace, width / 2, height / 2);
  pop();

  // Instructions
  push();
  textSize(20);
  text('press any key hehe', 200, 300);
  pop();

  // Brush effect when mouse moves
  push();
  strokeWeight(0);
  fill(255, 212, 241, 70);
  ellipse(mouseX, mouseY, 20);
  pop();
}

function mousePressed() {
  // Clear the drawing when the mouse is pressed
  background(250);
}
