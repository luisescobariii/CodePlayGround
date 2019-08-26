var btnShuffle, btnBubble;

function initInterface() {
  textSize(30);
  algorithm = { done: true, swaps: 0, checks: 0, begin: new Date() };
  btnShuffle = createButton('Shuffle');
  btnShuffle.mousePressed(() => changeAlgorithm('Shuffle'));
  btnShuffle = createButton('Bubble');
  btnShuffle.mousePressed(() => changeAlgorithm('Bubble'));
  btnShuffle = createButton('Selection');
  btnShuffle.mousePressed(() => changeAlgorithm('Selection'));
  btnShuffle = createButton('Insertion');
  btnShuffle.mousePressed(() => changeAlgorithm('Insertion'));
  btnShuffle = createButton('Shell');
  btnShuffle.mousePressed(() => changeAlgorithm('Shell'));
  btnShuffle = createButton('Radix');
  btnShuffle.mousePressed(() => changeAlgorithm('Radix'));
  btnShuffle = createButton('Quick');
  btnShuffle.mousePressed(() => changeAlgorithm('Quick'));
}

function changeAlgorithm(name) {
  switch(name) {
    case 'Shuffle': algorithm = new Shuffle(); break;
    case 'Bubble': algorithm = new Bubble(); break;
    case 'Selection': algorithm = new Selection(); break;
    case 'Quick': algorithm = new Quick(); break;
    case 'Shell': algorithm = new Shell(); break;
    case 'Radix': algorithm = new Radix(); break;
    case 'Insertion': algorithm = new Insertion(); break;
  }
  loop();
}

function drawInterface() {  
  fill(255);
  stroke(0);
  strokeWeight(5);
  text(`Checks: ${algorithm.checks}`, 10, 30);
  text(`Swaps: ${algorithm.swaps}`, 10, 60);
  let duration = new Date(new Date().getTime() - algorithm.begin.getTime());
  let minutes = duration.getMinutes().toString().padStart(2, '0');
  let seconds = duration.getSeconds().toString().padStart(2, '0');
  let millis = duration.getMilliseconds().toString().padStart(3, '0');
  text(`Time: ${minutes}:${seconds}.${millis}`, 10, 90);
}