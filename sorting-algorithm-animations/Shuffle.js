class Shuffle extends Algorithm {
  
  step() {
    this.checks++;
    if (this.index > 0) {
	  let rand = Math.floor(Math.random() * this.index);
	  this.index--;
      this.swap(this.index, rand)      
	} else {
      this.complete();
    }
  }  
  
  
}