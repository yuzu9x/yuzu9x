// Angel Text Prototypes

let font, font2, font3;
let points1, points2, points3, points4, points5, points6, points7, points8, points9;  
let gradientPhase = 0;
let gradientSpeed = 0.02;
let resetPoints = false;
let floatingAngels = []; 

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

function preload() {
    font = loadFont('../fonts/Angel wish.ttf');   
    font2 = loadFont('../fonts/kingjola.ttf');   
    font3 = loadFont('../fonts/Ransom.ttf');      
}

function setup() {
    // Angel Iterations
    canvas1 = createCanvas(300, 1450); 
    canvas1.parent('canvas1');
    points1 = font.textToPoints('Angel', 55, 90, 100, { sampleFactor: 0.3});

    canvas2 = createGraphics(300, 150);
    points2 = font2.textToPoints('Angel', 80, 85, 130, {sampleFactor: 0.6 });

    canvas3 = createGraphics(300, 250);

    
    // Create floating angels for third it
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

    // Love iterations
    canvas4 = createGraphics(300, 120);
    points4 = font2.textToPoints('Love', 80, 50, 80, {sampleFactor: 0.5 });

    canvas5 = createGraphics(300, 120);
    points5 = font.textToPoints('Love', 80, 85, 100, {sampleFactor: 0.2 });

    canvas6 = createGraphics(300, 120);
    points6 = font2.textToPoints('Love', 80, 85, 130, {sampleFactor: 0.6 });

    // Rose iterations
    canvas7 = createGraphics(300, 120);
    points7 = font2.textToPoints('Rose', 80, 85, 130, {sampleFactor: 0.6 });
    

    canvas8 = createGraphics(300, 120);
    points8 = font2.textToPoints('Rose', 80, 85, 130, {sampleFactor: 0.4 });

    canvas9 = createGraphics(300, 120);
    points9 = font2.textToPoints('Rose', 80, 85, 130, {sampleFactor: 0.2 });
}

function draw() {
    background(0);

    // ANGEL 1
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

    // ANGEL 2
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

    // ANGEL 3
    canvas3.background(0);
    let angelGlow = new GlowingText(canvas3, 'Angel', 60, font);
    angelGlow.applyGlow();

    canvas9.background(0);
    let roseGlow = new GlowingText(canvas9, 'Rose', 60, font);
    roseGlow.applyGlow();

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

    // LOVE 1
    canvas4.background(0); 
    canvas4.strokeWeight(2);

    for (let p of points4) {
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
        canvas4.stroke(fadeAmount);
        canvas4.point(p.x, p.y);
    }

    // LOVE 2
    canvas5.background(0);
    canvas5.strokeWeight(2);

    canvas5.stroke(255, 191, 249);
    for (let p of points5) {
        let d = dist(mouseX, mouseY, p.x, p.y);
        let maxDist = 10;
        
        if (d < maxDist) {
            let weight = map(d, 0, maxDist, 20, 3); // Do I alter this for the effect to apply ?
            canvas5.strokeWeight(weight);
        } else {
            canvas5.strokeWeight(2);
        }
        canvas5.point(p.x, p.y);
    }

    // LOVE 3
    canvas6.background(0);
    let loveGlow = new GlowingText(canvas6, 'Love', 60, font);
    loveGlow.applyGlow();
    
    // ROSE 1
    canvas7.background(0); 
    canvas7.strokeWeight(2);

    for (let p of points7) {
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
        canvas7.stroke(fadeAmount);
        canvas7.point(p.x, p.y);
    }

    // ROSE 2
    canvas8.background(0);
    canvas8.strokeWeight(2);

    canvas8.stroke(255, 191, 249);
    for (let p of points8) {
        let d = dist(mouseX, mouseY, p.x, p.y);
        let maxDist = 30;
        
        if (d < maxDist) {
            let weight = map(d, 0, maxDist, 20, 3); 
            canvas8.strokeWeight(weight);
        } else {
            canvas8.strokeWeight(2);
        }
        canvas8.point(p.x, p.y);

    // ROSE 3
        // canvas9.stroke = (200);

    
    image(canvas2, 0, 150);  
    image(canvas3, 0, 300);  
    
    image(canvas4, 0, 450);  
    image(canvas5, 0, 600);  
    image(canvas6, 0, 750);
    
    image(canvas7, 0, 900);  
    image(canvas8, 0, 1050);  
    image(canvas9, 0, 1200);
} 
}