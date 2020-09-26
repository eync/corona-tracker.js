//api
const url = 'https://disease.sh/v3/covid-19/all';

//Array "storage" for pulled data
let countries = [];
const main = async () => {
    //if the API is down or broken, throw error.
    const response = await fetch(url)
    if (response.status < 200 || response.status >= 400) {
      throw new Error("Something is wrong with API server!")
    }
    //wait until response
    const data = await response.json()
    //for the received data and push in to the array
    for (const itsMe in data) {
        countries.push(itsMe, data[itsMe])
        
    }

    return data

  }


const listItems = async () => {
    let parent = await main();
    parent = (x) => {
        switch (x) {
            //no breaks needed so if one matches it will read all of them.
            case 123:
                document.getElementById("123")
                .append(Intl.NumberFormat('en-US', {style: 'decimal'}).format(countries[3]));
                
            case 124:
                document.getElementById("124")
                .append(Intl.NumberFormat('en-US', {style: 'decimal'}).format(countries[15]));
                
            case 125:
                document.getElementById("126")
                .append(Intl.NumberFormat('en-US', {style: 'decimal'}).format(countries[23]));
                
            case 126:
                document.getElementById("125")
                .append(Intl.NumberFormat('en-US', {style: 'decimal'}).format(countries[11]));
                
            case 127:
                document.getElementById("127")
                .append(Intl.NumberFormat('en-US', {style: 'decimal'}).format(countries[17]));
                
            case 128:
                document.getElementById("128")
                .append(Intl.NumberFormat('en-US', {style: 'decimal'}).format(countries[7]));
                break;
            default:
                console.log("none found");

        }
    }
    
    parent(123);
    
    
} 

//data.datasets[0].data.push(40)
//data.labels.push(40)

//TODO wrap these inside function
const url2 = 'https://disease.sh/v3/covid-19/continents';
const url3 = 'https://disease.sh/v3/covid-19/historical/all';

//make one function to work for all of them
const continents = async () => {
    //if the API is down or broken, throw error.
    const response = await fetch(url2)
    if (response.status < 200 || response.status >= 400) {
      throw new Error("Something is wrong with API server!")
    }
    //wait until response
    const data = await response.json();
    //for the received data and push in to the array 
    let continentNames = [];
    let continentDeads = [];
    for (const itsContinent in data) {
        continentNames.push(data[itsContinent].continent);
        continentDeads.push(data[itsContinent].deaths);
        // console.log(JSON.stringify(data[itsContinent].continent, null, 2));
    }
    let continentDeathsString = Object.keys(data[0])[3];
    drawCharters(continentNames, continentDeads, continentDeathsString);
    return data;

  }
  const historicalData = async () => {
    //if the API is down or broken, throw error.
    const response = await fetch(url3)
    if (response.status < 200 || response.status >= 400) {
      throw new Error("Something is wrong with API server!")
    }
    //wait until response
    const data = await response.json();
    //for the received data and push in to the array 
    let namesVal = [];

        namesVal.push(Object.keys(data));
        // console.log(JSON.stringify(itsHD, null, 2));
    let deathsVal = (Object.values(data.deaths));
    let casesVal = (Object.values(data.cases));
    let recoveredVal = (Object.values(data.recovered));
        
    let deathsDate = Object.keys(data.deaths);
    console.log(recoveredVal)
    drawCharters2(casesVal, deathsVal, deathsDate, recoveredVal, namesVal)
    return data;

  }

const drawCharters = (continentName, continentDead, continentDeathsStrn) => {

const ctx = document.getElementById('myChart');

myChart = new Chart(ctx, {
    type: 'doughnut',
data: {
    labels: continentName,
    animateScale: true,
    responsive: true,
    maintainAspectRatio: false,
    datasets: [{
        label: continentDeathsStrn,
        data: continentDead,
        
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        hoverOffset: 4
        
    }]
}

});
}
const drawCharters2 = (casesVal, deathsVal, deathsDate, recoveredVal, namesVal) => {
const gcx = document.getElementById('gcx');
const mixedChart = new Chart(gcx, {
    "type": "line",
    "data": {
        "labels": deathsDate,
        "datasets": [{
            "label": "Deaths",
            "data": deathsVal,
            "borderColor": "rgb(255, 99, 132)",
            "backgroundColor": "rgba(255, 99, 132, 0.5)",
            "pointStyle": "cross",
            "hitRadius": "5",
            "radius": "6",
            "borderWidth":"3"
        }, {
            "label": "Cases",
            "data": casesVal,
            "type": "line",
            "fill": true,
            "backgroundColor": "rgba(54, 162, 235, 0.1)",
            "borderColor": "rgb(54, 162, 235)",
            "pointStyle": "cross",
            "hitRadius": "5",
            "radius": "6",
            "borderWidth":"3"
        }, {
            "label": "Recovered",
            "data": recoveredVal,
            "type": "line",
            "fill": true,
            "borderJoinStyle": "round",
            "backgroundColor": "rgba(14, 142, 15, 0.1)",
            "borderColor": "rgb(14, 142, 15)",
            "pointStyle": "cross",
            "hitRadius": "5",
            "radius": "6",
            "borderWidth":"3"
        }]
    },
    "options": {
        "tooltips": {
            "callbacks": {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }
            }
        },
        "scales": {
            "yAxes": [{
                "ticks": {
                    "beginAtZero": true,
                    min: 100000
                },
                stacked: true
            }]
        }
    }
});
}
historicalData();
continents();
drawCharters();
drawCharters2();
listItems();