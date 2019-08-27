class Bubble extends Algorithm {

  constructor() {
    super();
    this.nSorted = 0;
    this.limit = count;
    this.index = 1;
  }
  
  step() {
    this.iterations++;
    this.checks++;
    if (this.limit > 1) {
      this.checks++;
      if (this.index < this.limit) {
        this.checks++;
        if (values[this.index - 1] > values[this.index]) {
          this.swap(this.index - 1, this.index);
          this.nSorted = this.index;
        }
        this.index++;
      } else {
        this.limit = this.nSorted;
        this.nSorted = 0;
        this.index = 1;
      }
    } else {
      this.complete();
    }
  }
    
}