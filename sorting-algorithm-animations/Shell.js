class Shell extends Algorithm {

    constructor() {
        super();
        this.gap = Math.floor(count / 2);
        this.index = this.gap;
        this.temp = values[this.index];
        this.counter = this.index;
    }

    step() {
        this.checks++;
        if (this.gap > 0) {
            this.checks++;
            if (this.index < count) {
                this.checks++;
                if (this.counter >= this.gap && values[this.counter - this.gap] > this.temp) {                    
                    this.swaped = values[this.counter - this.gap];
                    this.swaps++;
                    values[this.counter] = values[this.counter - this.gap];
                    this.counter -= this.gap;
                } else {
                    values[this.counter] = this.temp;
                    this.temp = values[this.index];
                    this.counter = this.index;
                    this.index++;
                }
            } else {
                this.gap = Math.floor(this.gap / 2);
                this.index = this.gap;
            }
        } else {
            this.complete();
        }
    }

}