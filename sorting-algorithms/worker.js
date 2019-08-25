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
        case Algorithms.Bubble: selectedAlgorithm = BubbleSort; break;
        case Algorithms.Selection: selectedAlgorithm = SelectionSort; break;
        case Algorithms.Insertion: selectedAlgorithm = InsertionSort; break;
        case Algorithms.Shell: selectedAlgorithm = ShellSort; break;
        case Algorithms.Merge: selectedAlgorithm = MergeSort; break;
        case Algorithms.Quick: selectedAlgorithm = QuickSort; break;
    }
    
    beginTime = window.performance.now();
    let sortedVector = selectedAlgorithm(vector);
    endTime = window.performance.now();
    //LogVector(sortedVector);
    
    postMessage({
        duration: Math.floor((endTime - beginTime) * 1000),
        alg: algorithm,
        i: index
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
    if(vector.length <= 1) { return vector; }    
    var { leftHalf, rigthHalf } = SplitList(vector);
    return JointLists(MergeSort(leftHalf), MergeSort(rigthHalf));
}

function SplitList(vector){
    if (vector.length == 0) return {leftHalf : [], rigthHalf: []};
    if (vector.length == 1) return {leftHalf : vector , rigthHalf : []};
    var index = Math.floor(vector.length / 2);
    return {leftHalf : vector.slice(0, index), rigthHalf : vector.slice(index)};
}

function JointLists(vector1, vector2){
    var [result, i, j] = [[], 0, 0];
    while(true){
        if(vector1[i] < vector2[j]){
            result.push(vector1[i]);
            i++;
        } else {
            result.push(vector2[j]);
            j++;
        }
        if(i == vector1.length || j == vector2.length) { break; }
    }
    if(i < vector1.length) return result.concat(vector1.slice(i));
    if(j < vector2.length) return result.concat(vector2.slice(j));
    return result;
}

// End MergeSort

function QuickSort(vector) {
    if (vector.length == 0) { return []; }
    let left = [], right = [], pivot = vector[0];
    for (let i = 1; i < vector.length; i++) {
        if(vector[i] < pivot) {
            left.push(vector[i]);
        } else {
            right.push(vector[i]);
        }
    };
    return [...QuickSort(left), pivot, ...QuickSort(right)];
}