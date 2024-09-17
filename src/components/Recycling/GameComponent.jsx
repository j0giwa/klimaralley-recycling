import { useNavigate, useParams } from "react-router-dom"
import { retrieveGameApi, updateGameApi } from "./api/GameApiService"
import { useAuth } from "./security/AuthContext.jsx"
import { useEffect, useState } from "react"


/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung: 
 * Diese Komponente repräsentiert eine Spieloberfläche, in der Benutzer die Spielbeschreibung sehen, den Spielstatus aktualisieren, 
 * Punkte vergeben und das Spiel als abgeschlossen oder erfolgreich markieren können. Sie interagiert mit einem Backend über 
 * API-Dienste, um Spieldaten abzurufen und zu aktualisieren. Es werden React Hooks wie `useState`, `useEffect` und der Kontext 
 * aus `AuthContext` für die Authentifizierung verwendet.
 * Erste Testfunction, wird nicht mehr benutzt und ist nur noch als Beispiel vorhanden.
 */

export default function GameComponent() {
    const { id } = useParams(); // Holt die Spiel-ID aus den URL-Parametern
    const [description, setDescription] = useState(''); // Zustand, um die Spielbeschreibung zu speichern
    const authContext = useAuth(); // Holt den Authentifizierungskontext
    const navigate = useNavigate(); // Navigations-Hook, um Benutzer weiterzuleiten

    const username = authContext.username; // Benutzername aus dem Authentifizierungskontext

    const [game, setGame] = useState({
        points: 0,
        id: id,
        username: username,
        done: false,
        success: false
    }); // Initialer Zustand des Spielobjekts

    // Ruft die Spieldetails ab, wenn die Komponente geladen wird oder sich die ID ändert
    useEffect(() => retrieveGames(), [id]);

    // Funktion, um Spieldaten mit der API vom Backend abzurufen
    function retrieveGames() {
        if (id != -1) {
            retrieveGameApi(username, id)
                .then(response => {
                    setDescription(response.data.description); // Aktualisiert den Zustand der Beschreibung
                    setGame(prevGame => ({
                        ...prevGame,
                        description: response.data.description,
                        points: response.data.points,
                        done: response.data.done,
                        success: response.data.success
                    })); // Aktualisiert den Spielzustand mit Daten von der API
                })
                .catch(error => console.log(error)); // Fehlerbehandlung bei der API-Abfrage
        }
    }

    // Funktion, um das Spiel als abgeschlossen zu markieren
    function changeGameDone() {
        const updatedGame = {
            ...game,
            done: true
        };

        updateGameApi(username, id, updatedGame) // Aktualisiert den Spielstatus im Backend
            .then(() => {
                navigate('/play/recycling/games'); // Leitet nach erfolgreicher Aktualisierung zur Spielübersicht weiter
            })
            .catch(error => console.log(error)); // Fehlerbehandlung bei der API-Abfrage

        console.log(updatedGame);
        console.log("clicked");
    }

    // Funktion, um das Spiel als erfolgreich zu markieren
    function changeGameSuccess() {
        const updatedGame = {
            ...game,
            success: true
        };

        updateGameApi(username, id, updatedGame)
            .then(() => {
                navigate('/play/recycling/games');
            })
            .catch(error => console.log(error));

        console.log(updatedGame);
        console.log("clicked");
    }

    // Funktion, um die Punkte im Spiel zu erhöhen
    function changePoints() {
        const updatedGame = {
            ...game,
            points: game.points + 1 // Erhöht die Punkte um 1
        };

        setGame(updatedGame); // Aktualisiert den lokalen Spielzustand

        updateGameApi(username, id, updatedGame) // Aktualisiert die Spielpunkte im Backend
            .then(() => {
                navigate('/play/recycling/games');
            })
            .catch(error => console.log(error));

        console.log(updatedGame);
    }

    return (
        <div className="container">
            <h1>Start des Spiels:</h1>
            <div>
                {description}
                <button className='btn btn-success' onClick={changeGameDone}>Beenden</button>
                <button className='btn btn-success' onClick={changePoints}>Punkte vergeben</button>
                <button className='btn btn-success' onClick={changeGameSuccess}>Erfolgreich?</button>
            </div>
        </div>
    );
}