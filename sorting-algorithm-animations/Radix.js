class Radix extends Algorithm {
    
    constructor() {
        super();
        this.vector = [...values];
        this.max = this.getMax();
        this.index = 0;
        this.buckets = Array.from({length: 10}, () => []);
        this.counter = 0;
        this.dumping = -1;
        this.bucketIndex = 0;
    }
    
    step() {
        this.checks++;
        if (this.index < this.max) {
            this.checks++;
            if (this.counter < count) {
                this.swaps++;
                this.buckets[this.getPosition(this.vector[this.counter],this.index)].push(this.vector[this.counter]);
                values = [].concat(...this.buckets);
                this.counter++;
            } else {
                this.vector = [].concat(...this.buckets); 
                values = [].concat(...this.buckets);
                this.buckets = Array.from({length: 10}, () => []);
                this.counter = 0;
                this.index++;
            }
        } else {
            this.complete();
        }
        
    }
    
    getMax() {
        let max = 0;
        for(let num of this.vector){
            if(max < num.toString().length){
                max = num.toString().length;
            }
        }
        return max;
    }
    
    getPosition(num, place) {
        return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    }
    
    
}

function radixSort(arr){
    
    const max = getMax(arr);
    
    for(let i=0;i<max;i++){
        let buckets = Array.from({length:10},()=>[]) // creating 10 empty arrays
        
        for(let j=0;j<arr.length;j++){
            
            buckets[getPosition(arr[j],i)].push(arr[j]); //push the number into desired
            // bucket
        }
        arr = [].concat(...buckets); 
    }
    return arr
}