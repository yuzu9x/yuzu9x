function setup() {

  createCanvas(400, 400).parent("game-container");
  background(126, 113, 145);
  
}

function draw() {
  
  push()
  fill(217, 200, 232)
  strokeWeight(0)
  rect(0,230,400,400)
  
  push()
  
  blendMode(MULTIPLY)
  fill(217, 200, 232)
  strokeWeight(0)
  translate(105,350)
  rotate(50)
  rect(0,0,330,200)
  
  pop()
  

  push();

  fill(230, 224, 190);
  strokeWeight(0);
  
  rect(105,70,190,270);
  rect(125,45,140,320);
  
  circle(130,70,50);
  circle(270,70,50);
  circle(270,340,50);
  circle(130,340,50);
  
  pop();
  
  push()
  
  fill(235, 230, 204);
  strokeWeight(0);
  rect(125,45,150,320);
  
  pop()
  
  push()
  
  
  fill(240, 236, 218);
  strokeWeight(0);
  rect(145,45,110,320);
  
  pop()
  
  push()
  
  fill(247, 245, 237);
  strokeWeight(0);
  rect(160,45,80,320);
  
  pop()
  
  push()
 
  fill(179, 221, 232);
  strokeWeight(2);
  stroke(153, 195, 207)
  rect(120,75,160,250);

  pop()
  
  push()
  
  fill(250, 248, 222);
  strokeWeight(1);
  stroke(189, 185, 143);
  ellipse(200,345,40,10);
  
  pop()
  
  
  push()
  
  strokeWeight(3);
  point(170,60);
  point(180,60);
 
  
  pop()
  
  push()
  
  strokeWeight(10);
  point(220,60);
  
  
  pop()
  
  push()
  

  fill(255)
  translate(130,130)
  textSize(40);
  textStyle(ITALIC)
  text('12:15',15,10);
 
  pop()
  
 
  
  
  
}