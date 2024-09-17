import { useState } from 'react'
import { getPlayerGameApiDto} from "./api/GameApiService"
import { getPlayerByUsernameApi } from "./api/PlayerApiService.js"
import { useEffect } from 'react';
import { useAuth } from "./security/AuthContext.jsx"
import { useNavigate } from "react-router-dom"



/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `ListGamesComponent`-Komponente zeigt eine Tabelle mit den Recycling-Spielen des aktuellen Benutzers an. 
 * Sie ruft die Player-ID und die zugehörigen Spiele-Daten ab, zeigt diese in einer Tabelle an und ermöglicht es dem Benutzer, ein Spiel zu starten.
 */
export default function ListGamesComponent() {
    const authContext = useAuth();
    const username = authContext.username;

    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [spiele, setSpiele] = useState([]);
    const [playerId, setPlayerId] = useState(null);
    const [playerGameId, setPlayerGameId] = useState(null);

    //playerGameId = Die ID die Explizit auf das Spielende Spiel verweißt, einmalig und zugehörig zu einem Spieler!  
    //spieleId = Die id des Spiels, die sich auf das Spiel bezieht sprich, Quiz, Müllsortieren, Recyclebar, Memory. Bei jeden Spieler Gleich    
    //playerId = Die ID des Spielers, die sich auf den Spieler bezieht, der das Spiel spielt. Bei jeden Spieler Unterschiedlich.

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
                setPlayerGameId(gamesResponse.data.id);
                setSpiele(gamesResponse.data);

                if (gamesResponse.data.length > 0) {
                    console.log('Spiele:', gamesResponse.data);
                    console.log('PlayerGameId:', gamesResponse.data.id);
                    
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
    function startGame(spieleId,playerGameId,playerId) {
        switch (spieleId) {
            case 1:
                startQuiz(spieleId,playerGameId,playerId);
                break;
            case 2:
                startMüllSortieren(spieleId,playerGameId,playerId);
                break;
            case 3:
                startRecyclebar(spieleId,playerGameId,playerId);
                break;
            case 4:
                startMemory(playerGameId,playerId,spieleId);
                break;
            default:
                navigate(`/play/recycling/games`);
                break;
        }
    }
    
    function startQuiz(spieleId,playerGameId, playerId) {
        navigate(`/play/recycling/quiz/${playerGameId}/${spieleId}/${playerId}`);
    }

    function startMüllSortieren(spieleId,playerGameId, playerId) {
        navigate(`/play/recycling/muellsortieren/${playerGameId}/${spieleId}/${playerId}`);
    }

    function startRecyclebar(spieleId,playerGameId, playerId) {
        navigate(`/play/recycling/recyclebar/${playerGameId}/${spieleId}/${playerId}`);
    }

    function startMemory(spieleId,playerGameId, playerId) {
        navigate(`/play/recycling/memory/${playerGameId}/${spieleId}/${playerId}`);
    }                                       

    return (
        <div className="ListGamesComponent">
            <h1>Recycling Spiele </h1>
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
                                    <button className='btn btn-success' onClick={() => startGame(spiel.gameId, spiel.id, spiel.playerId)}> 
                                    {/* spiel.id, spiel.playerId, spiel.gameId */}
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
