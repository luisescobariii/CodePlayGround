class Insertion extends Algorithm {

    constructor() {
        super();
        this.index = 1;
        this.counter = this.index - 1;
        this.temp = values[this.index];
    }

    step() {
        this.iterations++;
        this.checks++;
        if (this.index < count) {
            this.checks++;
            if (this.counter >= 0 && values[this.counter] > this.temp) {
                this.swaps++;
                this.swaped = values[this.counter];
                values[this.counter + 1] = values[this.counter];
                this.counter--;
            } else {                
                values[this.counter + 1] = this.temp;
                this.index++;
                this.temp = values[this.index];
                this.counter = this.index - 1;
            }
        } else {
            this.complete();
        }
    }

}