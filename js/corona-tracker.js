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
