let cities = [];

function setup() {
  createCanvas(700, 700);
  background(0);

  for (let i = 0; i < 10; i++) {
    cities.push(createVector(Math.random() * width, Math.random() * heigth));
  }
}

function draw() {
  stroke(255);
  strokeWeight(4);
  for (let city of cities) {
    ellipse(city.x, city.y, 12);
  }
}