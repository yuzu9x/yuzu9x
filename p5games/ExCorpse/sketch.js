function setup() {
  createCanvas(400, 600).parent("game-container");
}

function draw() {
  background(209, 217, 237);
  
  // division lines
  fill (0);
  line (0,200,400,200);
  line (0,400,400,400);
  
  drawHead(100,100);
  drawTorso(100, 250);
  drawFeet(100, 300);
  
  
}

function drawHead( posX,posY){
  
  // back of hair
  push();
  noStroke();
  fill (247, 245, 131);
  ellipse(200,100, 190,150);
  pop();
  
  // space buns
  push();
  noStroke();
  fill (247, 245, 131);
  ellipse(130, 40, 60, 60);
  ellipse(270, 40, 60, 60);
  pop()
  
  // head
  push();
  noStroke();
  fill (255, 232, 212);
  ellipse (200, 110, 150, 120);
  pop();
  
  // bangs
  push();
  rotate(-50);
  noStroke();
  fill (247, 245, 131);
  ellipse (230, 10, 110, 60);
  pop();
  
  // face
  push();
  fill(0);
  textSize(70);
  text('>_<', 140,140);
  
  //neck
  
  push();
  noStroke();
  fill (255, 232, 212);
  rect (180, 170, 40, 30);
  pop();
}


 function drawTorso(posX, posY){
   push();
   noStroke();
   fill(210, 189, 255);
   rect(120, 200, 160, 200, 30);
   pop();
   
   push();
   noStroke();
   fill(210, 189, 255);
   rect(80, 220, 50, 130, 30);
   rect(270, 220, 50, 130, 30)
   pop();
   
   // hands
   push();
    noStroke();
    fill(255, 232, 212);
    rect(80, 320, 50,50,30);
    rect(270, 320, 50,50,30);
    pop(); 
    
 }

  function drawFeet(posX, posY){
    
    push();
    noStroke();
    fill(255, 163, 64);
    rect(130, 480, 50,50,30);
    rect(220, 480, 50,50,30);
    pop();
    
    push();
    noStroke();
    fill(0);
    rect(120,400,160,100,30);
    pop()
    
    push();
    noStroke();
    fill(255);
    rect(150,400,100,80,30);
    pop()
    
    
  }
