// Function to fetch station board data from the API
async function fetchStationBoard(station, limit) {
    const response = await fetch(`https://transport.opendata.ch/v1/stationboard?station=${station}&limit=${limit}`);
    const data = await response.json();
    return data.stationboard;
}

// Function to save data into an array
async function saveDataToArray(station, limit) {
    const stationBoard = await fetchStationBoard(station, limit);
    const dataArray = [];

    stationBoard.forEach(entry => {
        const { category, number, to, stop } = entry;
        const item = {
            category,
            number,
            to,
            stop: {
                name: stop.name,
                departure: stop.departure
            }
        };
        dataArray.push(item);
    });

    return dataArray;
}

// Call the function with the station "Bern" and limit 10
saveDataToArray('Bern', 10)
    .then(dataArray => {
        dataArray.forEach(entry => {
            console.log(entry.category + entry.number + entry.to  + entry.stop.departure);
        })
        console.log(dataArray); // Output the array to console
        // Do whatever you want with the dataArray here
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });