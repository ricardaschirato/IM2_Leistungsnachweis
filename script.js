document.addEventListener('DOMContentLoaded', () => {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const guessInput = document.getElementById('guess');
    const submitButton = document.getElementById('submit');
    const result = document.getElementById('result');
    const scoreValue = document.getElementById('score-value');
    const animation = document.getElementById('animation');
    const sbbLink = document.getElementById('sbb-link');
    const restartButton = document.getElementById('restart');
    
    let correctDuration;
    let score = 0;
    const stations = [
            "Zürich HB", "Bern", "Basel SBB", "Lausanne", "Genève", "Luzern", "Winterthur", "St. Gallen", "Lugano", "Biel/Bienne",
            "Thun", "Schaffhausen", "Fribourg", "Chur", "Aarau", "Neuchâtel", "La Chaux-de-Fonds", "Olten", "Zug", "Uster",
            "Yverdon-les-Bains", "Sion", "Rapperswil", "Bulle", "Bellinzona", "Wil", "Sierre/Siders", "Frauenfeld", "Kreuzlingen",
            "Liestal", "Baden", "Langenthal", "Solothurn", "Davos Platz", "Vevey", "Montreux", "Zofingen", "Wetzikon", "Gossau",
            "Einsiedeln", "Locarno", "Wettingen", "Payerne", "Burgdorf", "Brugg", "Dietikon", "Affoltern am Albis", "Glarus",
            "Aigle", "St-Maurice"
        ];

    let usedStations = [];

    // Funktion zur Auswahl einer zufälligen Station, die noch nicht verwendet wurde
    function getRandomStation(excludeStation) {
        let station;
        do {
            station = stations[Math.floor(Math.random() * stations.length)];
        } while (station === excludeStation || usedStations.includes(station));
        usedStations.push(station);
        if (usedStations.length > stations.length / 2) {
            usedStations.shift(); // Entfernt das erste Element, um den Pool zu aktualisieren
        }
        return station;
    }

    // Funktion zum Abrufen der Route und zur Auswahl der schnellsten Verbindung
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

    // Funktion zur Berechnung der Minuten aus der Dauerangabe
    function calculateMinutes(duration) {
        const timeParts = duration.split('d');
        let minutes = 0;
        if (timeParts.length > 1) {
            minutes += parseInt(timeParts[0]) * 1440; // Tage in Minuten umrechnen
            duration = timeParts[1];
        }
        const parts = duration.split(':');
        minutes += parseInt(parts[0]) * 60 + parseInt(parts[1]);
        return minutes;
    }

    // Funktion zum Überprüfen des Benutzer-Rates
    function checkGuess(userGuess, correctMinutes) {
        const tolerance = correctMinutes * 0.1; // 10% Toleranz
        const difference = Math.abs(userGuess - correctMinutes);
        return difference <= tolerance;
    }

    // Funktion zum Anzeigen des Konfetti-GIFs
    function showConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }

    // Startet das Spiel und setzt eine neue Verbindung
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

    // Event-Listener für den Überprüfen-Button
    submitButton.addEventListener('click', async () => {
        if (submitButton.textContent != "Überprüfen") {
            await startGame();
            return;
        }

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
                }, 6000);
                if (score === 5) {
                    showConfetti();
                    restartButton.classList.remove('hidden');
                    submitButton.classList.add('hidden');
                }
            } else {
                result.textContent = `Falsch. Die richtige Fahrzeit beträgt ${correctDuration} Minuten.`;
            }
            submitButton.textContent = 'Neue Verbindung';
        }
    });

    restartButton.addEventListener('click', () => {
        score = 0;
        scoreValue.textContent = score;
        restartButton.classList.add('hidden');
        submitButton.classList.remove('hidden');
        startGame();
    })

    // Startet das Spiel beim Laden der Seite
    startGame();
});
