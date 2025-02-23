// Love Text Prototypes
// NO LONGER USING THIS JS FILE 

let font4, font5, font6;
let points4, points5, points6;
let gradientPhase2 = 0;
let gradientSpeed2 = 0.02;
let resetPoints2 = false;
let floatingAngels2 = [];

function preload() {
    font4 = loadFont('../fonts/Angel wish.ttf');   
    font5 = loadFont('../fonts/kingjola.ttf');   
    font6 = loadFont('../fonts/Ransom.ttf');      
}

function setup() {
    
    canvas4 = createCanvas(300, 450);
    canvas4.parent('canvas4'); 
    points4 = font4.textToPoints('Angel', 55, 90, 100, { sampleFactor: 0.3 });

    canvas5 = createGraphics(300, 120);
    canvas5.parent('canvas5'); 
    points5 = font5.textToPoints('Angel', 80, 85, 130, { sampleFactor: 0.6 });

    canvas6 = createGraphics(300, 150);
    canvas6.parent('canvas6'); 
    
  
    for (let i = 0; i < 6; i++) {
        floatingAngels2.push({
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
    // FIRST ITERATION - Mouse hover makes the word blobby
    background(255);
    canvas4.stroke(181, 245, 244);

    for (let p of points4) {
        let d = dist(mouseX, mouseY, p.x, p.y);
        let maxDist = 30;

        if (d < maxDist) {
            let weight = map(d, 0, maxDist, 20, 3);
            canvas4.strokeWeight(weight);
        } else {
            canvas4.strokeWeight(2);
        }
        point(p.x, p.y);
    }

    // SECOND ITERATION - Gradient Wave animation
    gradientPhase2 += gradientSpeed2;
    let transitionValue = (sin(gradientPhase2) + 1) / 2; 

    canvas5.background(0); 
    canvas5.strokeWeight(2);

    for (let p of points5) {
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
        canvas5.stroke(fadeAmount);
        canvas5.point(p.x, p.y);
    }

    // THIRD ITERATION - Glowing text plus floating words around it
    canvas6.background(216, 199, 235); 

    // Glow effect 
    let glowAmount = (sin(frameCount * 0.05) + 1) * 10;

    // to draw the glow layers
    for (let i = 3; i > 0; i--) {
        let alpha = map(i, 0, 3, 30, 80);
        let glowSize = 3 + (i * 3) + glowAmount;
        canvas6.fill(255, 255, 255, alpha);
        canvas6.noStroke();
        canvas6.textFont(font4);
        canvas6.textSize(glowSize + 70);
        canvas6.textAlign(CENTER, CENTER);
        canvas6.text('Angel', 150, 60);
    }

    // Core text
    canvas6.fill(255, 255, 255, 255);
    canvas6.textSize(90);
    canvas6.textAlign(CENTER, CENTER);
    canvas6.text('Angel', 150, 60);

    // Floating "angel" words
    for (let angel of floatingAngels2) {

        angel.x += angel.speedX;
        angel.y += angel.speedY;

        // Bounce off edges of the canvas
        if (angel.x < 20 || angel.x > 280) angel.speedX *= -1;
        if (angel.y < 20 || angel.y > 130) angel.speedY *= -1;

        // Draw floating text
        canvas6.fill(255, 255, 255, angel.opacity);
        canvas6.textSize(angel.size);
        canvas6.textFont(font4);
        canvas6.text('angel', angel.x, angel.y);
    }

    
    image(canvas4, 0, 0);  
    image(canvas5, 0, 150);  
    image(canvas6, 0, 300);  
}