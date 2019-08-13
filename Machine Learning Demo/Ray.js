class Ray {
  
  constructor(start, angle) {
    this.start = start;
    this.angle = angle;
    
    this.direction = p5.Vector.fromAngle(radians(angle));
    this.length = track.halfGirth * 2;
    this.intersection = null;
    this.intersectionDist = this.length;
  }
  
  setDirection(heading) {
    this.direction.set(p5.Vector.fromAngle(radians(this.angle) + heading));
  }
  
  update() {
    for (let wall of track.walls) { this.cast(wall); }
    return this.intersectionDist;
  }
  
  cast(wall, checking = false) {
    // en.wikipedia.org/wiki/Line–line_intersection
    
    const end = {
      x: this.start.x + this.direction.x * this.length,
      y: this.start.y + this.direction.y * this.length
    };    
    const den = (wall.start.x - wall.end.x) * (this.start.y - end.y) - 
                (wall.start.y - wall.end.y) * (this.start.x - end.x);
    
    if (den == 0) { return; }
    
    const t = ((wall.start.x - this.start.x) * (this.start.y - end.y) -
               (wall.start.y - this.start.y) * (this.start.x - end.x)) / den;
    
    const u = ((wall.start.x - wall.end.x) * (wall.start.y - this.start.y) -
               (wall.start.y - wall.end.y) * (wall.start.x - this.start.x)) / -den;
    
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      if (checking) { return true; }
      
      const intersection = {
        x: wall.start.x + t * (wall.end.x - wall.start.x),
        y: wall.start.y + t * (wall.end.y - wall.start.y)
      };
      
      const intersectionDist = dist(
        this.start.x, this.start.y,
        intersection.x, intersection.y
      );
      
      if (intersectionDist < this.intersectionDist) {
        this.intersection = intersection;
        this.intersectionDist = intersectionDist;
      }
    }
    
    return;
  }
  
  render() {
    if (drawSight) {
      stroke(255, 32);
      line(
        this.start.x, this.start.y,
        this.start.x + this.direction.x * this.length,
        this.start.y + this.direction.y * this.length
      );
      if (this.intersection) {  
        ellipse(this.intersection.x, this.intersection.y, 6);
      }
    }
  }
  
}