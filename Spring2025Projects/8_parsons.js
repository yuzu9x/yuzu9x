let gameState = 'title';

let customCursor;

let teapot, teabag, teacup;
let teapotPos, teabagPos, teacupPos;

let isDraggingTeapot = false;
let isDraggingTeabag = false;

let teapotInCup = false;
let teabagInCup = false;

let hoverStartTime = 0;
let hoverDuration = 0;
let requiredHoverTime = 5;

let quote = "";
let particleSystem = [];
let almendraCss = false;
// API I using
const api_url ="https://api.api-ninjas.com/v1/quotes";

// Pattern types for tea leaves clumps
const PATTERNS = {
    CIRCLE: 'circle',
    SPIRAL: 'spiral',
    LINES: 'lines',
    CLUMPS: 'clumps',
    HEART: 'heart'
};

// Pattern interpretations
const INTERPRETATIONS = {
    [PATTERNS.CIRCLE]: "Circle: A circle in your cup suggests completion and harmony. A goal will soon be achieved.",
    [PATTERNS.SPIRAL]: "Spiral: A spiral suggests a journey of personal growth and transformation ahead.",
    [PATTERNS.LINES]: "Lines: Lines represent pathways and journeys. New opportunities are on the horizon.",
    [PATTERNS.CLUMPS]: "Clusters: Grouped leaves indicate gathering of friends or resources. Connection is coming your way.",
    [PATTERNS.HEART]: "Heart: A heart shape suggests love and emotional fulfillment will arise soon..."
};

// Selected pattern and interpretation
let selectedPattern;
let patternInterpretation = "";

async function getapi(url)
{
  const response = await fetch(url, {
    method: "GET",
       headers: {
        "X-Api-Key": "BdR4WM3KN0eaW3Lck6msAw==ed6jBKk18zy7W2rR"
       },
   });
  var data = await response.json();
  return data;
}

async function fetchQuote() {
    try {
        const data = await getapi(api_url);
        if (data && data.length > 0) {
            let randomQuote = data[Math.floor(Math.random() * data.length)];
            quote = randomQuote.quote || randomQuote.q || "The leaves are quiet today...";
        } else {
            quote = "The leaves are quiet today...";
        }
    } catch (error) {
        console.error("Error fetching quote:", error);
        quote = "The future remains veiled...";
    }

    // Create tea leaves in a random pattern
    createRandomPattern();
}

function preload() {
    almendraFont = loadFont('../fonts/AlmendraDisplay-Regular.ttf');

    customCursor = loadImage('../images/teaReading/silverspoon.png'); //I want to make my cursor a spoon but its not WORKING
}

function setup() {
    let canvas = createCanvas(800, 600);
   
    let container = document.getElementById('game-container');
    if (container) {
        canvas.parent('game-container');
    }
    
    teacupPos = { x: width/2, y: height/2 + 50 };
    teapotPos = { x: width/2 - 200, y: height/2 + 50 }; 
    teabagPos = { x: width/2 + 150, y: height/2 + 50 };
    
    // Create image placeholders for the assets ? Might use actual pics of teacups
    teacup = createTeacupImage();
    teapot = createTeapotImage();
    teabag = createTeabagImage();
    
    textAlign(CENTER, CENTER);
    
    // Add Google Font to use
    if (!almendraCss) {
        let link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Almendra+Display&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        almendraCss = true;
    }
    
    // Custom cursor setup
    noCursor();
}

function draw() {
    background('#e5f0e1');
    
    if (gameState === 'title') {
        drawTitleScreen();
    } else if (gameState === 'preparation') {
        drawPreparationScreen();
    } else if (gameState === 'steeping') {
        drawSteepingScreen();
    } else if (gameState === 'reading') {
        drawReadingScreen();
    }
    
    // Draw custom cursor
    if (customCursor) {
        push();
        imageMode(CENTER);
        image(customCursor, mouseX, mouseY, 40, 40);
        pop();
    }
}

function mousePressed() {
    if (gameState === 'title') {
        // Check if Start button is clicked
        let buttonX = width/2;
        let buttonY = height/2 + 200;
        let buttonWidth = 80;
        let buttonHeight = 80;
        
        if (mouseX > buttonX - buttonWidth/2 && mouseX < buttonX + buttonWidth/2 &&
            mouseY > buttonY - buttonHeight/2 && mouseY < buttonY + buttonHeight/2) {
            gameState = 'preparation';
        }
    } else if (gameState === 'preparation') {
        // Check if teapot is clicked
        if (dist(mouseX, mouseY, teapotPos.x, teapotPos.y) < 50) {
            isDraggingTeapot = true;
        }
        
        // Check if teabag is clicked
        if (dist(mouseX, mouseY, teabagPos.x, teabagPos.y) < 40) {
            isDraggingTeabag = true;
        }
    } else if (gameState === 'reading') {
        // Click anywhere to restart
        gameState = 'title';
        resetGame();
    }
}

function mouseReleased() {
    if (gameState === 'preparation') {
        // Check if teapot is dropped in teacup
        if (isDraggingTeapot && dist(teapotPos.x, teapotPos.y, teacupPos.x, teacupPos.y) < 70) {
            teapotInCup = true;
            teapotPos = { x: teacupPos.x - 20, y: teacupPos.y - 30 };
        }
        
        // Check if teabag is dropped in teacup
        if (isDraggingTeabag && dist(teabagPos.x, teabagPos.y, teacupPos.x, teacupPos.y) < 70) {
            teabagInCup = true;
            teabagPos = { x: teacupPos.x + 20, y: teacupPos.y - 10 };
        }
        
        isDraggingTeapot = false;
        isDraggingTeabag = false;
        
        // Check if both items are in the cup
        if (teapotInCup && teabagInCup) {
            gameState = 'steeping';
            hoverStartTime = millis() / 1000; 
        }
    }
}

function mouseMoved() {
    if (gameState === 'steeping') {
        // Reset hover timer if mouse is not over teacup
        if (dist(mouseX, mouseY, teacupPos.x, teacupPos.y) > 70) {
            hoverStartTime = millis() / 1000;
            hoverDuration = 0;
        } else {
            let currentTime = millis() / 1000;
            hoverDuration = currentTime - hoverStartTime;
            if (hoverDuration >= requiredHoverTime) {
                gameState = 'reading';
                fetchQuote();
            }
        }
    }
}

function mouseDragged() {
    if (gameState === 'preparation') {
        // Move teapot with mouse
        if (isDraggingTeapot) {
            teapotPos.x = mouseX;
            teapotPos.y = mouseY;
        }
        
        // Move teabag with mouse
        if (isDraggingTeabag) {
            teabagPos.x = mouseX;
            teabagPos.y = mouseY;
        }
    }
}

function drawTitleScreen() {
    fill('#4d4c91');
    textSize(80);
    textFont(almendraFont);

    text('Read Your Tea...', width/2, height/2 - 170);
    
    textFont(almendraFont);

    textSize(20);
    text('A Game on Tasseography', width/2, height/2 - 120);
    
    textFont(almendraFont);

    textSize(15);
    text('By Melisa Li', width/2, height/2 - 100);
    
    let buttonX = width/2;
    let buttonY = height/2 + 230;
    let buttonWidth = 80; 
    let buttonHeight = 80; 
    
    fill('#6b6aa6');
    noStroke();
    rectMode(CENTER);
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 45);

    fill('#adace6');
    rect(buttonX, buttonY, buttonWidth-20, buttonHeight-20, 35);
    
    // Button text 
    textFont(almendraFont);

    fill(255);
    textSize(24);
    text('Begin', buttonX, buttonY);
    
    // Draw teacup
    push();
    translate(width/2, height/2 + 20);
    scale(1);
    drawTeacup('#ffffff', '#ffffff');
    
    pop();
}

function drawPreparationScreen() {
    textFont(almendraFont);

    fill('#4d4c91');
    textSize(30);
    text('Prepare Your Tea', width/2, 80);
    
    textFont(almendraFont);

    textSize(18);
    text('Drag the teapot and teabag to the cup', width/2, 120);
    
    // Draw teacup
    push();
    translate(teacupPos.x, teacupPos.y);
    image(teacup, -90, -90, 180, 180); 
    pop();
    
    // Draw teapot
    push();
    translate(teapotPos.x, teapotPos.y);
    image(teapot, -65, -65, 130, 130); 
    pop();
    
    // Draw teabag
    push();
    translate(teabagPos.x + 0, teabagPos.y);
    image(teabag, -50, -50, 100, 100); 
    pop();
}

function drawSteepingScreen() {
    textFont(almendraFont);

    fill('#4d4c91');
    textSize(30);
    text('Steep Your Tea', width/2, 80);
    
    // Instructions 
    textFont(almendraFont);

    textSize(18);
    text('Move your cursor over the teacup to stir. (' + Math.floor(hoverDuration) + '/' + requiredHoverTime + ' seconds)', width/2, 120);
    
    // Progress bar
    let progressWidth = 300;
    let progressHeight = 20;
    let progressX = width/2 ;
    let progressY = 150;
    
    // Background of prog bar
    fill(255);
    rect(progressX, progressY, progressWidth, progressHeight, 10);
    
    // Progress strring bar
    let fillWidth = (hoverDuration / requiredHoverTime) * progressWidth;
    fill('#9fc3d4');
    rect(progressX, progressY, fillWidth, progressHeight, 10);
    
    push();
    translate(teacupPos.x, teacupPos.y);

    noStroke();
    fill(255);
    ellipse(0, 0, 280, 280); 

    fill(255);
    rectMode(CENTER);
    rect(170, 0, 80, 60, 20);

    // Tea inside
    let teaAlpha = map(hoverDuration, 0, requiredHoverTime, 50, 200);
    fill(139, 69, 19, teaAlpha);
    ellipse(0, 0, 220, 220); 
    pop();

    // Initialize particles for tea leaves
    if (particleSystem.length === 0) {
        for (let i = 0; i < 100; i++) {
            particleSystem.push(new Particle(
                teacupPos.x + random(-80, 80),
                teacupPos.y + random(-80, 80),
                teacupPos.x + random(-80, 80),
                teacupPos.y + random(-80, 80)
            ));
        }
    }

    for (let p of particleSystem) {
        p.swirlToMouse();
        p.update();
        p.display();
    }
}

function drawReadingScreen() {
    // Title
    textFont(almendraFont);

    fill('#4d4c91');
    textSize(60);
    text('Your Tea Leaf Reading', width/2, 100);
    
    // Draw teacup
    push();
    translate(teacupPos.x, teacupPos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, 280, 280); 
    
    rectMode(CENTER); 
    fill(255);
    rect(170, 0, 80, 60, 20); 
    fill(139, 69, 19, 100);
    ellipse(0, 0, 220, 220); 
    pop();

    // Display tea leaves in their pattern
    for (let p of particleSystem) {
        p.display();
        p.update();
    }

    // Display the fortune and pattern interpretashun
    if (quote) {
        push();
        textFont(almendraFont);

        fill('#3a2c1f');
        textSize(17);
        textWrap(WORD);

        let quoteBoxY = height - 100;
        let quoteBoxW = 600;

        textAlign(CENTER, CENTER);
        text(quote, width / 2, quoteBoxY, quoteBoxW);
        
        // Display pattern interpretation
        if (patternInterpretation) {
            fill('#4d4c91');
            textSize(20);
            text(patternInterpretation, width / 2, 170, 600);
        }
        pop();
    } else {
        push();
        textFont(almendraFont);

        textSize(14);
        fill('#3a2c1f');
        text("Reading the leaves...", width / 2, height / 2 - 150);
        pop();
    }
    
    // Instructions to replay
    push();
    textFont(almendraFont);
    fill('#4d4c91');
    textSize(16);
    text("Click anywhere to replay!", width / 2, height - 30);
    pop();
}

// FUNCTIONS FOR ALL THE GRAPHICS
function createTeacupImage() { //Teacup during the mixing stage
    let img = createGraphics(150, 150);
    img.background(0, 0); 
    
    // Draw cup
    img.fill(255);
    img.noStroke();
    img.ellipse(75, 75, 120, 70); 
    img.arc(75, 75, 120, 120, 0, PI); 
    
    // Draw handle
    img.noFill();
    img.stroke(255);
    img.strokeWeight(10); 
    img.arc(125, 85, 60, 50, -HALF_PI, HALF_PI); 
    
    // Draw the Inside
    img.fill(200);
    img.ellipse(75, 75, 100, 30);
    
    return img;
}

function createTeapotImage() {
    let img = createGraphics(100, 100);
    img.background(0, 0); 
    // Draw spout

    img.push();
    img.stroke(200);
    img.beginShape();
    img.vertex(15, 55);
    img.vertex(0, 40);
    img.vertex(5, 35);
    img.vertex(80, 60);
    img.endShape(CLOSE);
    img.translate(40,30);
    img.pop();
    // Draw teapot body
    img.fill(255);
    img.noStroke();

    push();
    img.stroke(200);
    img.strokeWeight(1);
    img.ellipse(50, 90, 30, 10);
    pop();

    img.ellipse(50, 60, 65, 60); 
    
    // Draw handle
    img.noFill();
    img.stroke(255);
    img.strokeWeight(8); // Thicker
    img.arc(75, 60, 30, 30, -HALF_PI, HALF_PI); // Larger
    
    // Draw lid
    img.fill(255);
    img.stroke(200);
    img.strokeWeight(1);
    img.ellipse(50, 38, 35, 12); // Larger
    img.ellipse(50, 32, 12, 12); // Larger
    
    return img;
}

function createTeabagImage() {
    let img = createGraphics(80, 80);
    img.background(0, 0); 
    
    // Draw teabag
    img.fill(220, 200, 150);
    img.noStroke();
    img.rect(20, 25, 40, 50, 7); 
    
    // Draw string
    img.stroke(188); 
    img.strokeWeight(2); 
    img.line(40, 25, 40, 5);
    
    // Draw tag
    img.fill(255);
    img.noStroke();
    img.rect(35, 0, 25, 12); // Larger tag
    
    img.fill(180, 130, 100, 100);
    img.noStroke();
    for (let i = 0; i < 20; i++) {
        img.ellipse(25 + random(30), 30 + random(40), 3, 3);
    }
    
    return img;
}

// MAIN TITLE PAGE TEACUP
function drawTeacup(cupColor, bgColor) {
    // Cup base
    fill(255);
    noStroke();
    
    ellipse(0, 0, 250, 90); 
    ellipse(0, 130, 120, 40); 
    arc(0, 0, 250, 250, 0, PI); 
    fill(bgColor);
    noStroke();
    ellipse(-15, -10, 200, 70);
    
    // Handle
    noFill();
    stroke(255);
    strokeWeight(20); 
    arc(100, 40, 100, 90, -HALF_PI, 105); 
    // tea
    fill(214, 174, 141);
    noStroke();
    ellipse(0, 5, 190, 40); 
}

class Particle { //Particle effect for the tea leaves
    constructor(startX, startY, targetX, targetY) {
        this.pos = createVector(startX, startY);
        this.target = createVector(targetX, targetY);
        this.vel = createVector();
        this.acc = createVector();
        this.size = random(3, 6);
        this.maxSpeed = random(1, 3); 
        this.color = color(60, 30, 10, 200); 
        this.arrived = false;
    }
    
    update() {
        if (!this.arrived) {
            let force = p5.Vector.sub(this.target, this.pos);
            let d = force.mag();
            
            if (d < 5) {
                this.arrived = true;
            } else {
                force.normalize();
                force.mult(0.1); 
                this.acc.add(force);
                
                this.vel.add(this.acc);
                this.vel.limit(this.maxSpeed);
                this.pos.add(this.vel);
                this.acc.mult(0);
            }
            
            // Keep the teaparticles inside the tea circle
            let distFromCenter = dist(this.pos.x, this.pos.y, teacupPos.x, teacupPos.y);
            if (distFromCenter > 105) { 
                // I have to reposition the tea
                let toCenter = p5.Vector.sub(createVector(teacupPos.x, teacupPos.y), this.pos);
                toCenter.normalize();
                toCenter.mult(0.5);
                this.vel.add(toCenter);
            }
        }
    }
    
    display() {
        noStroke();
        fill(this.color);
        
        // Draw irregular tea leaf shapes
        push();
        translate(this.pos.x, this.pos.y);
        rotate(frameCount * 0.01 + this.size);
        ellipse(0, 0, this.size * 1.5, this.size * 0.8);
        pop();
    }

    swirlToMouse() { // So tea will follow mouse
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(this.pos, mouse);
        let d = dir.mag();
    
        if (d < 100) { 
            dir.rotate(HALF_PI); 
            dir.setMag(map(d, 0, 100, 2, 0.1)); // Stronger force when closer to cursor
            this.vel.add(dir);
        }
    }
}

// functions for the patterns in tea leaves
function createRandomPattern() {
    // Select a random pattern
    const patternKeys = Object.keys(PATTERNS);
    selectedPattern = PATTERNS[patternKeys[Math.floor(Math.random() * patternKeys.length)]];
    
    // Get the interpretation
    patternInterpretation = INTERPRETATIONS[selectedPattern];
    particleSystem = [];
    switch(selectedPattern) {
        case PATTERNS.CIRCLE:
            createCirclePattern();
            break;
        case PATTERNS.SPIRAL:
            createSpiralPattern();
            break;
        case PATTERNS.LINES:
            createLinesPattern();
            break;
        case PATTERNS.CLUMPS:
            createClumpsPattern();
            break;
        case PATTERNS.HEART:
            createHeartPattern();
            break;
        default:
            createRandomTeaLeaves();
    }
}

function createCirclePattern() {
    const radius = 80;
    const centerX = teacupPos.x;
    const centerY = teacupPos.y;
    
    for (let i = 0; i < 100; i++) {
        const angle = random(0, TWO_PI);
        const r = random(radius - 20, radius);
        const x = centerX + r * cos(angle);
        const y = centerY + r * sin(angle);
        
        particleSystem.push(new Particle(
            centerX + random(-50, 50),
            centerY + random(-50, 50),
            x, y
        ));
    }
}

function createSpiralPattern() {
    const centerX = teacupPos.x;
    const centerY = teacupPos.y;
    
    for (let i = 0; i < 100; i++) {
        const angle = i * 0.2;
        const radius = map(i, 0, 100, 10, 80);
        const x = centerX + radius * cos(angle);
        const y = centerY + radius * sin(angle);
        
        particleSystem.push(new Particle(
            centerX + random(-50, 50),
            centerY + random(-50, 50),
            x, y
        ));
    }
}

function createLinesPattern() {
    const centerX = teacupPos.x;
    const centerY = teacupPos.y;
    
    for (let i = 0; i < 100; i++) {
        let x, y;
        
        if (i < 33) {
            // Horizontal line
            x = centerX + map(i, 0, 33, -80, 80);
            y = centerY - 20;
        } else if (i < 66) {
            // Vertical line
            x = centerX;
            y = centerY + map(i - 33, 0, 33, -80, 80);
        } else {
            // Diagonal line
            const pos = map(i - 66, 0, 34, -60, 60);
            x = centerX + pos;
            y = centerY + pos;
        }
        
        x += random(-5, 5);
        y += random(-5, 5);
        
        particleSystem.push(new Particle(
            centerX + random(-50, 50),
            centerY + random(-50, 50),
            x, y
        ));
    }
}

function createClumpsPattern() {
    const centerX = teacupPos.x;
    const centerY = teacupPos.y;
    
    // Create sum random clumps
    const numClumps = floor(random(3, 5));
    const clumpPositions = [];
    
    for (let i = 0; i < numClumps; i++) {
        const angle = i * (TWO_PI / numClumps);
        const radius = 50;
        clumpPositions.push({
            x: centerX + radius * cos(angle),
            y: centerY + radius * sin(angle)
        });
    }
    
    for (let i = 0; i < 100; i++) {
        const clump = clumpPositions[floor(random(0, numClumps))];
        const x = clump.x + random(-20, 20);
        const y = clump.y + random(-20, 20);
        
        particleSystem.push(new Particle(
            centerX + random(-50, 50),
            centerY + random(-50, 50),
            x, y
        ));
    }
}

function createHeartPattern() {
    const centerX = teacupPos.x;
    const centerY = teacupPos.y;
    
    for (let i = 0; i < 100; i++) {
        let t = map(i, 0, 100, 0, TWO_PI);
        
        // Heart curve parametric equation
        let x = centerX + 60 * pow(sin(t), 3);
        let y = centerY - 45 * cos(t) + 15 * cos(2*t) + 10 * cos(3*t) + 5 * cos(4*t);
        
        x += random(-5, 5);
        y += random(-5, 5);
        
        particleSystem.push(new Particle(
            centerX + random(-50, 50),
            centerY + random(-50, 50),
            x, y
        ));
    }
}

function createRandomTeaLeaves() {
    for (let i = 0; i < 100; i++) {
        particleSystem.push(new Particle(
            teacupPos.x + random(-80, 80),
            teacupPos.y + random(-80, 80),
            teacupPos.x + random(-80, 80),
            teacupPos.y + random(-80, 80)
        ));
    }
}

function resetGame() {
    teapotInCup = false;
    teabagInCup = false;
    isDraggingTeapot = false;
    isDraggingTeabag = false;
    
    teacupPos = { x: width/2, y: height/2 + 50 };
    teapotPos = { x: width/2 - 200, y: height/2 + 50 }; 
    teabagPos = { x: width/2 + 150, y: height/2 + 50 };
    
    hoverStartTime = 0;
    hoverDuration = 0;
    
    quote = "";
    patternInterpretation = "";
    particleSystem = [];
}