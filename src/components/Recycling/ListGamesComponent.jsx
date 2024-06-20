import { useState } from 'react'
import { deleteGameApi, retrieveAllGamesForUserApi } from "./api/GameApiService"
import { useEffect } from 'react';
import { useAuth } from "./security/AuthContext.jsx"
import {  useNavigate } from "react-router-dom"



export default function ListGamesComponent() {

    const authContext = useAuth();
    const username = authContext.username;

    const navigate = useNavigate();

    // Definieren von Zustandsvariablen für Spieleliste und Nachrichten
    const [games, setGames] = useState([]);
    const [message, setMessage] = useState(null);

    // useEffect-Hook zum Aufrufen von refreshGames beim ersten Rendern
    useEffect(() => refreshGames(), []);

    // Funktion zum Abrufen aller Spiele für den Benutzer
    function refreshGames() {
        retrieveAllGamesForUserApi(username)
            .then(response => {
                setGames(response.data); // Setzen der Spieleliste im Zustand
                console.log(response.data); 
            })
            .catch(error => console.log(error)); // Fehlerbehandlung durch Protokollierung
    }

    // Funktion zum Starten eines Spiels basierend auf der ID
    function startGame(id) {
        if (id === 10001) {
            startQuiz(id); // Quiz-Spiel starten
        } else if (id === 10002) {
            startMüllSortieren(); // Müllsortierspiel starten
        } else {
            navigate(`/game/${id}`); // Navigieren zu einem anderen Spiel
        }
    }

    function startQuiz(id) {       
        navigate(`/quiz/${id}`)  
    }
    
    function startMüllSortieren() {
        console.log("clicked")  
        navigate(`/muellsortieren`)  
    }

    // JSX-Struktur für die Anzeige der Spieleliste
    return (
        <div className="ListGamesComponent">
            <h1>Recycling Spiele</h1>
            {/* Anzeigen der Nachricht, wenn message nicht null ist */}
            {message && <div className='alert alert-warning'>{message}</div>}

            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Spielname</th>
                            <th>Zuende gespielt?</th>
                            <th>Erfolgreich</th>
                            <th>Anzahl der Punkte</th>
                            <th>Spiel Starten</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping durch die Spieleliste und Rendering der Spieledaten in Tabellenzeilen */}
                        {games.map(game => (
                            <tr key={game.id}>
                                <td>{game.description}</td>
                                <td>{game.done.toString()}</td>
                                <td>{game.success.toString()}</td>
                                <td>{game.points}</td>
                                <td>
                                    <button className='btn btn-success' onClick={() => startGame(game.id)}>Start</button> {/*Spiel anhand der id starten */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}