class Bubble extends Algorithm {

  constructor() {
    super();
    this.iterations = 0;
  }  
  
  iterate() {
    this.index = count;
    this.swaped = -1;
    this.iterations++;
    this.checks++;
    if (this.iterations == count) { this.complete(); }
  }
  
  step() {
    this.checks++;
    if (values[this.index] < values[this.index - 1]) {
      this.swap(this.index, this.index - 1);
    }
    this.index--;    
    this.checks++;
    if (this.index == this.iterations) { this.iterate(); }
  }  
    
}