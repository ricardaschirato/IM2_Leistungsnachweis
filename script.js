

document.addEventListener('DOMContentLoaded', () => {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const guessInput = document.getElementById('guess');
    const submitButton = document.getElementById('submit');
    const result = document.getElementById('result');
    const scoreValue = document.getElementById('score-value');
    const animation = document.getElementById('animation');
    const sbbLink = document.getElementById('sbb-link');
    const confettiCanvas = document.getElementById('confetti-canvas');

    let correctDuration;
    let score = 0;
    const stations = ["Zürich HB", "Bern", "Basel SBB", "Luzern", "Genève", "Lausanne", "Lugano", "St. Gallen", "Winterthur", "Thun", "Biel/Bienne", "Schaffhausen"];

    function getRandomStation(excludeStation) {
        let station;
        do {
            station = stations[Math.floor(Math.random() * stations.length)];
        } while (station === excludeStation);
        return station;
    }

    async function fetchRoute() {
        try {
            const fromStation = getRandomStation();
            const toStation = getRandomStation(fromStation);
            
            const response = await fetch(`https://transport.opendata.ch/v1/connections?from=${fromStation}&to=${toStation}&limit=10`);
            const data = await response.json();
            const connections = data.connections;

            if (connections.length > 0) {
                const sortedConnections = connections.sort((a, b) => calculateMinutes(a.duration) - calculateMinutes(b.duration));
                const fastestConnection = sortedConnections[0];
                from.textContent = fastestConnection.from.station.name;
                to.textContent = fastestConnection.to.station.name;
                sbbLink.href = `https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml?nach=${encodeURIComponent(fastestConnection.to.station.name)}&von=${encodeURIComponent(fastestConnection.from.station.name)}`;
                return fastestConnection.duration;
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
        const tolerance = correctMinutes * 0.1; // 10% tolerance
        const difference = Math.abs(userGuess - correctMinutes);
        return difference <= tolerance;
    }

    function showConfetti() {
        const confettiSettings = { target: confettiCanvas };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        confettiCanvas.classList.remove('hidden');
        setTimeout(() => {
            confetti.clear();
            confettiCanvas.classList.add('hidden');
        }, 5000);
    }

    async function startGame() {
        const duration = await fetchRoute();
        if (duration) {
            correctDuration = calculateMinutes(duration);
            sbbLink.classList.add('hidden');
            result.textContent = '';
            guessInput.value = '';
            submitButton.textContent = 'Überprüfen';
        }
    }

    submitButton.addEventListener('click', async () => {
        if (submitButton.textContent === 'Überprüfen') {
            const userGuess = parseInt(guessInput.value);
            if (isNaN(userGuess)) {
                result.textContent = 'Bitte geben Sie eine gültige Zahl ein.';
            } else {
                if (checkGuess(userGuess, correctDuration)) {
                    score++;
                    scoreValue.textContent = score;
                    result.textContent = `Richtig! Die Fahrzeit beträgt ${correctDuration} Minuten.`;
                    animation.classList.remove('hidden');
                    sbbLink.classList.remove('hidden');
                    setTimeout(() => {
                        animation.classList.add('hidden');
                    }, 3000);
                    if (score === 10) {
                        showConfetti();
                    }
                } else {
                    result.textContent = `Falsch. Die richtige Fahrzeit beträgt ${correctDuration} Minuten.`;
                }
                submitButton.textContent = 'Neue Verbindung';
            }
        } else {
            await startGame();
        }
    });

    startGame();
});
