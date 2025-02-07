class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.currentFrame = 0;
    this.frameDelay = 30;
    this.direction = "down"; 
    this.width = frameWidth;  // Assuming you have frameWidth defined
    this.height = frameHeight; // Assuming you have frameHeight defined
  }

  // Update the player's position, check for collisions
  update() {
    let nextX = this.x;
    let nextY = this.y;
    let moving = false;

    // controls
    if (keyIsDown(LEFT_ARROW)) {
      nextX -= this.speed;
      moving = true;
      this.direction = "left";
    }
    if (keyIsDown(RIGHT_ARROW)) {
      nextX += this.speed;
      moving = true;
      this.direction = "right";
    }
    if (keyIsDown(UP_ARROW)) {
      nextY -= this.speed;
      moving = true;
      this.direction = "up";
    }
    if (keyIsDown(DOWN_ARROW)) {
      nextY += this.speed;
      moving = true;
      this.direction = "down";
    }

    // Check for collision before updating position
    if (!this.collidesWithWalls(nextX, nextY)) {
      this.x = nextX;
      this.y = nextY;
      
    }

    // Handle frame animation
    if (moving) {
      frameCount++;
      if (frameCount % this.frameDelay === 0) {
        this.currentFrame = (this.currentFrame + 1) % totalFrames;
      }
    } else {
      this.currentFrame = 0;
    }
  }

  // Check if the player collides with any walls
  collidesWithWalls(nextX, nextY) {
    if (currentScene.walls !== undefined){
      for(let i = 0; i < currentScene.walls.length; i++) {
        let wall = currentScene.walls[i]; 

        if (wall.collidesWith(this, nextX, nextY)) {
          return true;  // Collision detected
        }
      }
    }
    
    return false;  // No collision
  }
  // Display the player's sprite
  display(playerScale = 1) {
    let sprites;

    // sprite movement animation
    if (this.direction === "right") {
      sprites = playerSpritesRight;
    } else if (this.direction === "left") {
      sprites = playerSpritesLeft;
    } else if (this.direction === "up") {
      sprites = playerSpritesUp;
    } else if (this.direction === "down") {
      sprites = playerSpritesDown;
    }

    // Draw the current sprite frame
    if (sprites && sprites[this.currentFrame]) {
      push();
      translate(this.x, this.y);
      scale(playerScale);
      image(
        sprites[this.currentFrame],
        -sprites[this.currentFrame].width / 2, 
        -sprites[this.currentFrame].height / 2
      );
      pop();
    }
  }
}

