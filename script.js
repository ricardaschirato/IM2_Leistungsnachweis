
/*
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
*/

document.addEventListener('DOMContentLoaded', () => {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const guessInput = document.getElementById('guess');
    const submitButton = document.getElementById('submit');
    const newDestinationsButton = document.getElementById('new-destinations');
    const result = document.getElementById('result');
    const scoreValue = document.getElementById('score-value');
    const animation = document.getElementById('animation');
    const sbbLink = document.getElementById('sbb-link');

    let correctDuration;
    let score = 0;
    const cities = ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lugano", "Lucerne", "St. Gallen", "Thun", "Winterthur"];

    function getRandomCity(excludeCity) {
        let city;
        do {
            city = cities[Math.floor(Math.random() * cities.length)];
        } while (city === excludeCity);
        return city;
    }

    async function fetchRoute() {
        try {
            const fromCity = getRandomCity();
            const toCity = getRandomCity(fromCity);
            
            const response = await fetch(`https://transport.opendata.ch/v1/connections?from=${fromCity}&to=${toCity}`);
            const data = await response.json();
            const connections = data.connections;

            if (connections.length > 0) {
                const randomConnection = connections[Math.floor(Math.random() * connections.length)];
                from.textContent = randomConnection.from.station.name;
                to.textContent = randomConnection.to.station.name;
                sbbLink.href = `https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml?nach=${encodeURIComponent(randomConnection.to.station.name)}&von=${encodeURIComponent(randomConnection.from.station.name)}`;
                return randomConnection.duration;
            } else {
                result.textContent = 'Keine Verbindungen gefunden.';
                return null;
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Verbindungen:', error);
            result.textContent = 'Fehler beim Abrufen der Verbindungen.';
            return null;
        }
    }

    function calculateMinutes(duration) {
        const timeParts = duration.split('d');
        let minutes = 0;
        if (timeParts.length > 1) {
            minutes += parseInt(timeParts[0]) * 1440; // days to minutes
            duration = timeParts[1];
        }
        const parts = duration.split(':');
        minutes += parseInt(parts[0]) * 60 + parseInt(parts[1]);
        return minutes;
    }

    function checkGuess(userGuess, correctMinutes) {
        const difference = Math.abs(userGuess - correctMinutes);
        return difference <= 10;
    }

    async function startGame() {
        const duration = await fetchRoute();
        if (duration) {
            correctDuration = calculateMinutes(duration);
            sbbLink.classList.add('hidden');
            result.textContent = '';
            guessInput.value = '';
        }
    }

    submitButton.addEventListener('click', () => {
        const userGuess = parseInt(guessInput.value);
        if (isNaN(userGuess)) {
            result.textContent = 'Bitte geben Sie eine gültige Zahl ein.';
        } else if (checkGuess(userGuess, correctDuration)) {
            score++;
            scoreValue.textContent = score;
            result.textContent = `Richtig! Die Fahrzeit beträgt ${correctDuration} Minuten.`;
            animation.classList.remove('hidden');
            sbbLink.classList.remove('hidden');
            setTimeout(() => {
                animation.classList.add('hidden');
            }, 3000);
        } else {
            result.textContent = `Falsch. Die richtige Fahrzeit beträgt ${correctDuration} Minuten.`;
        }
    });

    newDestinationsButton.addEventListener('click', startGame);

    startGame();
});
