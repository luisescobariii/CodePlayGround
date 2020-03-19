class Person {

    constructor() {
        this.diameter = 10;
        this.radius = this.diameter / 2;
        this.speed = 1;
        this.x = random(this.radius, width - this.radius);
        this.y = random(this.radius, height - this.radius - margin);
        this.velocity = p5.Vector.mult(p5.Vector.random2D(), this.speed);
        this.infectionTime = duration;
        this.status = 'healthy';
    }

    update() {
        if (this.status == 'infected') {
            if (this.infectionTime-- <= 0) {
                this.status = (random() > lethality) ? 'recovered' : 'dead';
            }
        } else if (this.status == 'dead') {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        this.move();
    }

    collide(neighbour) {
        let distance = dist(this.x, this.y, neighbour.x, neighbour.y);
        if (distance > this.diameter) { return; }

        let displacement = this.diameter - distance;

        // normal
        let nx = (neighbour.x - this.x) / distance;
        let ny = (neighbour.y - this.y) / distance;

        // tangent
        let tx = -ny;
        let ty = nx;

        // product normal
        let pn1 = this.velocity.x * nx + this.velocity.y * ny;
        let pn2 = neighbour.velocity.x * nx + neighbour.velocity.y * ny;

        // product tangent
        let pt1 = this.velocity.x * tx + this.velocity.y * ty;
        let pt2 = neighbour.velocity.x * tx + neighbour.velocity.y * ty;

        this.velocity.x = tx * pt1 + nx * pn2;
        this.velocity.y = ty * pt1 + ny * pn2;

        neighbour.velocity.x = tx * pt2 + nx * pn1;
        neighbour.velocity.y = ty * pt2 + ny * pn1;

        if (this.status == neighbour.status) { return; }
        if (this.status == 'healthy' || neighbour.status == 'healthy') {            
            if (this.status == 'infected' || neighbour.status == 'infected') {
                if (random() > infectivity) { return; }
                this.status = 'infected';
                neighbour.status = 'infected';
            }
        }
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x - this.radius < 0 || this.x + this.radius > width) {
            this.velocity.x *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > height - margin) {
            this.velocity.y *= -1;
        }
    }

    paint() {
        switch(this.status) {
            case 'healthy': fill(0, 255, 0); break;
            case 'infected': fill(255, 0, 0); break;
            case 'recovered': fill(0, 0, 255); break;
            case 'dead': fill(0, 0, 0); break;
        }
        noStroke();
        circle(this.x, this.y, this.diameter);
    }

}