class Camera {  
  
  constructor(position, heading, angle, rayCount) {
    if (angle < 0) { angle = 0; }
    if (angle > 360) { angle = 360; }    
    this.position = position;
    
    this.rays = [];    
    const step = angle / rayCount;
    const halfAngle = angle / 2;
    
    for (var a = -halfAngle + (step / 2); a < halfAngle; a += step) {
      this.rays.push(new Ray(position, a));
    }
  }
  
  setDirection(heading) {
    for (let ray of this.rays) { ray.setDirection(heading); }
  }
  
  update(target) {
    for (let ray of this.rays) {
      ray.intersection = null;
      ray.intersectionDist = 100;
    }
    let inputs = [];
    let point = false;
    for (let ray of this.rays) {
      inputs.push(map(ray.update(), 0, 100, 0, 1));
      if (!point) {
        point = ray.cast(track.checkpoints[target], true);
      }
    }
    return { inputs: inputs, point: point };
  }
  
  render() {
    for (let ray of this.rays) { ray.render(); }
  }
  
}