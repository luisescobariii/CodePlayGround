let generationCount = 1;
let bestCar;

function nextGeneration() {
  calculateFitness();
  population = [];
  for (let i = 0; i < populationSize; i++) {
    population[i] = naturalSelection();
  }
  printStats();
  parents = [];
}

function printStats() {
  let max = 0;
  let min = Infinity;
  let sum = 0;
  
  for (let parent of parents) {
    sum += parent.score;
    if (parent.score > max) { max = parent.score; bestCar = parent; }
    if (parent.score < min) { min = parent.score; }
  }
  
  let average = Math.round(sum / parents.length);
  console.log({gen: generationCount++, min: min, ave: average, max: max});  
}

function naturalSelection() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - parents[index].fitness;
    index++;
  }
  index--;
  let parent = parents[index];
  let child = new Car(parent.brain);
  child.brain.mutate(mutationRate);
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let parent of parents) { sum += parent.score; }
  for (let parent of parents) { parent.fitness = parent.score / sum; }
}