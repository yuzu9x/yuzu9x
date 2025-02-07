 class TitleScene {
  constructor() {
    
    this.square = {
      x: 340, // X position of the square
      y: 110, // Y position of the square
      width: 40, // Width of the square
      height: 40 // Height of the square
    };
    this.playerInSquare = false; // Track if player is inside the square
    this.walls = [new Wall(0, 0, 250, 400), new Wall(235, 250, 30, 50), new Wall(235, 40, 100, 200), new Wall(425, 40, 100, 200), new Wall(415, 250, 100, 200), new Wall(290, 80, 100, 50)];
  }
   
   createWalls() {
    
  }

  // Method when entering the TitleScene
  enterScene() {
    player.x = width/2;
    player.y = 290;
    console.log("Entering Title Scene");
  }

  // Method when exiting the TitleScene
  exitScene() {
    console.log("Exiting Title Scene");
  }
   keyPressed() {
     if (this.isPlayerInSquare() && key === " ") {
       switchScenes(scene1); 
     }
   }

  
  update() {

  }

  // check if the player is inside the square
  isPlayerInSquare() {
    return (
      player.x > this.square.x && 
      player.x < this.square.x + this.square.width &&
      player.y > this.square.y && 
      player.y < this.square.y + this.square.height
    );
  }

  
  display() {
    
    
    
    background(titleSceneBackground);
    for (let wall of this.walls) {
      wall.display();
  
    // Draw the square the player can walk into
    noFill();
    noStroke();
    rect(this.square.x, this.square.y, this.square.width, this.square.height);
    

    
    push();  
    player.update();
    player.display(0.8);
    pop(); 
    
    // filter
    // push();
    // fill(56,0,200,20);
    // rect(0,0,width,height);
    // pop();
    
    // image(titleText, width / 6, 290);
    image(arrowKeys, 40, 50);
    image(spaceBar, 40, 160);
    
    push();
    fill(255);
    textFont(font);
    textSize(35);
    textAlign(CENTER);
    text('Meows of Wisdom...', width / 2, 355);
    pop();
    
    push();
    fill(255);
    textFont(font);
    textSize(16);
    textAlign(CENTER);
    text('- e n t e r  h o m e - ', width / 2, 385);
    pop();
    
    }
  
}
 }