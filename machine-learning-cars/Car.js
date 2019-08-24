class Car {
  
  constructor(brain = null) {
    this.position = createVector(track.start.x, track.start.y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.heading = 0;
    
    this.camera = new Camera(this.position, this.heading, 120, 3);
    this.brain = brain ? brain.copy() :
      new NeuralNetwork(this.camera.rays.length + 1, 12, 2);
    
    this.width = 15;
    this.height = 8;
    this.crashed = false;
    this.timer = 30;
    this.score = 0;
    this.target = 1;    
    this.color = 0;
    
  }  
  
  update() {
    if (this.crashed) { return; }
    
    this.camera.setDirection(this.heading);
    let result = this.camera.update(this.target);
    
    if (result.point) {
      this.score += this.timer;
      this.timer = 30;
      if (++this.target == track.checkpoints.length) { this.target = 0; }
    }
    
    for (let dist of result.inputs) {
      if (dist < 0.07) { this.crashed = true; }
    }
    
    result.inputs.push(map(this.velocity.mag(), -5, 5, 0, 1));
    let output = this.brain.predict(result.inputs);
    let angle = map(output[0], 0, 1, -QUARTER_PI, QUARTER_PI);
    let torque = map(output[1], 0, 1, -20, 20);    
    let steering = p5.Vector.fromAngle(angle + this.heading);
    steering.setMag(torque);
    steering.sub(this.velocity);
    this.acceleration.add(steering);
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);    
    this.heading = this.velocity.heading();
    
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
    if (this.timer-- < 0 || lifespan < 0) { this.crashed = true; }
  }

  render(best = false) {
    if (this.crashed) {
      fill(128, 64);
      stroke(128, 128);
    } else {
      if (best) {
        fill(0, 255, 255, 196);
        stroke(0, 255, 255);
      } else {
        fill(255, 64);
        stroke(255, 128);
      }
      this.camera.render();
      
      if (drawSight) {
        track.checkpoints[this.target].renderCheckpoint();
      }
    }
    push();
    translate(this.position.x, this.position.y);
    rotate(this.heading);
    rect(0, 0, this.width, this.height);
    pop();
  }
  
}