// lol i lowkey forgot to use this scene class. ignore. 

class EndScene {
  constructor() {
    this.square = {
      x: 220, // X position of the square
      y: 180, // Y position of the square
      width: 200, // Width of the square
      height: 90 // Height of the square
    };
    this.playerInSquare = false; // Track if player is inside the square
    this.walls = [new Wall(0, 0, 250, 400)];
  }
  createWalls() {
    
  }

  // Method when entering Title Scene
  enterScene() {
    console.log("Entering TitleScene");
  }

  // Method when exiting Title Scene
  exitScene() {
    console.log("Exiting Title Scene");
  }
   keyPressed() {
     if (this.isPlayerInSquare() && key === " ") {
       switchScenes(titleScene);
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
    background(scene3Background);  
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
    textSize(16);
    textAlign(CENTER);
    text('- t h e  e n d -', width / 2, 380);
    pop();
  }
  
//   keyPressed() {
    
//   }
}
}