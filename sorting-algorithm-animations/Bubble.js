class Bubble extends Algorithm {

  constructor() {
    super();
    this.iterations = 0;
    this.nSorted = 0;
    this.limit = count;
    this.index = 1;
  }  
  
  iterate() {
    this.index = count;
    this.swaped = -1;
    this.iterations++;
    this.checks++;
    if (this.iterations == -1) { this.complete(); }
  }
  
  step() {
    this.checks++;
    this.iterations = -1;
    if (values[this.index] < values[this.index - 1]) {
      this.swap(this.index - 1, this.index);
      this.iterations = this.index * 1;
    }
    this.index--;    
    this.checks++;
    if (this.index == this.iterations) { this.iterate(); }
  }

  step() {
    if (this.limit > 1) {
      if (this.index < this.limit) {
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

function BubbleSort(vector) {
  vector = [...vector];
  let temp, nSorted = true, n = vector.length;
  while (n > 1) {
      nSorted = false;
      for (let i = 1; i < n; i++) {
          if (vector[i - 1] > vector[i]) {
              // Swap
              temp = vector[i];
              vector[i] = vector[i - 1];
              vector[i - 1] = temp;
              
              nSorted = i;
          }
      }
      n = nSorted;
  }
  return vector;
}