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
                axis: 'x',
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
    

    const drawHistoricalChart = async (casesVal, deathsVal, deathsDate, recoveredVal, countryVal) => {
    const getChartElement = document.getElementById('countryChart').getContext('2d');

    if (window.drawHistoricalChart != undefined) {
        window.drawHistoricalChart.destroy();
    }
    window.drawHistoricalChart = new Chart(getChartElement, {
        "type": "line",
        "data": {
            "labels": deathsDate,
            "datasets": [{
                "label": "Cases",
                "data": casesVal,
                "backgroundColor": "rgba(14, 142, 15, 0.1)",
                "borderColor": "rgb(14, 142, 15)",
                "pointStyle": "circle",
                "radius": "0"
    
            }, {
                "label": "Recovered",
                "data": recoveredVal,
                "type": "line",
                "fill": true,
                "backgroundColor": "rgba(54, 162, 235, 0.1)",
                "borderColor": "rgb(54, 162, 235)",
                "pointStyle": "cross"
    
            }, {
                "label": "Deaths",
                "data": deathsVal,
                "type": "line",
                "fill": true,
                "borderJoinStyle": "round",
                "borderColor": "rgb(255, 99, 132)",
                "backgroundColor": "rgba(255, 99, 132, 0.9)",
                "pointStyle": "cross"
    
            }]
        },
        "options": {
            "title": {
                display: true,
                text: `COVID-19 ${countryVal} Statistics (last 6 months)`
            },
            "tooltips": {
                intersect: false,
                mode: 'index',
                axis: 'x',
                "callbacks": {
                    label: function(tooltipItem, data) {
                        return interFormat(tooltipItem.yLabel);
                    }
                }
            },
            
            "scales": {
                "yAxes": [{
                    "gridLines": {
                        display:false
                    },
                    "ticks": {
                        "beginAtZero": true
                    },
                    stacked: false
                }],
                "xAxes": [{
                    "gridLines": {
                        display:false
                    },
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


    const drawOneMillionChart = async (casesVal, deathsVal) => {
        const getChartElement = document.getElementById('countryChart2').getContext('2d');
 
        if (window.countryOneMillion != undefined) {
            window.countryOneMillion.destroy();
        }
        function addText() {

            var canvas = document.getElementById("countryChart2");
            var ctx = document.getElementById("countryChart2").getContext("2d");
          
            var cx = canvas.width / 2;
            var cy = canvas.height / 2;
            var cy1 = canvas.height / 2 -20;
            var cy2 = canvas.height / 2 +20;
          
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#3d3d3d';
            ctx.fillText("Fatality Rate", cx, cy1);
            ctx.fillStyle = "#fdca40";  
            ctx.font = "20px Arial";
            ctx.fillText(`${((deathsVal / casesVal) * 100).toFixed(2)} %`, cx, cy);
            ctx.font = '12px Arial';
            ctx.fillStyle = '#3d3d3d';
            ctx.fillText("From Total Cases", cx, cy2);
          
          }
        window.countryOneMillion = new Chart(getChartElement, {
            "type": "doughnut",

            "data": {
                "labels": ["Cases", "Deaths"],
                "datasets": [{
                    
                    "data": [casesVal, deathsVal],
                    "backgroundColor": ["#3d3d3d30", "rgba(255, 99, 132, 0.9)"],
                    "borderColor": "#9c9c9c30",
        
                }]
            },
            "options": {
                "title": {
                    display: false
                    
                },
                animation:{
                    onProgress : addText
                },
                "legend": {
                    display: false
                },
                "tooltips": false
                

            }
        });
        }

        const drawRecoveryChart = async (casesVal, recoveredVal) => {
            const getChartElement = document.getElementById('countryChart3').getContext('2d');
     
            if (window.countryRecovery != undefined) {
                window.countryRecovery.destroy();
            }
            function addText() {
    
                var canvas = document.getElementById("countryChart3");
                var ctx = document.getElementById("countryChart3").getContext("2d");
              
                var cx = canvas.width / 2;
                var cy = canvas.height / 2;
                var cy1 = canvas.height / 2 -20;
                var cy2 = canvas.height / 2 +20;
              
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '14px Arial';
                ctx.fillStyle = '#3d3d3d';
                ctx.fillText("Recovery Rate", cx, cy1);
                ctx.fillStyle = "#fdca40";  
                ctx.font = "20px Arial";
                ctx.fillText(`${((recoveredVal / casesVal) * 100).toFixed(2)} %`, cx, cy);
                ctx.font = '12px Arial';
                ctx.fillStyle = '#3d3d3d';
                ctx.fillText("From Total Cases", cx, cy2);
              
              }
            window.countryRecovery = new Chart(getChartElement, {
                "type": "doughnut",
    
                "data": {
                    "labels": ["Cases", "Deaths"],
                    "datasets": [{
                        
                        "data": [recoveredVal, casesVal],
                        "backgroundColor": ["#3d3d3d30", "rgba(54, 162, 235, 0.9)"],
                        "borderColor": "#9c9c9c30",
            
                    }]
                },
                "options": {
                    "title": {
                        display: false
                        
                    },
                    animation:{
                        onProgress : addText
                    },
                    "legend": {
                        display: false
                    },
                    "tooltips": false
                    
    
                }
            });
            }