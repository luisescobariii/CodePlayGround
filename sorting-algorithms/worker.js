onmessage = e => {
    let {vector, alg, i} = e.data;
    SortVector(vector, alg, i);
};

/**
* Sorts the given vector in place using the selected algorithm.
* @param {number[]} vector 
* @param {Algorithm} algorithm 
*/
async function SortVector(vector, algorithm, index) {
    let selectedAlgorithm, beginTime, endTime;
    switch (algorithm) {
        case 'Bubble': selectedAlgorithm = BubbleSort; break;
        case 'Selection': selectedAlgorithm = SelectionSort; break;
        case 'Insertion': selectedAlgorithm = InsertionSort; break;
        case 'Shell': selectedAlgorithm = ShellSort; break;
        case 'Merge': selectedAlgorithm = MergeSort; break;
        case 'Quick': selectedAlgorithm = QuickSort; break;
        case 'Default': selectedAlgorithm = DefaultSort; break;
        case 'Radix': selectedAlgorithm = radixSort; break;
    }
    
    beginTime = self.performance.now();
    let sortedVector = selectedAlgorithm(vector);
    endTime = self.performance.now();

    let isCorrect = true;
    /*
    for (let i = 1; i < sortedVector.length; i++) {
        if (sortedVector[i] < sortedVector[i - 1]) {
            isCorrect = false;
            break;
        }
    }
    if (!sortedVector || sortedVector.length == 0) {
        isCorrect = false;
    }
    */
    //LogVector(sortedVector);
    
    postMessage({
        duration: Math.floor((endTime - beginTime) * 1000),
        alg: algorithm,
        i: index,
        test: isCorrect
    });
}

// ALGORITHMS

function BubbleSort(vector) {
    vector = [...vector];
    let temp, nSorted = true, n = vector.length;
    while (n > 1) {
        nSorted = false;
        for (let i = 1; i < n; i++) {
            if (vector[i - 1] > vector[i]) {
                // Swap
                temp = vector[i];
                vector[i] = vector[i - 1];
                vector[i - 1] = temp;
                
                nSorted = i;
            }
        }
        n = nSorted;
    }
    return vector;
}

function SelectionSort(vector) {
    vector = [...vector];
    let temp, n = vector.length;
    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (vector[j] < vector[min]) {
                min = j;
            }
        }        
        if (min != i) {
            // Swap
            temp = vector[i];
            vector[i] = vector[min];
            vector[min] = temp;
        }
    }
    return vector;
}

function InsertionSort(vector) {
    vector = [...vector];
    let temp, j, n = vector.length;
    for (let i = 1; i < n; i++) {
        temp = vector[i];
        for (j = i - 1; j >= 0 && vector[j] > temp; j--) {
            vector[j + 1] = vector[j];
        }
        vector[j + 1] = temp;
    }
    return vector;
}

function ShellSort(vector) {
    vector = [...vector];
    let temp, j, n = vector.length, gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            temp = vector[i];
            for (j = i; j >= gap && vector[j - gap] > temp; j-= gap) {
                vector[j] = vector[j - gap];
            }
            vector[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return vector;
}

// Begin MergeSort

function MergeSort(vector) {
    if(vector.length == 1 ) { return vector; }
  
    let middle = Math.floor(vector.length / 2);
    let left = vector.slice(0, middle);
    let right = vector.slice(middle);
  
    left = MergeSort(left);
    right = MergeSort(right);
      
    return Merge(left, right);
}
  
function Merge(left, right) {
    let vector = [];
    let l = 0;
    let r = 0;
  
    while(l<left.length && r<right.length) {
        if(left[l] > right[r]) {  
            vector.push(right[r]);
            r++;
        } else {
            vector.push(left[l]);
            l++;
        }
    }
    while(l < left.length) {
        vector.push(left[l]);
        l++;
    }
    while(r < right.length) {
        vector.push(right[r]);
        r++;
    }
    return vector;
}

// End MergeSort

function QuickSort(vector) {
    if (vector.length < 2) { return vector; }
    const pivot = vector[Math.floor(Math.random() * vector.length)];

    let left = [];
    let right = [];
    let equal = [];

    for (let value of vector) {
        if (value < pivot) {
            left.push(value);
        } else if (value > pivot) {
            right.push(value);
        } else {
            equal.push(value);
        }
    }
    return [
        ...QuickSort(left),
        ...equal,
        ...QuickSort(right)
    ];
}

  function DefaultSort(vector) {
      return vector.sort((a,b) => a - b);
  }


  function getPosition(num, place){
    return  Math.floor(Math.abs(num)/Math.pow(10,place))% 10
   }   // gives back bucket index  
   
   
   function getMax(arr){
     let max=0;
     for(let num of arr){
       if(max < num.toString().length){
         max = num.toString().length
        }
      }
     return max
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