class Wall {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Check if the player collides with this wall
  collidesWith(player, nextX, nextY) {
    // Assuming the player is rectangular
    return (
      nextX < this.x + this.width &&
      nextX + player.width > this.x &&
      nextY < this.y + this.height &&
      nextY + player.height > this.y
    );
  }

  // Display the wall (for debugging purposes)
  display() {
    noFill(); // 
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
}
