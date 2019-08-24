class Wall {
  
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  render() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
  
  renderCheckpoint() {
    push();
    stroke(255, 0, 0, 32);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
    pop();
  }
  
}