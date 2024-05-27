let canvas;
let video;
let handpose;
let detections = [];

function setup(){
  canvas = createCanvas(640, 480);
  canvas.id("canvas");

  video = createCapture(VIDEO);
  video.id("video");
  video.size(width, height);
  video.hide();

  const options = {
    flipHorizontal: true,
  }

  handpose = ml5.handpose(video, options, modelReady);
  colorMode(HSB);
}

function modelReady() {
  console.log("Model ready!");
  handpose.on('predict', results => {
    detections = results;
  });
}

function draw(){
  clear();

  if(detections.length > 0){
    for(let i = 0; i < detections.length; i++){
      drawLines(detections[i], [0, 5, 9, 13, 17, 0]); // palm
      drawLines(detections[i], [0, 1, 2, 3, 4]); // thumb
      drawLines(detections[i], [5, 6, 7, 8]); // index finger
      drawLines(detections[i], [9, 10, 11, 12]); // middle finger
      drawLines(detections[i], [13, 14, 15, 16]); // ring finger
      drawLines(detections[i], [17, 18, 19, 20]); // pinky
    }
  }
}

function drawLines(hand, index){
  stroke(0, 0, 255);
  strokeWeight(10);
  for(let j = 0; j < index.length - 1; j++){
    let x = hand.landmarks[index[j]][0];
    let y = hand.landmarks[index[j]][1];

    let _x = hand.landmarks[index[j + 1]][0];
    let _y = hand.landmarks[index[j + 1]][1];
    line(x, y, _x, _y);
  }
}
