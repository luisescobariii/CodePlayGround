var Algorithms, ResultValues, worker, warnings;

async function RunTests() {
    ResultValues = {};
    warnings = [];
    let input = document.getElementById('inCounts').value.trim();
    Algorithms = {};
    let checks = document.querySelectorAll('input.algorithm').forEach(check => {
        if (check.checked) {
            let name = check.name;
            Algorithms[name] = name;
        }
    });
    if (input != '') {
        ResultValues.counts = input.split(',').map(v => v * 1);
    } else {
        ResultValues.counts = [10000, 40000, 60000, 100000, 400000, 700000, 800000];
    }
    worker = new Worker('worker.js');    
    worker.onmessage = e => {
        let {duration, alg, i, test} = e.data;
        ResultValues[alg][i] = duration;
        if (!test) {
            warnings.push(`${alg} ${i} incorrect`);
        }
        console.clear();
        console.table(ResultValues);
        console.table(FormatResultValues());
        warnings.forEach(w => console.warn(w));
        UpdateChartData();
    };
    
    for (let alg of Object.keys(Algorithms)) {
        ResultValues[alg] = ResultValues.counts.map(c => 0);
    }
    CreateCharts();
    UpdateChartData();
    
    let vectors = ResultValues.counts.map(c => GetShuffledVector(c));
    
    for (let i = 0; i < vectors.length; i++) {
        for (let alg of Object.keys(Algorithms)) {
            worker.postMessage({ vector: vectors[i], alg: alg, i: i });
        }
    }
}

// CHARTS

var Charts, ChartConfigs;

function UpdateChartData() {
    let half = Math.ceil(ResultValues.counts.length / 2);
    
    if (ChartConfigs.shorts.length == ResultValues.counts.length) { half = ResultValues.counts.length; }

    let data = [];
    for (let alg of ChartConfigs.fasts) {
        let values = [];
        for (let i = 0; i < half; i++) {
            values.push(ResultValues[alg][i]);
        }
        data.push({ name: alg, data: values });
    }
    
    Charts[0].updateSeries(data);
    if (Charts.length < 2) { return; }    
    data = [];

    if (!ChartConfigs.splitCounts && ChartConfigs.splitAlgorithms) {
        for (let alg of ChartConfigs.slows) {
            let values = [];
            for (let i = 0; i < half; i++) {
                values.push(ResultValues[alg][i]);
            }
            data.push({ name: alg, data: values });
        }        
    } else {
        for (let alg of ChartConfigs.fasts) {
            let values = [];
            for (let i = half; i < ResultValues.counts.length; i++) {
                values.push(ResultValues[alg][i]);
            }
            data.push({ name: alg, data: values });
        }
    }
    Charts[1].updateSeries(data);
    
    if (Charts.length < 3) { return; }
    
    data = [];
    for (let alg of ChartConfigs.slows) {
        let values = [];
        for (let i = 0; i < half; i++) {
            values.push(ResultValues[alg][i]);
        }
        data.push({ name: alg, data: values });
    }
    Charts[2].updateSeries(data);
    
    data = [];
    for (let alg of ChartConfigs.slows) {
        let values = [];
        for (let i = half; i < ResultValues.counts.length; i++) {
            values.push(ResultValues[alg][i]);
        }
        data.push({ name: alg, data: values });
    }
    Charts[3].updateSeries(data);
}

function CreateCharts() {
    let options = {
        chart: {
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: true,
                endingShape: 'rounded'	
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [],
        yaxis: {
            
        },
        xaxis: {
            categories: [],
            title: {
                text: 'Time (μs)'
            }
        },
        fill: {
            opacity: 1            
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return FormatDuration(val)
                }
            }
        }
    }
    ChartConfigs = {slows: [], fasts: [], shorts: [], longs: []}
    
    let keys = Object.keys(Algorithms);
    let half = Math.ceil(keys.length / 2);
    for (let i = 0; i < keys.length; i++) {
        if (i < half) {
            ChartConfigs.fasts.push(keys[i]);
        } else {
            ChartConfigs.slows.push(keys[i]);
        }
    }    
    let chartClass = '';
    ChartConfigs.splitAlgorithms = document.getElementById('inSplitAlgorithms').checked;
    if (!ChartConfigs.splitAlgorithms) {
        chartClass += 'c';
        ChartConfigs.fasts = [...ChartConfigs.fasts, ...ChartConfigs.slows];
        ChartConfigs.slows = [];
    }
    
    half = Math.ceil(ResultValues.counts.length / 2);
    for (let i = 0; i < ResultValues.counts.length; i++) {
        if (i < half) {
            ChartConfigs.shorts.push(ResultValues.counts[i]);
        } else {
            ChartConfigs.longs.push(ResultValues.counts[i]);
        }
    }
    
    ChartConfigs.splitCounts = document.getElementById('inSplitCounts').checked;
    if (!ChartConfigs.splitCounts) {
        chartClass += 'c';
        ChartConfigs.shorts = [...ChartConfigs.shorts, ...ChartConfigs.longs];
        ChartConfigs.longs = [];
    }

    document.querySelector('body').className = chartClass;
    
    Charts = [];

    options.xaxis.categories = ChartConfigs.shorts;
    Charts.push(new ApexCharts(document.querySelector("#chart0"), options));
    if (ChartConfigs.splitCounts || ChartConfigs.splitAlgorithms) {
        if (ChartConfigs.splitCounts) {
            options.xaxis.categories = ChartConfigs.longs;
            Charts.push(new ApexCharts(document.querySelector("#chart1"), options));
        }
        if (ChartConfigs.splitAlgorithms) {
            options.xaxis.categories = ChartConfigs.shorts;
            Charts.push(new ApexCharts(document.querySelector("#chart2"), options));
            if (ChartConfigs.splitCounts) {
                options.xaxis.categories = ChartConfigs.longs;
                Charts.push(new ApexCharts(document.querySelector("#chart3"), options));
            }
        }
    }
    
    Charts.forEach(c => c.render());
}

// UTILITIES

function FormatDuration(duration) {
    let micros = Math.floor(duration % 1000);
    let millis = Math.floor((duration / 1000) % 1000);
    let seconds = Math.floor((duration / 1000000) % 60);
    let minutes = Math.floor((duration / 60000000) % 60);
    let hours = Math.floor(duration / 3600000000);
    
    let time = `${micros}μs`;
    if (millis > 0) { time = `${millis}ms ${time}`; }
    if (seconds > 0) { time = `${seconds}s ${time}`; }
    if (minutes > 0) { time = `${minutes}m ${time}`; }
    if (hours > 0) { time = `${hours}h ${time}`; }
    
    return time;
}

function LogVector(vector) {
    let visual = [];
    for (let value of vector) {
        let str = Math.floor(value * 100);
        visual.push(str);
    }
    console.log(visual);
}

function GetShuffledVector(len) {
    let vector = [...Array(len).keys()];
    
    for (let i = len - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * i);
        let temp = vector[i];
        vector[i] = vector[rand];
        vector[rand] = temp;
    }
    return vector;
}

function Sleep (time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function FormatResultValues() {
    let result = {};
    for (let key of Object.keys(ResultValues)) {
        if (key == 'counts') {
            result[key] = ResultValues[key];
        } else {
            result[key] = ResultValues[key].map(v => FormatDuration(v));
        }
    }
    return result;
}