class Scene4 {
  constructor(){
  this.square = {
      x: 220, // X position of the square
      y: 180, // Y position of the square
      width: 200, // Width of the square
      height: 90 // Height of the square
    };
    this.playerInSquare = false; // Track if player is inside the square
    this.walls = [new Wall(0, 200, 600, 20)];
  }
  createWalls() {
    
  }

  // Method when entering Scene4
  enterScene() {
    player.x = width/2;
    player.y = height/2;
    console.log("Entering Scene4");
  }

  // Method when exiting Scene4
  exitScene() {
    console.log("Exiting Scene4");
  }
   keyPressed() {
     if (this.isPlayerInSquare() && key === " ") {
       switchScenes(titleScene);
     }
       
   }

  

  update() {
    // Check for player collision with the square
    this.playerInSquare = this.isPlayerInSquare();

    // If the player is inside the square and spacebar is pressed, switch to EndScene
    if (this.playerInSquare && keyIsPressed && key === ' ') {
      // switchScenes(endScene);  // Switch to Scene2 when spacebar is pressed
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
    background(scene4Background);  
    for (let wall of this.walls) {
      wall.display();
    
    
    push();
    noFill();
    noStroke();
    rect(this.square.x, this.square.y, this.square.width, this.square.height);
    pop();

    push();
    player.update();  // Update player (e.g., movement or animations)
    player.display(1);  // Display player
    pop();
    
    push();
    fill(255);
    textFont(font);
    textSize(25);
    textAlign(CENTER);
    text('Would you like to wake up?', width / 2, 180);
    pop();
  }
  
//   keyPressed() {
    
//   }
}
}