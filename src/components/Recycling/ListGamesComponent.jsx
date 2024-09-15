import { useState } from 'react'
import { getPlayerGameApiDto} from "./api/GameApiService"
import { getPlayerByUsernameApi } from "./api/PlayerApiService.js"
import { useEffect } from 'react';
import { useAuth } from "./security/AuthContext.jsx"
import { useNavigate } from "react-router-dom"



export default function ListGamesComponent() {
    const authContext = useAuth();
    const username = authContext.username;

    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [spiele, setSpiele] = useState([]);
    const [playerId, setPlayerId] = useState(null);

    // Erstes useEffect: Ruft die PlayerId basierend auf dem Benutzernamen ab
    useEffect(() => {
        const fetchPlayerId = async () => {
            if (!username) return;

            try {
                const playerResponse = await getPlayerByUsernameApi(username);
                const id = playerResponse.data.id;
                setPlayerId(id);
                console.log('Player ID:', id);
            } catch (error) {
                console.error('Fehler beim Abrufen der PlayerId:', error);
                if (error.response) {
                    setMessage(`Serverfehler: ${error.response.statusText}`);
                } else {
                    setMessage('Fehler beim Abrufen der PlayerId.');
                }
            }
        };

        fetchPlayerId();
    }, [username]);

    // Zweites useEffect: Ruft die Spiele-Daten ab, wenn die PlayerId gesetzt ist
    useEffect(() => {
        const fetchPlayerGames = async () => {
            if (playerId === null) return;

            try {
                const gamesResponse = await getPlayerGameApiDto(playerId);
                setSpiele(gamesResponse.data);

                if (gamesResponse.data.length > 0) {
                    console.log('Spiele:', gamesResponse.data);
                }
            } catch (error) {
                console.error('Fehler beim Abrufen der Spiele-Daten:', error);
                if (error.response) {
                    setMessage(`Serverfehler: ${error.response.statusText}`);
                } else {
                    setMessage('Fehler beim Abrufen der Spiele-Daten.');
                }
            }
        };

        fetchPlayerGames();
    }, [playerId]);

    // Startet das spezifische Spiel basierend auf der übergebenen ID
    function startGame(spieleId) {
        switch (spieleId) {
            case 1:
                startQuiz(spieleId);
                break;
            case 2:
                startMüllSortieren(spieleId);
                break;
            case 3:
                startRecyclebar(spieleId);
                break;
            case 4:
                startMemory(spieleId);
                break;
            default:
                navigate(`/play/recycling/games`);
                break;
        }
    }

    function startQuiz(id) {
        navigate(`/play/recycling/quiz/${id}`);
    }

    function startMüllSortieren(id) {
        navigate(`/play/recycling/muellsortieren/${id}`);
    }

    function startRecyclebar(id) {
        navigate(`/play/recycling/recyclebar/${id}`);
    }

    function startMemory(id) {
        navigate(`/play/recycling/memory/${id}`);
    }

    return (
        <div className="ListGamesComponent">
            <h1>Recycling Spiele</h1>
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
                        {spiele.map(spiel => (
                            <tr key={spiel.gameId}>
                                <td>{spiel.gameName}</td>
                                <td>{spiel.isCompleted.toString()}</td>
                                <td>{spiel.isSuccessful.toString()}</td>
                                <td>{spiel.points}</td>
                                <td>
                                    <button className='btn btn-success' onClick={() => startGame(spiel.gameId)}>
                                        Start
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
