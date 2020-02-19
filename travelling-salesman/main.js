let cities = [];

function setup() {
  createCanvas(700, 700);
  background(0);

  for (let i = 0; i < 10; i++) {
    cities.push(new pVector(Math.random() * width, Math.random() * heigth));
  }
}

function draw() {
  for (let city of cities) {
    ellipse(city.x, city.y, 5);
  }
}