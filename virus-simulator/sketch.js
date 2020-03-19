let peopleCount = 300;
let infectivity = 0.9;
let lethality = 0.03;
let duration = 500;

let people;

let margin = 100;
let graph = [];
let graphWidth;

function setup() {
    createCanvas(800, 480);

    people = [];
    for (let i = 0; i < peopleCount; i++) {
        people.push(new Person());
    }
    let root = Math.floor(random(peopleCount));
    people[root].status = 'infected';

    graphWidth = width - 165;
}

function draw() {
    background(51);

    for (let i = 0; i < people.length - 1; i++) {
        let a = people[i];
        for (let j = i + 1; j < people.length; j++) {
            let b = people[j];
            a.collide(b);
        }
    }

    let healthyCount = 0;
    let infectedCount = 0;
    let recoveredCount = 0;
    let deadCount = 0;

    for (let person of people) {
        person.update();
        person.paint();

        switch (person.status) {
            case 'healthy': healthyCount++; break;
            case 'infected': infectedCount++; break;
            case 'recovered': recoveredCount++; break;
            case 'dead': deadCount++; break;
        }
    }
    fill(255);
    text('Healthy: ' + healthyCount, 15, height - 75);
    text('Infected: ' + infectedCount, 15, height - 55);
    text('Recovered: ' + recoveredCount, 15, height - 35);
    text('Dead: ' + deadCount, 15, height - 15);

    if (graph.length >= graphWidth) { graph.shift(); }
    graph.push([healthyCount, infectedCount, recoveredCount, deadCount]);

    let left = 150;
    let top = height - margin + 15;
    let barMaxHeight = margin - 30;

    for (let frame of graph) {
        let barTop = top;

        let barHeight = (frame[0] / peopleCount) * barMaxHeight;
        stroke(0,255,0);
        line(left, barTop, left, barTop + barHeight);
        barTop += barHeight;
        
        barHeight = (frame[2] / peopleCount) * barMaxHeight;
        stroke(0,0,255);
        line(left, barTop, left, barTop + barHeight);
        barTop += barHeight;
        
        barHeight = (frame[1] / peopleCount) * barMaxHeight;
        stroke(255,0,0);
        line(left, barTop, left, barTop + barHeight);
        barTop += barHeight;
        
        barHeight = (frame[3] / peopleCount) * barMaxHeight;
        stroke(0,0,0);
        line(left, barTop, left, barTop + barHeight);
        barTop += barHeight;

        left++;        
    }

    if (infectedCount == 0) { noLoop(); }

}