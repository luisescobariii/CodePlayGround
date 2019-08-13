class Algorithm {
  
  constructor() {
    this.done = false;
    this.index = count;
    this.swapped = -1;
    this.swaps = 0;
    this.checks = 0;
    this.begin = new Date();
  }
  
  step() {
    throw 'Not implemented';
  }
  
  complete() {
    this.done = true;
  }
  
  swap(i, j){
    this.swaped = values[i];
    this.swaps++;
    values[i] = values[j];
    values[j] = this.swaped;
  }
  
}