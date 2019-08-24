class Selection extends Algorithm {
  
  constructor() {
    super();
    this.index = 0;
    this.min = Number.MAX_SAFE_INTEGER;
    this.indexMin = 0;
    this.indexCurrent = 0;
  }
  
  step() {
    this.checks++;
    this.index++;
    if (this.index < count) {
      this.checks++;
      if (values[this.index] < this.min) {
        this.min = values[this.index];
        this.indexMin = this.index;
      }
    } else {
      this.iterate();
    }
  }
  
  iterate() {
    this.swap(this.indexCurrent, this.indexMin);
    this.min = Number.MAX_SAFE_INTEGER;
    this.indexCurrent++;
    this.index = this.indexCurrent - 1;
    this.checks++;
    if (this.indexCurrent == count) { this.complete(); return; }
    
  }
  
  
}