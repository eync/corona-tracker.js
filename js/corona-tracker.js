//helper to format numbers
function interFormat(number) {return Intl.NumberFormat('en-US', {style: 'decimal'}).format(number);}

let global_countries_list = [];
let countryData = [];
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
        let numbers = document.createElement("div");
        numbers.id = `Stats-${elementID}`;
        let getParent = document.getElementById(elementID);

        getParent
        .appendChild(numbers);
        
        let newParent = document.getElementById(`Stats-${elementID}`);
        let formatted = interFormat(countries[statsIDs[helperNumber]]);
        
          newParent
          .append(formatted);
          helperNumber++
      });
    } else if (url && id === 2) {
      let continentNames = [];
      let continentDeads = [];
      let continentCases = [];
      let continentTests = [];
      for (const itsContinent in data) {
          continentNames
          .push(data[itsContinent].continent);
          continentDeads
          .push(data[itsContinent].deaths);
          continentCases
          .push(data[itsContinent].cases);
          continentTests
          .push(data[itsContinent].tests);
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
            deathsDate
            .push(Intl.DateTimeFormat('en-GB', options).format(getTheDate));
        });

        drawCharters2(casesVal, deathsVal, deathsDate, recoveredVal, namesVal);
    } else if (url && id === 4) {
        const countryData = async () => {
            let countries_list = await data;
            countries_list = [];
             
            data.forEach(elementID => {
                countries_list.push(elementID.country); 
                global_countries_list.push(elementID.country); 
            });
            const findId = document.getElementById('countries');
            
            countries_list.forEach(item => {
                let thecountry = document.createElement('option');
                thecountry.value = item;
                findId
                .appendChild(thecountry);
            });
        }
        countryData();
    }
    
    //return data;
}
getFetch("https://disease.sh/v3/covid-19/all", 1);
getFetch("https://disease.sh/v3/covid-19/continents", 2);
getFetch("https://disease.sh/v3/covid-19/historical/all?lastdays=180", 3);
getFetch("https://disease.sh/v3/covid-19/countries", 4);

async function showCountry(countryName) {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries/${countryName}`);
    
    if (response.status < 200 || response.status >= 400) {
      throw new Error("Something is wrong with API server!");
    }
    //wait until response
    const data = await response.json();
    console.log(data)
    document.getElementById("countryThrow").innerHTML = `

            <h4><img src="${data.countryInfo.flag}" width="10%"> ${data.country}</h4>
            <ul>
                <li>${data.continent}</li>
                <li>Population: ${interFormat(data.population)}</li>
            </ul>
            <hr />
            <ul id="countrystats">
                <li>Total Cases:<br> <div id="Stats-161">${interFormat(data.cases)}</div></li>
                <li>Active Cases: <br> <div id="Stats-162">${interFormat(data.active)}</div></li>
                <li>Recovered: <br> <div id="Stats-163">${interFormat(data.recovered)}</div></li>
                <li>Tested: <br> <div id="Stats-164">${interFormat(data.tests)}</div></li>
                <li>Critical Condition: <br> <div id="Stats-165">${interFormat(data.critical)}</div></li>
                <li>Deaths: <br> <div id="Stats-166">${interFormat(data.deaths)}</div></li>
            </ul>

    
    `;
    // const cData = {
    //     1: data.casesPerOneMillion,
    //     2: data,deathsPerOneMillion,
    //     3: 
    // }
    let casesVal = data.casesPerOneMillion;
    let deathsVal = data.deathsPerOneMillion;
    let testsVal = data.testsPerOneMillion;
    let recoveredVal = data.recoveredPerOneMillion;
    let activeVal = data.activePerOneMillion;
    let criticalVal = data.criticalPerOneMillion;
    console.log(activeVal);
    drawOneMillionChart(casesVal, deathsVal);
    drawRecoveryChart(casesVal, recoveredVal);

}

async function showCountryHistorical(countryName) {
    const response = await fetch(`https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=180`);
    
    if (response.status < 200 || response.status >= 400) {
      throw new Error("Something is wrong with API server!");
    }
    //wait until response
    const data = await response.json();
    let deathsDate = []
    let timeFrame = Object.keys(data.timeline.deaths);
    const options = {
         year: 'numeric', month: 'numeric', day: 'numeric'
    }
    timeFrame.forEach(element => {
        getTheDate = new Date(element)
        deathsDate
        .push(Intl.DateTimeFormat('en-GB', options).format(getTheDate));
    });
    
    const casesVal = Object.values(data.timeline.cases)
    const recoveredVal = Object.values(data.timeline.recovered) 
    const deathsVal = Object.values(data.timeline.deaths)
    const countryVal = data.country;

    drawHistoricalChart(casesVal, deathsVal, deathsDate, recoveredVal, countryVal);
    
}
//data.datasets[0].data.push(40)
//data.labels.push(40)=>
// console.log(
// showCountry("Finland")
// )



document.getElementById('countrySearch')
.addEventListener("submit", e => {
    e.preventDefault();
    let selectedCountry = document.countrySearch.country.value;
    let allowedCharacters = /^[a-zA-Z\s\(|\)\.\']+$/;
    if (selectedCountry.match(allowedCharacters)) {
        if (global_countries_list.includes(selectedCountry)) {
            document.getElementById("accepted").innerHTML = "";
            showCountry(selectedCountry)
            showCountryHistorical(selectedCountry);
            const sh = document.getElementById("CountryStats");
            sh.classList.add('show');
            sh.classList.remove('hide');
        } else {
            return false;
        }
    } else {
        document.getElementById("accepted").innerHTML = "Only allowed letters.";
    }
});