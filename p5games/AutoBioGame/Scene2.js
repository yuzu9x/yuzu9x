class Scene2 {
  constructor() {
    this.square = {
      x: 130, // X position of the square
      y: 140, // Y position of the square
      width: 60, // Width of the square
      height: 90 // Height of the square
    };
    this.playerInSquare = false; // Track if player is inside the square
    this.walls = [new Wall(0, 200, 600, 20), new Wall(350, 260, 30, 60)];
  }
  createWalls() {
    
  }

  // Method when entering Scene2
  enterScene() {
    player.x = 50;
    player.y = 350;
    console.log("Entering Scene2");
  }

  // Method when exiting the Scene2
  exitScene() {
    console.log("Exiting Scene2");
  }
   keyPressed() {
     if (this.isPlayerInSquare() && key === " ") {
       switchScenes(scene3);
     }
   }

  update() {
    // Check for player collision with the square
    this.playerInSquare = this.isPlayerInSquare();

    // If the player is inside the square and spacebar is pressed, switch to Scene2
    if (this.playerInSquare && keyIsPressed && key === ' ') {
      // switchScenes(scene2);  // Switch to Scene2 when spacebar is pressed
    }
  }

  // Check if the player is inside the square
  isPlayerInSquare() {
    return (
      player.x > this.square.x && 
      player.x < this.square.x + this.square.width &&
      player.y > this.square.y && 
      player.y < this.square.y + this.square.height
    );
  }

  display() {
    background(scene2Background); 
    for (let wall of this.walls) {
      wall.display();
    
    push();
    noFill();
    stroke(255);
    rect(this.square.x, this.square.y, this.square.width, this.square.height);
    pop();
    
    
    push();  
    player.update();
    player.display(0.8);
    pop(); 
    
    
    
    // filter
    push();
    fill(56,0,200,20);
    rect(0,0,width,height);
    pop();
    
    push();
    fill(255);
    stroke(94, 68, 65);
    textFont(font);
    textSize(20);
    textAlign(CENTER);
    text('Dream Sector 1: The Portal', 150, 25);
    pop();
    
    push();
    fill(255);
    textFont(font);
    textSize(16);
    textAlign(CENTER);
    text('- e n t e r  t h e  p o r t a l -', width / 2, 380);
    pop();
    
    
  }
}
}