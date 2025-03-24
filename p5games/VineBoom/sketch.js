let handPose;
let video;
let hands = [];
let isBoiPoseDetected = false;
let soundEffect;
// let handPose;


function preload() {
  handPose = ml5.handPose();
}


function setup() {
  createCanvas(640, 480).parent("game-container");

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // handPose = ml5.handPose();
  handPose.detectStart(video, gotHands);

  soundEffect = loadSound('../p5games/VineBoom/vine-boom.mp3'); 
}

function draw() {
  push();

  translate(width, 0);
  //flip video footage
  scale(-1, 1);
  image(video, 0, 0, width, height);
  
  // Check for pose
  if (hands.length > 0) {
    checkForBoiPose(hands[0]);
  } else {
    // if no pose reset it
    isBoiPoseDetected = false;
  }
  
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      // Draw the circles 
      //circle(keypoint.x, keypoint.y, 10);
    }
  }
  
  pop();
  
  
}

function gotHands(results) {
  
  hands = results;
}

function checkForBoiPose(hand) {
  if (!hand.keypoints) return;
  
  // All handpoints and their assigned numbers
  const thumb = hand.keypoints[4];  // Thumb tip
  const index = hand.keypoints[8];  // Index finger tip
  const middle = hand.keypoints[12]; // Middle finger tip
  const ring = hand.keypoints[16];  // Ring finger tip
  const pinky = hand.keypoints[20]; // Pinky tip
  
  const wrist = hand.keypoints[0];  // Wrist
  

  const fingersExtended = 
    index.y < wrist.y - 10 &&
    middle.y < wrist.y - 10 &&
    ring.y < wrist.y - 10 &&
    pinky.y < wrist.y - 10;
  
  // Check if thumb is pointing outward (y-coordinate more than the wrist)
  const thumbOut = Math.abs(thumb.y - wrist.y) > 30;
  
  // Check if fingers are approximately at the same height for flat hand pos.
  const fingersFlat = 
    Math.abs(index.y - middle.y) < 30 &&
    Math.abs(middle.y - ring.y) < 30 &&
    Math.abs(ring.y - pinky.y) < 30;
  
  // Detect the boi pose
  const boiPoseDetected = fingersExtended && thumbOut && fingersFlat;
  
  if (boiPoseDetected && !isBoiPoseDetected) {
    soundEffect.play();
    isBoiPoseDetected = true;
  } else if (!boiPoseDetected) {
    isBoiPoseDetected = false;
  }
  
  
  // Commenting out cuz only necessary for when tampering with code
  //if (boiPoseDetected) {
    // Draw a line from wrist to thumb so I can see if it locks the thumb
  //   stroke(255, 0, 0);
  //   strokeWeight(3);
  //   line(wrist.x, wrist.y, thumb.x, thumb.y);
  //   strokeWeight(1);
  //   noStroke();
   }

