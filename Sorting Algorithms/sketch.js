var count = 50;

var values, barWidth, stepHeight, algorithm;

function setup() {
  createCanvas(600, 400);
  frameRate(60);
  initInterface();
  values = [];
  if (count > width) { count = width; }  
  barWidth = width / count;
  stepHeight = height / count;
  for (let i = 1; i <= count; i++) { values.push(i); }
  stroke(0);
}

function draw() {
  background(0);
  strokeWeight(1);
  if (count > width / 3) { noStroke(); }
  for (let i = 0; i < values.length; i++) {
    if (algorithm.swaped == values[i]) { fill(255, 0, 0); }    
    else if (algorithm.index == i) { fill(0, 255, 0); }
    else { fill(255); }
    rect(
      barWidth * i, height - stepHeight * values[i],
      barWidth, stepHeight * values[i]
    );
  }
  
  drawInterface();
  
  if (algorithm.done) {
    noLoop(); return;
  }
  algorithm.step();
}