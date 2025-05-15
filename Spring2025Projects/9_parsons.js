let snowglobe;
let particles = [];
let isDragging = false;
let velocity = { x: 0, y: 0 };
let lastMousePos = { x: 0, y: 0 };
let fadeOutTime = 0;
let hasShaken = false; // Track if the globe has been shaken yet
let particleCount = 600; 
let windowGlowIntensity = 0; 
let messageTimer = 0;
let messageFlashState = false;
let currentMessage = "";


function setup() {

  let canvas = createCanvas(500, 500);
  canvas.parent('game-container'); 


  snowglobe = {
    x: width / 2,
    y: height / 2,
    radius: 150,
    baseHeight: 60,
    baseWidth: 200
  };

  // Create initial particles but don't render them until shaken
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
}

function draw() {

  background(isDragging ? 0 : 255);
  

  if (messageTimer > 0) {
    messageTimer--;
  
    // Toggle flash every 5 frames
    if (frameCount % 10 < 5) {
      messageFlashState = true;
    } else {
      messageFlashState = false;
    }
  
    if (messageFlashState) {
      textAlign(CENTER, CENTER);
      textSize(24);
      fill(255, 0, 0);
      text(currentMessage, width / 2, 30);
    }
  }
  
  if (!isDragging) {
    if (fadeOutTime > 0) {
      fadeOutTime--;
    } else {
      velocity.x *= 0.95;
      velocity.y *= 0.95;
    }
    
    // Gradually reduce window glow when not shaking
    windowGlowIntensity *= 0.95;
  }

  // globe base
  fill(79, 27, 14);

  rectMode(CENTER);
  rect(snowglobe.x, snowglobe.y - 30 + snowglobe.radius + snowglobe.baseHeight/2, snowglobe.baseWidth, snowglobe.baseHeight);

  fill(130);
  rect(snowglobe.x, snowglobe.y + snowglobe.radius + snowglobe.baseHeight/2 - 5, snowglobe.baseWidth * 0.9, 5);

  drawGlassDome();
  drawHouse();

  updateParticles();
}

function showMessage(msg, duration = 120) {
    currentMessage = msg;
    messageTimer = duration;
  }
  

function drawGlassDome() {
  
  push();
  
  // outer rim of the globe
  strokeWeight(6);
  stroke(220);
  fill(255, 255, 255, 30);
  ellipse(snowglobe.x, snowglobe.y, snowglobe.radius * 2, snowglobe.radius * 2);

  noStroke();

  for (let i = 0; i < snowglobe.radius; i++) {
    let alpha = map(i, 0, snowglobe.radius, 5, 30);
    fill(179, 225, 245, alpha);
    ellipse(snowglobe.x, snowglobe.y, (snowglobe.radius - i) * 2, (snowglobe.radius - i) * 2);
  }
  
  // sun
  fill(250, 247, 70, 300);
  ellipse(snowglobe.x - snowglobe.radius/3, snowglobe.y - snowglobe.radius/3, snowglobe.radius/2, snowglobe.radius/2);
  
  pop();
}

function drawHouse() {
  push();
  strokeWeight(1);
  stroke(88);
  translate(0, 40);
  // house
  fill(255, 248, 176); // Brown
  rectMode(CENTER);
  rect(snowglobe.x, snowglobe.y + 20, 80, 60);
  
  // Roof
  push();
  translate(0,10);
  fill(120, 0, 0); // Dark red roof
  
  triangle(
    snowglobe.x - 50, snowglobe.y + 20 - 35, 
    snowglobe.x + 50, snowglobe.y + 20 - 35, 
    snowglobe.x, snowglobe.y + 20 - 70

  );
  pop();
  
  // Door
  fill(60, 30, 15);
  rect(snowglobe.x, snowglobe.y + 20 + 15, 20, 40);

  fill(200, 220, 255);
  rect(snowglobe.x - 25, snowglobe.y + 20, 15, 20);
  rect(snowglobe.x + 25, snowglobe.y + 20, 15, 20);

  // Only draw window glow if the globe is being shaken or recently shaken
  if (windowGlowIntensity > 0.1) {
   
    drawWindowGlow(snowglobe.x - 25, snowglobe.y + 20, 40, 40);
    drawWindowGlow(snowglobe.x + 25, snowglobe.y + 20, 40, 40);
  }
  fill(88, 219, 68);
  ellipse(snowglobe.x, snowglobe.y + 60, snowglobe.radius * 1.4, 30);
  
  pop();
}

// Function to draw the window glow 
function drawWindowGlow(x, y, width, height) {
  noStroke();
  
  for (let i = 0; i < 10; i++) {
    let size = i * 3;
    let alpha = map(i, 0, 10, 150, 0) * windowGlowIntensity;
    fill(255, 0, 0, alpha);
    ellipse(x, y, size, size);
  }

  
}

function createParticle() {
  let angle = random(TWO_PI);
  let distance = random(snowglobe.radius * 0.8); // Keep particles inside
  
  let particle = {
    x: 0,
    y: 0,
    size: random(2, 5),
    angle: angle,
    distance: distance,
    speed: random(0.5, 2),
    velocityX: 0,
    velocityY: 0,
    settling: false 
  };

  resetParticlePosition(particle);
  
  particles.push(particle);
}

function resetParticlePosition(particle) {
  // Position within circle
  particle.x = snowglobe.x + cos(particle.angle) * particle.distance;
  particle.y = snowglobe.y + sin(particle.angle) * particle.distance;

  particle.velocityX = 0;
  particle.velocityY = 0;
  particle.settling = false;
}

function updateParticles() {
  // Only update and draw particles if the globe has been shaken
  if (!hasShaken) return;
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    if (!p.settling) {
      // Add shake effect from dragging
      p.velocityX += velocity.x * 0.08;
      p.velocityY += velocity.y * 0.08;

      p.x += p.velocityX;
      p.y += p.velocityY;

      p.velocityX *= 0.95;
      p.velocityY *= 0.95;
      p.velocityY += 0.025;
      
      // Contain within the globew
      let dx = p.x - snowglobe.x;
      let dy = p.y - snowglobe.y;
      let distance = sqrt(dx*dx + dy*dy);
      
      if (distance > snowglobe.radius - p.size) {
        let angle = atan2(dy, dx);

        p.x = snowglobe.x + cos(angle) * (snowglobe.radius - p.size);
        p.y = snowglobe.y + sin(angle) * (snowglobe.radius - p.size);
        
        let normalX = cos(angle);
        let normalY = sin(angle);
        let dot = p.velocityX * normalX + p.velocityY * normalY;
        
        p.velocityX = p.velocityX - 2 * dot * normalX;
        p.velocityY = p.velocityY - 2 * dot * normalY;
        p.velocityX *= 0.8;
        p.velocityY *= 0.8;
      }

      // Calculate position relative to the bottom of the snowglobe
      let bottomY = snowglobe.y + snowglobe.radius - p.size;
      let snowSurfaceY = snowglobe.y + 60 - p.size;
      
      // Check if particle is near the snow surface and moving slowly
      if (p.y >= snowSurfaceY && Math.abs(p.velocityY) < 0.1 && Math.abs(p.velocityX) < 0.1) {
        p.settling = true;
        
        // Slightly randomize the final resting position
        p.y = snowSurfaceY - random(0, 5);
        p.velocityX = 0;
        p.velocityY = 0;
      }
    }
    
    // Draw the particle
    fill(255, 0, 0);
    noStroke();
    ellipse(p.x, p.y, p.size, p.size);
  }
}

function mousePressed() {
  // Check if the mouse is inside the snowglobe
  let d = dist(mouseX, mouseY, snowglobe.x, snowglobe.y);
  
  if (d < snowglobe.radius) {
    isDragging = true;
    lastMousePos.x = mouseX;
    lastMousePos.y = mouseY;
  }

}

function mouseDragged() {
  if (isDragging) {
    snowglobe.x = mouseX;
    snowglobe.y = mouseY;
    
    // Calculate velocity for shake effect
    velocity.x = mouseX - lastMousePos.x;
    velocity.y = mouseY - lastMousePos.y;
    

    lastMousePos.x = mouseX;
    lastMousePos.y = mouseY;
    

    fadeOutTime = 100;
    
    // Check if the snowglobe has been shaken enough to activate particles
    if (Math.abs(velocity.x) > 3 || Math.abs(velocity.y) > 3) {
        if (!hasShaken) {
          showMessage("THE PEOPLE IN THIS HOUSE ARE RACIST!!!", 100);
        }
        hasShaken = true;
      
      
      // Unsettle particles when shaken vigorously
      if (Math.abs(velocity.x) > 5 || Math.abs(velocity.y) > 5) {
        for (let i = 0; i < particles.length; i++) {
          particles[i].settling = false;
        }
        
        // Increase window glow when shaken
        windowGlowIntensity = 1.0;
      }
    }
    
    return false; // Prevent default behavior like page scrolling
  }
}

function mouseReleased() {
  isDragging = false;
  // Don't return false here, as it might interfere with p5.js event handling
}

// Add touchStarted and touchEnded functions for mobile support
function touchStarted() {
  // Check if the touch is inside the snowglobe
  if (touches.length > 0) {
    let d = dist(touches[0].x, touches[0].y, snowglobe.x, snowglobe.y);
    
    if (d < snowglobe.radius) {
      isDragging = true;
      lastMousePos.x = touches[0].x;
      lastMousePos.y = touches[0].y;
    }
  }
}

function touchMoved() {
  if (isDragging && touches.length > 0) {
    snowglobe.x = touches[0].x;
    snowglobe.y = touches[0].y;
    
    velocity.x = touches[0].x - lastMousePos.x;
    velocity.y = touches[0].y - lastMousePos.y;
    
    lastMousePos.x = touches[0].x;
    lastMousePos.y = touches[0].y;
    
    fadeOutTime = 100;
    
    // Check if the snowglobe has been shaken enough to activate particles
    if (Math.abs(velocity.x) > 3 || Math.abs(velocity.y) > 3) {
      hasShaken = true;
      
      // Unsettle particles when shaken vigorously
      if (Math.abs(velocity.x) > 5 || Math.abs(velocity.y) > 5) {
        for (let i = 0; i < particles.length; i++) {
          particles[i].settling = false;
        }
        
        // Increase window glow when shaken
        windowGlowIntensity = 1.0;
      }
    }
    
    return false; 
  }
}

function touchEnded() {
  isDragging = false;
}