//helper to format numbers
function interFormat(number) {return Intl.NumberFormat('en-US', {style: 'decimal'}).format(number);}

async function getFetch(url, id) {
    const response = await fetch(url);
    if (response.status < 200 || response.status >= 400) {
      throw new Error("Something is wrong with API server!");
    }
    //wait until response
    const data = await response.json();
    //for the received data and push in to the array
    if (!url && !id ) {return};
    if (url && id === 1) {
      let countries = [];
      for (const itsMe in data) {
          countries.push(itsMe, data[itsMe])
      }
      const statsIDs = ["3","15","11","23","17","7"];
      let helperNumber = 0;
      //find the ids and match them.
      ["123","124","125","126","127","128"].forEach(elementID => {
          document.getElementById(elementID)
          .append(interFormat(countries[statsIDs[helperNumber]]));
          helperNumber++
      });
    } else if (url && id === 2) {
      let continentNames = [];
      let continentDeads = [];
      let continentCases = [];
      let continentTests = [];
      for (const itsContinent in data) {
          continentNames.push(data[itsContinent].continent);
          continentDeads.push(data[itsContinent].deaths);
          continentCases.push(data[itsContinent].cases);
          continentTests.push(data[itsContinent].tests);
      }
      let continentDeathsString = Object.keys(data[0])[3];
      drawCharters(continentNames, continentDeads, continentDeathsString, continentCases, continentTests);
    } else if (url && id === 3) {
        let namesVal = [];
        namesVal.push(Object.keys(data));
        let deathsVal = Object.values(data.deaths);
        let casesVal = Object.values(data.cases);
        let recoveredVal = Object.values(data.recovered);
        let deathsDate = []
        let timeFrame = Object.keys(data.deaths);
        const options = {
             year: 'numeric', month: 'long', day: 'numeric'
        }
        timeFrame.forEach(element => {
            getTheDate = new Date(element)
            deathsDate.push(Intl.DateTimeFormat('en-GB', options).format(getTheDate));
        });

        drawCharters2(casesVal, deathsVal, deathsDate, recoveredVal, namesVal);
    }
    
    //return data;
}
getFetch("https://disease.sh/v3/covid-19/all", 1);
getFetch("https://disease.sh/v3/covid-19/continents", 2);
getFetch("https://disease.sh/v3/covid-19/historical/all?lastdays=180", 3);

//data.datasets[0].data.push(40)
//data.labels.push(40)
const drawCharters = (continentName, continentDead, continentDeathsStrn, continentCases, continentTests) => {
const ctx = document.getElementById('myChart');

myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: continentName,
    animateScale: true,
    responsive: true,
    maintainAspectRatio: true,
    datasets: [
        {
            label: "cases",
            data: continentCases,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        },
        {
            label: "tested",
            data: continentTests,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64,  0.8)'
            ]
        },
        {
            label: continentDeathsStrn,
            data: continentDead,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],


            hoverOffset: 4
        }
    ]
    },
    "options": {
        "title": {
            display: true,
            text: "COVID-19 Continent Statistics (infected, tested, deaths)"
        },
        responsive: true,
        legend: {
            position: 'top',
        },
        tooltips: {
            callbacks: {
              label: function(item, data) {
                  return  data.datasets[item.datasetIndex].label+ ": "+ data.labels[item.index]+ ": "+ interFormat(data.datasets[item.datasetIndex].data[item.index]);
                }
            }
        }
    }
});
}
const drawCharters2 = async (casesVal, deathsVal, deathsDate, recoveredVal, namesVal) => {
    // let timeFormat = await getFetch;
    // timeFormat = Intl.DateTimeFormat('en-GB').format(deathsDate);
    // console.log();
const gcx = document.getElementById('gcx');
const mixedChart = new Chart(gcx, {
    "type": "line",
    "data": {
        "labels": deathsDate,
        "datasets": [{
            "label": "Cases",
            "data": casesVal,
            "backgroundColor": "rgba(14, 142, 15, 0.1)",
            "borderColor": "rgb(14, 142, 15)",
            "pointStyle": "cross",

        }, {
            "label": "Recovered",
            "data": recoveredVal,
            "type": "line",
            "fill": true,
            "backgroundColor": "rgba(54, 162, 235, 0.1)",
            "borderColor": "rgb(54, 162, 235)",
            "pointStyle": "cross",

        }, {
            "label": "Deaths",
            "data": deathsVal,
            "type": "line",
            "fill": true,
            "borderJoinStyle": "round",
            "borderColor": "rgb(255, 99, 132)",
            "backgroundColor": "rgba(255, 99, 132, 0.9)",
            "pointStyle": "cross",

        }]
    },
    "options": {
        "title": {
            display: true,
            text: "COVID-19 Worldwide Statistics (last 6 months)"
        },
        "tooltips": {
            intersect: false,
            mode: 'index',
            axis: 'y',
            "callbacks": {
                label: function(tooltipItem, data) {
                    return interFormat(tooltipItem.yLabel);
                }
            }
        },
        
        "scales": {
            "yAxes": [{
                "ticks": {
                    "beginAtZero": true,
                    min: 100000
                },
                stacked: false
            }],
            "xAxes": [{
                ticks: {
                    type: 'time',
                     maxRotation: 0,
                     maxTicksLimit: 8,
                     'time': {
                         displayFormats: {
                             quarter: 'MMM YYYY'
                         }
                     }
                  }
            }]
        }
    }
});
}

