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

listItems();