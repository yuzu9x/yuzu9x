class Scene3 {
  constructor() {
    this.square = {
      x: 260, // X position of the square
      y: 180, // Y position of the square
      width: 200, // Width of the square
      height: 200 // Height of the square
    };
    this.playerInSquare = false; // Track if player is inside the square
    this.walls = [new Wall(0, 200, 600, 20), new Wall(260, 180, 100, 150)];
  }
  createWalls() {
    
  }

  // Method when entering Scene3
  enterScene() {
    player.x = 50;
    player.y = 260;
    console.log("Entering Scene3");
  }

  // Method when exiting Scene3
  exitScene() {
    console.log("Exiting Scene3");
  }
   keyPressed() {
     if (this.isPlayerInSquare() && key === " ") {
       switchScenes(scene4);
     }
       
   }

  

  update() {
    // Check for player collision with the square
    this.playerInSquare = this.isPlayerInSquare();

    if (this.playerInSquare && keyIsPressed && key === ' ') {
      
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
    background(scene3Background);  
    for (let wall of this.walls) {
      wall.display();
    
    push();
    fill(255);
    stroke(94, 68, 65);
    textFont(font);
    textSize(20);
    textAlign(CENTER);
    text('Cat of Wisdom', 150, 25);
    pop();
      
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
    textSize(16);
    textAlign(CENTER);
    text('- uhhh idk yet -', width / 2, 380);
    pop();
  }
  
//   keyPressed() {
    
//   }
}
}