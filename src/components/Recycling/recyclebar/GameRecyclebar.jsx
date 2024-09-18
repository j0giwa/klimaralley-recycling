import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DragItem from './DragItem';
import DropZone from './DropZone';
import './GameRecyclebar.css';
import { getPlayerGameByIdApiDto, updateGameApi } from "../api/GameApiService";
import { useAuth } from "../security/AuthContext.jsx";

const initialItems = [
  { id: 1, type: 'Windeln', url: "https://i.shgcdn.com/a97e6ea8-2b26-4c5a-b4cf-8da06aa9c428/-/format/auto/-/preview/3000x3000/-/quality/lighter/" , recyclable: false },
  { id: 2, type: 'Kerzen', url: "https://entsorgen.org/wp-content/uploads/2019/07/kerzen.jpg" , recyclable: false },
  { id: 3, type: 'Farbe und lacke', url: "https://grinding.netzsch.com/_Resources/Persistent/c/a/c/3/cac3968c94b675ea4a1dc4c15e0cbfe2c36b744a/Fillers-400x400.webp", recyclable: false },
  { id: 4, type: 'Plastik', url: "https://weima.com/wp-content/uploads/2020/12/rigid_plastics_shredder_recycling_web-540x360.jpg", recyclable: true },
  { id: 5, type: 'PlastikYoghurt', url: "https://cdn.pixabay.com/photo/2016/03/14/09/41/garbage-1255244_1280.jpg", recyclable: true },
  { id: 6, type: 'zeitungen', url: "https://www.shutterstock.com/image-photo/pile-newspapers-isolated-on-white-260nw-570240970.jpg" , recyclable: true },
  { id:7,type:'Spritze',url:"https://th.bing.com/th/id/OIP.2dBLL7WrdvRFeTzxCJMnKwAAAA?rs=1&pid=ImgDetMain",recyclable:false},
  { id:8,type:'Tapete',url:"https://images-eu.ssl-images-amazon.com/images/I/31-X%2BiBC4gL._SL500_AC_SS350_.jpg",recyclable:false},
  { id: 9, type: 'Karton', url: "https://th.bing.com/th/id/OIP.tmkw-mO4bi_YNFykxzuLJQHaFW?pid=ImgDet&w=175&h=112.5&c=7&dpr=1,3" , recyclable: true },
  { id: 10, type: 'Glas', url: "https://th.bing.com/th/id/OIP.GHZchj4Hgf2IPGFOdXhRtAHaE8?pid=ImgDet&w=175&h=147.58333333333334&c=7&dpr=1,3" , recyclable: true },
]

/**
 * GameRecyclebar Component
 * 
 * @author Josy
 * @author Jeffrey Böttcher
 * @version 1.0.0
 * 
 * @description
 * Dieses Spiel fordert die Spieler dazu heraus, verschiedene Gegenstände korrekt als "recyclebar" oder "nicht recyclebar" zu kategorisieren.
 * Der Spieler zieht Objekte in die entsprechenden Drop-Zonen und sammelt Punkte für richtige Zuordnungen. 
 * Das Ziel des Spiels ist es, durch die korrekte Zuordnung von Objekten eine bestimmte Punktzahl zu erreichen, um das Spiel zu gewinnen.
 * 
 * Funktionsweise:
 * - Die Spiel-Daten werden vom Server abgerufen und gespeichert.
 * - Gegenstände werden per Drag & Drop in die entsprechenden Zonen "Recyclebar" oder "Nicht recyclebar" gezogen.
 * - Bei richtiger Zuordnung wird ein Punkt vergeben, bei falscher Zuordnung ein Punkt abgezogen.
 * - Das Spiel endet, wenn alle Gegenstände sortiert wurden, und überprüft, ob der Spieler gewonnen hat. Weiter kommt man jedoch immer
 */
const GameRecyclebar = () => {
  const { playerGameId, playerId, spieleId } = useParams(); // Holt die Parameter aus der URL
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();
    
  const [isGameFinished, setIsGameFinished] = useState(false);
    const [items, setItems] = useState(initialItems);
    const [score, setScore] = useState(0);
    const [gameWon, setGameWon] = useState(false); // Neuer Zustand für den Gewinnstatus
    const totalItems = initialItems.length;
    const winningScore = 5; //Math.ceil(totalItems / 2); // Die Punktzahl, die überschritten werden muss, um zu gewinnen
  
 // Spiel-Daten vom Server laden
  const [game, setGame] = useState({
    points: 0,
    playerGameId: playerGameId,
    playerId: playerId,
    spieleId: spieleId,
    username: username,
    isCompleted: false,
    isSuccessful: false
  });

  useEffect(() => {
    retrieveGames(); // Spiel-Daten beim Laden des Components abrufen
  }, [playerGameId]);

  // Holt die Spieldaten vom Server
  const retrieveGames = () => {
    if (playerGameId) {
      getPlayerGameByIdApiDto(playerId, spieleId)
        .then(response => {
          setGame(prevGame => ({
            ...prevGame,
            points: response.data.points,
            isCompleted: response.data.isCompleted,
            isSuccessful: response.data.isSuccessful
          }));
        })
        .catch(error => console.log("Error fetching game data: ", error));
    }
  };

  // Speichert die Spieldaten auf dem Server
  const saveGame = () => {
    const updatedGame = {
      ...game,
      points: score,
      isCompleted: isGameFinished,
      isSuccessful: gameWon
    };

    setGame(updatedGame);

    updateGameApi(playerId, spieleId, updatedGame)
      .then(() => console.log("Game saved successfully"))
      .catch(error => console.log(error));

    console.log(updatedGame);
  };

  // Löscht die Spieldaten auf dem Server
  const deleteGame = () => {
    const updatedGame = {
      ...game,
      points: 0,
      isCompleted: false,
      isSuccessful: false
    };

    setGame(updatedGame);

    updateGameApi(playerId, spieleId, updatedGame)
      .then(() => console.log("Game deleted successfully"))
      .catch(error => console.log(error));

    console.log(updatedGame);
  };

  // Funktion für das Ablegen der Items in die Drop-Zones
  const handleDrop = (item, recyclable) => {
    if (item.recyclable === recyclable) {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        // Spiel gewonnen, wenn Punktzahl größer ist als der Gewinnwert
        if (newScore > winningScore) {
          setGameWon(true);
        }
        return newScore;
      });

      setItems(prevItems => {
        const updatedItems = prevItems.filter(i => i.id !== item.id);

        // Prüfen, ob alle Items abgelegt wurden
        if (updatedItems.length === 0) {
          setIsGameFinished(true);
        }

        return updatedItems;
      });
    } else {
      setScore(prevScore => prevScore - 1); // Punktabzug bei falscher Zuordnung
    }
  };

  const handlePlayAgain = () => {
    deleteGame(); // Spiel-Daten auf dem Server zurücksetzen
    // Spiel zurücksetzen
    setIsGameFinished(false);
    setScore(0);
    setGameWon(false); // Gewinnstatus zurücksetzen
    setItems(initialItems); // Items wiederherstellen
  };

  const handleContinue = () => {
    saveGame(); // Spiel speichern
    navigate('/play/recycling/games'); // Navigiere zum nächsten Spiel
  };

  return (
    <div className="game-board">
      <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>GameRecyclebar</h1>
      <h2 style={{ fontSize: '15px', fontWeight: 'bold' }}>Welcher Gegenstand ist recyclebar oder nicht recyclebar?</h2>

      <div>
        <div className="score">Score: {score}</div>
        <div className="drop-zones">
          <DropZone recyclable={true} onDrop={(item) => handleDrop(item, true)}>Recyclebar</DropZone>
          <div className="items">
            {items.map(item => (
              <DragItem key={item.id} item={item} />
            ))}
          </div>
          <DropZone recyclable={false} onDrop={(item) => handleDrop(item, false)}>Nicht recyclebar</DropZone>
        </div>
      </div>

      {isGameFinished && (
        <div>
          <h2>{gameWon ? 'Herzlichen Glückwunsch, Sie haben gewonnen!' : 'Leider verloren. Versuchen Sie es erneut!'}</h2>
          <button
            onClick={handlePlayAgain}
            style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px' }}
          >
            Noch mal spielen
          </button>
          <button
            onClick={handleContinue}
            style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px', marginLeft: '10px' }}
          >
            Nächstes Spiel
          </button>
        </div>
      )}
    </div>
  );
};

export default GameRecyclebar;
