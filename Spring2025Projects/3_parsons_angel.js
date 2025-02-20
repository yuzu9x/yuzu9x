let font, font2, font3;
let points1, points2;  
let gradientPhase = 0;
let gradientSpeed = 0.02;
let resetPoints = false;
let floatingAngels = []; 

function preload() {
    font = loadFont('../fonts/Angel wish.ttf');   
    font2 = loadFont('../fonts/kingjola.ttf');   
    font3 = loadFont('../fonts/Ransom.ttf');      
}

function setup() {
    // First iteration 
    canvas1 = createCanvas(300, 450);
    canvas1.parent('canvas1');
    points1 = font.textToPoints('Angel', 55, 90, 100, { sampleFactor: 0.3});

    // Second iteration 
    canvas2 = createGraphics(300, 120);
    points2 = font2.textToPoints('Angel', 80, 85, 130, {sampleFactor: 0.6 });

    // Third iteration 
    canvas3 = createGraphics(300, 150);
    
    // Create floating angels
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

function draw() {
    // FIRST ITERATION - Mouse hover make the word blobby
    background(255);
    stroke(181, 245, 244);
    
    for (let p of points1) {
        let d = dist(mouseX, mouseY, p.x, p.y);
        let maxDist = 30;
        
        if (d < maxDist) {
            let weight = map(d, 0, maxDist, 20, 3);
            strokeWeight(weight);
        } else {
            strokeWeight(2);
        }
        point(p.x, p.y);
    }

    // SECOND ITERATION - Gradient Wave animation thing
    gradientPhase += gradientSpeed;
    let transitionValue = (sin(gradientPhase) + 1) / 2; 
    
    canvas2.background(0); 
    canvas2.strokeWeight(2);

    for (let p of points2) {
        let fadeAmount;
        if (p.x < 187.5) {
            let minVal = 110;
            let maxVal = 255;
            let progress = map(p.x, 100, 187.5, 0, 1);
            let adjustedProgress = lerp(progress, 1-progress, transitionValue);
            fadeAmount = lerp(minVal, maxVal, adjustedProgress);
        } else {
            let minVal = 255;
            let maxVal = 0;
            let progress = map(p.x, 140, 275, 0, 1);
            let adjustedProgress = lerp(progress, 1-progress, transitionValue);
            fadeAmount = lerp(minVal, maxVal, adjustedProgress);
        }
        canvas2.stroke(fadeAmount);
        canvas2.point(p.x, p.y);
    }

    // THIRD ITERATION - Glowing text plus floating words around it
    canvas3.background(216, 199, 235); 
    
    // Glow effect 
    let glowAmount = (sin(frameCount * 0.05) + 1) * 10;
    
    // to draw the glow layers
    for (let i = 3; i > 0; i--) {
        let alpha = map(i, 0, 3, 30, 80);
        let glowSize = 3 + (i * 3) + glowAmount;
        canvas3.fill(255, 255, 255, alpha);
        canvas3.noStroke();
        canvas3.textFont(font);
        canvas3.textSize(glowSize + 70);
        canvas3.textAlign(CENTER, CENTER);
        canvas3.text('Angel', 150, 60);
    }
    
    // Core text
    canvas3.fill(255, 255, 255, 255);
    canvas3.textSize(90);
    canvas3.textAlign(CENTER, CENTER);
    canvas3.text('Angel', 150, 60);
    
    // Floating "angel" words
    for (let angel of floatingAngels) {
        
        angel.x += angel.speedX;
        angel.y += angel.speedY;
        
        // Bounce off edges of the canvas
        if (angel.x < 20 || angel.x > 280) angel.speedX *= -1;
        if (angel.y < 20 || angel.y > 130) angel.speedY *= -1;
        
        // Draw floating text
        canvas3.fill(255, 255, 255, angel.opacity);
        canvas3.textSize(angel.size);
        canvas3.textFont(font3);
        canvas3.text('angel', angel.x, angel.y);
    }
    
   
    image(canvas2, 0, 150);  
    image(canvas3, 0, 300);  
}