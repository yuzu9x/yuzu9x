let font, font2, font3;
// let canvas1, canvas2, canvas3;
let points2;  
let isInverted = false;
let lastInvertTime = 0;

let Angel1;

function preload() {
    
    font = loadFont('../fonts/Angel wish.ttf');   
    font2 = loadFont('../fonts/King Jola.ttf');   
    font3 = loadFont('../fonts/Ransom.ttf');      
}

function setup() {
  // Angel text with points that gradually float around randomly
  Angel1 = new Angel(50,50,50);

  // Angel text with a reversing gradient effect thing


  // Angel text with color change effect when mouse hovers over it
  

    // First Iteration - Canvas 1
    canvas1 = createCanvas(300, 450);
    canvas1.parent('canvas1');
    background(255); 
    strokeWeight(4);
    stroke(181, 245, 244);
    let points1 = font.textToPoints('Angel', 25, 90, 100, { sampleFactor: 0.3});
    for (let p of points1) {
        point(p.x, p.y);
    }

    // Second Iteration - Canvas 2
    canvas2 = createGraphics(300, 120);
    points2 = font2.textToPoints('Angel', 90, 90, 180, { sampleFactor: 0.6 });
    lastInvertTime = millis();

    // Third Iteration - Canvas 3
    canvas3 = createGraphics(300, 120);
    canvas3.background(255); 
    canvas3.strokeWeight(4);
    let points3 = font3.textToPoints('Angel', 25, 90, 90, { sampleFactor: 0.4});
    for (let p of points3) {
        let fadeAmount = map(p.x, 25, 275, 255, 0);
        canvas3.stroke(fadeAmount, 0, 0);
        canvas3.point(p.x, p.y);
    }
    canvas3.parent('canvas3');  
}

function draw() {
  // Angel Class 1
  Angel1.show();

  class Angel1 {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }

    show() {
      textAlign(CENTER, CENTER);
      textSize(this.size);
      text('angel', this.x, this.y);
    }
  }

    // Timer
    if (millis(200) - lastInvertTime > 500) {
        isInverted = !isInverted;
        lastInvertTime = millis();
    }

    canvas2.background(255); 
    canvas2.strokeWeight(2.5);

    for (let p of points2) {
        let fadeAmount;
        if (p.x < 187.5) {
            fadeAmount = map(p.x, 100, 187.5, 
                isInverted ? 210 : 255,  // Start value
                isInverted ? 255 : 210   // End value
            );
        } else {
            fadeAmount = map(p.x, 140, 275, 
                isInverted ? 255 : 200,  // Start value
                isInverted ? 200 : 255   // End value
            );
        }
        canvas2.stroke(fadeAmount);
        canvas2.point(p.x, p.y);
    }

    
    image(canvas2, 0, 150);  
    image(canvas3, 0, 300);  
}
