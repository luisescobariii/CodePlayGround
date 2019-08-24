class Track {  
  
  constructor(segments = 36, girth = 60, roughness = 20) {
    this.segments = segments < 3 ? 3 : segments;    
    this.roughness = roughness < 0 ? 0: roughness;    
    
    this.posX = width / 2;
    this.posY = height / 2;
    
    this.step = radians(360 / segments);
    this.halfGirth = girth / 2;
    
    this.update();
  }
  
  update() {
    noiseSeed(random(0, 1000));
    let lastInner;
    let lastOuter;
    let lastEnd;
    let cpCounter = 0;
    this.walls = [];
    this.checkpoints = [];
    
    for (let a = 0; a < TWO_PI; a += this.step) {
      let xoff = map(cos(a), -1, 1, 0, this.roughness);
      let yoff = map(sin(a), -1, 1, 0, this.roughness);
      let r = map(noise(xoff, yoff), 0, 1, this.posY / 2, this.posY);
            
      let inner = {
        x: this.posX + (r - this.halfGirth) * cos(a),
        y: this.posY + (r - this.halfGirth) * sin(a)
      };      
      let outer = {
        x: this.posX + (r + this.halfGirth) * cos(a),
        y: this.posY + (r + this.halfGirth) * sin(a)
      };
      if (a > 0) {
        this.walls.push(new Wall(lastInner, inner));
        this.walls.push(new Wall(lastOuter, outer));
        this.checkpoints.push(new Wall(lastInner, lastOuter));        
        
      } else {
        this.start = {
          x: this.posX + r * cos(a),
          y: this.posY + r * sin(a)
        };        
      }
      lastInner = inner;
      lastOuter = outer;
    }
  }

  render() {
    stroke(0,196,0);
    this.checkpoints[0].render();
    stroke(128);
    for (let wall of this.walls) { wall.render(); }    
  }
  
}
