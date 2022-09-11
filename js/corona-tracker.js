let global_countries_list = [];
let countryData = [];

//helper to format numbers
function interFormat(number) {return Intl.NumberFormat('en-US', {style: 'decimal'}).format(number);}

const checkQueryID = async function (id, data) {
    const dataSet = await data;
    switch (id) {
        case "all": await allData(dataSet)
            break;
        case "continents": await allContinentData(dataSet)
            break;
        case "historical/all?lastdays=180": await historicalData(dataSet)
            break;
        case "countries": await countriesData(dataSet)
            break;
        default: throw new Error(`Invalid query ID "${id}"`);
    }
}


const historicalData = async (data) => {
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
        let getTheDate = new Date(element)
        deathsDate
            .push(Intl.DateTimeFormat('en-GB', options).format(getTheDate));
    });
    return drawCharters2(casesVal, deathsVal, deathsDate, recoveredVal, namesVal);
}

const allContinentData = async (data) => {
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
}

const allData = async (data) => {
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
}

const countriesData = async (data) => {
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

const getFetch = async function(query, callbacks = false) {
    const response = await fetch(`https://disease.sh/v3/covid-19/${query}`);
    if (response.status < 200 || response.status >= 400) {
        throw new Error("Something is wrong with API server!");
    }
    if (callbacks === true) {
        return await checkQueryID(query, await response.json())
    }
    return await response.json();
}

const multipleEndpointFetch = async function(...query) {
    return [...query].forEach(item => getFetch(item, true))
}

multipleEndpointFetch("all", "continents", "historical/all?lastdays=180", "countries")

const showCountry = async function (countryName) {
    const response = await getFetch(`countries/${countryName}`);
    const data = await response;
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
    let casesVal = data.casesPerOneMillion;
    let deathsVal = data.deathsPerOneMillion;
    let testsVal = data.testsPerOneMillion;
    let recoveredVal = data.recoveredPerOneMillion;
    let activeVal = data.activePerOneMillion;
    let criticalVal = data.criticalPerOneMillion;
    drawOneMillionChart(casesVal, deathsVal);
    drawRecoveryChart(casesVal, recoveredVal);

}

async function showCountryHistorical(countryName) {
    const response = await getFetch(`historical/${countryName}?lastdays=180`);

    const data = await response;
    let deathsDate = []
    let timeFrame = Object.keys(data.timeline.deaths);
    const options = {
        year: 'numeric', month: 'numeric', day: 'numeric'
    }
    timeFrame.forEach(element => {
        let getTheDate = new Date(element)
        deathsDate
            .push(Intl.DateTimeFormat('en-GB', options).format(getTheDate));
    });

    const casesVal = Object.values(data.timeline.cases)
    const recoveredVal = Object.values(data.timeline.recovered)
    const deathsVal = Object.values(data.timeline.deaths)
    const countryVal = data.country;

    await drawHistoricalChart(casesVal, deathsVal, deathsDate, recoveredVal, countryVal);

}

window.addEventListener('pageshow', function() {
    console.log('popstate');
});

console.log(showCountry("Finland"))

document.getElementById('countrySearch')
    .addEventListener("submit", event => {
        event.preventDefault();
        let selectedCountry = document.countrySearch.country.value;
        let allowedCharacters = /^[a-zA-Z\s\(|\)\.\']+$/;
        if (selectedCountry.match(allowedCharacters)) {
            if (global_countries_list.includes(selectedCountry)) {
                window.history.replaceState( {} , "", `?country=${selectedCountry}` );
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