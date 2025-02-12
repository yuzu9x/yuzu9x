let font;
// let canvas1, canvas2, canvas3;

function preload() {
  font = loadFont('../fonts/ComicSans.ttf');
}

function setup() {
  // First canvas
  // Tried to use CSS Grid and Flexbox to position multiple canvases on the site page, but didn't really work how I wanted it to. Ended up just putting them all on "the same canvas-ish"
  canvas1 = createCanvas(300, 1020);
  canvas1.parent('canvas1');
  background(0);
  strokeWeight(4);
  stroke(255, 0, 0);
  let points1 = font.textToPoints('MOO', 25, 90, 100, { sampleFactor: 0.2});
  for (let p of points1) {
    point(p.x, p.y);
  }

  // Second Iteration 
  canvas2 = createGraphics(300, 120);
  canvas2.background(0);
  c

  // Third Iteration
  canvas3 = createGraphics(300, 120);
  canvas3.background(0);
  canvas3.strokeWeight(4);

  let points3 = font.textToPoints('MOO', 25, 90, 100, { sampleFactor: 0.2});
  for (let p of points3) {
    // Finding midpoint of the text width
    let midpoint = 150;  
    
    // Setting color so if lesser than midpoint value it is red and vice versa
    if (p.x < midpoint) {
        canvas3.stroke(255, 0, 0);  // Red for left half
    } else {
        canvas3.stroke(0, 255, 0);  // Green for right half
    }
    canvas3.point(p.x, p.y);
  }
  canvas3.parent('canvas3');

  // Fouth Iteration
  canvas4 = createGraphics(300, 120);
  canvas4.background(0);

  canvas4.strokeWeight(4);

  strokeWeight(4);
  stroke(255, 0, 0);
  let points4 = font.textToPoints('MOO', 25, 90, 100, { sampleFactor: 0.2});
  for (let p of points1) {
    point(p.x, p.y);
  }
  canvas4.parent('canvas4');

  // I'm tired I dont want to do anymore the iterations are getting scarier T_T 

  }



function draw() {
  // move the graphic lower on the canvas- instead of using CSS grid or flexbox lol
  image(canvas2, 0, 150);  
  image(canvas3, 0, 300);  
  image(canvas4, 0, 450); 
  image(canvas5, 0, 600);
}