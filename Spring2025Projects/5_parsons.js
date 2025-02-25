// Final Text Iterations
let font, font2, font3;
let points1, points2, points3;
let gradientPhase = 0;
let gradientSpeed = 0.01;
let resetPoints = false;
let floatingAngels = [];
let canvas1, canvas2, canvas3;
let particles = [];
let rosePetals = []; 

// Class for ANGEL text to "glow"
class GlowingText {
    constructor(canvas, text, yPos, font) {
        this.canvas = canvas;
        this.text = text;
        this.yPos = yPos;
        this.font = font;
    }
    
    applyGlow() {
        let glowAmount = (sin(frameCount * 0.05) + 1) * 10;
        
        for (let i = 3; i > 0; i--) {
            let alpha = map(i, 0, 3, 30, 80);
            let glowSize = 3 + (i * 3) + glowAmount;
            this.canvas.fill(255, 255, 255, alpha);
            this.canvas.noStroke();
            this.canvas.textFont(this.font);
            this.canvas.textSize(glowSize + 70);
            this.canvas.textAlign(CENTER, CENTER);
            this.canvas.text(this.text, 150, this.yPos);
        }
        
        // Core text
        this.canvas.fill(255, 255, 255, 255);
        this.canvas.textSize(90);
        this.canvas.textAlign(CENTER, CENTER);
        this.canvas.text(this.text, 150, this.yPos);
    }
}

// Particle class for mouse sparkles 
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(5, 15); // Random size for each particle
        this.alpha = 255; // Full opacity initially
        this.speedX = random(-2, 2); // Random horizontal speed
        this.speedY = random(-2, 2); // Random vertical speed
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 5; // Fade out the particle
    }
    
    // the sparkle bubbles
    display() {
        noStroke();
        fill(255, 255, 255, this.alpha);
        ellipse(this.x, this.y, this.size, this.size);
    }
    
    isFinished() {
        return this.alpha <= 0;
    }
}



// Rose Petals class
class RosePetal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(10, 25); // Size of petal
        this.speedY = random(1, 3); // Falling speed
        this.rotation = random(TWO_PI); // Random rotation angle
        this.alpha = 255;
    }
    
    update() {
        this.y += this.speedY; // Make it fall
        this.rotation += 0.01; // Make it rotate
        this.alpha -= 2; // Fade as it falls
    }
    
    display() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        fill(252, 207, 236, this.alpha); 
        ellipse(0, 0, this.size, this.size / 2); 
        pop();
    }
    
    isFinished() {
        return this.alpha <= 0; // If fully faded, remove petal
    }
}

function preload() {
    font = loadFont('../fonts/Angel wish.ttf');
    font2 = loadFont('../fonts/kingjola.ttf');
    font3 = loadFont('../fonts/Ransom.ttf');
}

function setup() {
    canvas1 = createCanvas(500, 650);
    canvas1.parent('canvas1');
    points1 = font.textToPoints('Love', 105, 160, 150, { sampleFactor: 0.5});
    
    canvas2 = createGraphics(450, 500);
    points2 = font2.textToPoints('Rose', 250, 135, 160, { sampleFactor: 0.6 });
    
    canvas3 = createGraphics(300, 200);
    
    // Create floating angels for Angel word
    for (let i = 0; i < 6; i++) {
        floatingAngels.push({
            x: random(50, 250),
            y: random(20, 100),
            size: random(8, 15),
            speedX: random(-0.3, 0.3),
            speedY: random(-0.2, 0.2),
            opacity: random(100, 200)
        });
    }
}

function mouseMoved() {
    // Make sparkle trail following mouse
    let p = new Particle(mouseX, mouseY);
    particles.push(p);
    return false; 
}

function draw() {
    background(0);

    // Update and display all sparkly particles for mouse trail
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.update();
        p.display();
        if (p.isFinished()) {
            particles.splice(i, 1); // Remove the particle if it's finished
        }
    }
    
    // LOVE text with mouse hover effect
for (let p of points1) {
    let d = dist(mouseX, mouseY, p.x, p.y);
    let maxDist = 30;

    strokeWeight(1);  
    stroke(255);  
    
    if (d < maxDist) {
        let expandedSize = map(d, 0, maxDist, 10, 30); 
        fill(252, 207, 236); // Light pink bubble gum-y kinda effect
        noStroke();
        ellipse(p.x, p.y, expandedSize, expandedSize); 
    } else {
        fill(255); // Default color (white)
        noStroke();
       ellipse(p.x, p.y, 4, 4); // Strokeweight essentially
    }

    }
    
    // ROSE text with petal effect
    gradientPhase += gradientSpeed;
    let transitionValue = (sin(gradientPhase) + 1) / 2;
    canvas2.strokeWeight(2);
    
    for (let p of points2) {
        let fadeAmount;
        if (p.x < 187.5) {
            let minVal = 110;
            let maxVal = 255;
            let progress = map(p.x, 100, 187.5, 0, 1);
            let adjustedProgress = lerp(progress, 1 - progress, transitionValue);
            fadeAmount = lerp(minVal, maxVal, adjustedProgress);
        } else {
            let minVal = 255;
            let maxVal = 0;
            let progress = map(p.x, 140, 275, 0, 1);
            let adjustedProgress = lerp(progress, 1 - progress, transitionValue);
            fadeAmount = lerp(minVal, maxVal, adjustedProgress);
        }
        canvas2.stroke(fadeAmount);
        canvas2.point(p.x, p.y);
    }
    
    // Add petals falling around effect
    if (random(1) < 0.5) {
        let petalX = random(50, 450);
        let petalY = random(-50, -10);
        rosePetals.push(new RosePetal(petalX, petalY)); // Add a new petal
    }
    
    for (let i = rosePetals.length - 1; i >= 0; i--) {
        let petal = rosePetals[i];
        petal.update();
        petal.display();
        if (petal.isFinished()) {
            rosePetals.splice(i, 1); // Remove finished petals
        }
    }
    
    // ANGEL text with floating angels
    canvas3.background(0);
    let angelGlow = new GlowingText(canvas3, 'Angel', 100, font);
    angelGlow.applyGlow();
    
    // Floating angel words animation
    for (let angel of floatingAngels) {
        angel.x += angel.speedX;
        angel.y += angel.speedY;
        
        if (angel.x < 20 || angel.x > 280) angel.speedX *= -1;
        if (angel.y < 20 || angel.y > 130) angel.speedY *= -1;
        
        canvas3.fill(255, 255, 255, angel.opacity);
        canvas3.textSize(angel.size);
        canvas3.textFont(font3);
        canvas3.text('angel', angel.x, angel.y);
    }
    
    image(canvas2, 30, 150);
    image(canvas3, 20, 300);
}
