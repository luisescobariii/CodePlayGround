// Number of cars per generation
const populationSize = 100;

// Chance of mutation
const mutationRate = 0.1;

// Max generation duration in seconds * 30fps
let generationLifespan = 30 * 30;

function setup() {
  //tf.setBackend('cpu');
  frameRate(30);
  createCanvas(700, 700);
  rectMode('center');
  
  track = new Track();
  trackStart = track.start;

  population = [];
  parents = [];
  for (let i = 0; i < populationSize; i++) { population.push(new Car()); }
  
  lifespan = generationLifespan;
  
  createUI();
}

function draw() {
  let simSpeed = speedSlider.value();
  if (hideCars) { simSpeed = 1000; }
  for (var s = 0; s < simSpeed; s++) {
    for (let car of population) {
      car.update();
    }
    for (let i = population.length - 1; i >= 0; i--) {
      if (population[i].crashed && !population[i].recorded) {
        parents.push(population[i]);
        population[i].recorded = true;
      }
    }
    if (parents.length == population.length) {
      lifespan = generationLifespan;
      if (randomizeTrack) { track.update(); }
      nextGeneration();
    }    
    lifespan--;
  }
  if (!hideCars) {
    background(51);
    track.render();
    
    let bestCar = population[0];
    let topScore = 0;
    for (let car of population) {
      if (!car.crashed && car.score > topScore) {
        topScore = car.score;
        bestCar = car;
      }
    }
    
    if (drawBest) {      
      bestCar.render(true);
    } else {
      for (let car of population) {
        if (car == bestCar) {
          car.render(true);
        }
        car.render();
      }
    }
  }
}

let track, trackStart, population, parents, lifespan;
let speedSlider, bestCheck, sightCheck, drawCheck, trackCheck;
let drawBest = false, drawSight = false;
let hideCars = false, randomizeTrack = false;

function createUI() {
  speedSlider = createSlider(1, 30, 1, 1);
  bestCheck = createCheckbox('Best Only', false);
  bestCheck.changed(() => { drawBest = bestCheck.checked(); });
  sightCheck = createCheckbox('Show Sight', false);
  sightCheck.changed(() => { drawSight = sightCheck.checked(); });
  drawCheck = createCheckbox('Evolve ASAP', false);
  drawCheck.changed(() => { hideCars = drawCheck.checked(); });
  trackCheck = createCheckbox('Randomize Track', false);
  trackCheck.changed(() => { randomizeTrack = trackCheck.checked(); });
}