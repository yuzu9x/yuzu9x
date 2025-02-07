class Scene1 {
  constructor() {
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

  // Method when entering Scene1
  enterScene() {
    player.x = 50;
    player.y = 260;
    console.log("Entering Scene1");
    console.log(this.walls);
  }

  // Method when exiting Scene1
  exitScene() {
    console.log("Exiting Scene1");
  }
   keyPressed() {
     if (this.isPlayerInSquare() && key === " ") {
       switchScenes(scene2);
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
    background(scene1Background);  
    
    for (let wall of this.walls) {
      wall.display();
    }
    
    push();
    noFill();
    noStroke();
    rect(this.square.x, this.square.y, this.square.width, this.square.height);
    pop();

    push();
    player.update();  
    player.display(3); 
    pop();
    
    push();
    fill(255);
    stroke(94, 68, 65);
    textFont(font);
    textSize(20);
    textAlign(CENTER);
    text('The Bedroom', 80, 25);
    pop();
    
    push();
    fill(255);
    stroke(94, 68, 65);
    textFont(font);
    textSize(16);
    textAlign(CENTER);
    text('- g o  t o  s l e e p -', width / 2, 380);
    pop();
  }
  
//   keyPressed() {
    
//   }
}

