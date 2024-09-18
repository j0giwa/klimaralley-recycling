
import React, { useState, useEffect } from 'react';
import Card from './Card';
import './MemoryGame.css';
import { useNavigate, useParams } from "react-router-dom";
import { getPlayerGameByIdApiDto, updateGameApi } from "../api/GameApiService";
import { useAuth } from "../security/AuthContext.jsx";

// Karten mit entsprechenden Match-IDs
const cardsData = [
  { id: 1, type: 'Papier', url: "https://cdn.pixabay.com/photo/2023/08/26/08/56/ai-generated-8214465_1280.jpg", matchId: 2 },
  { id: 2, type: 'Baeume', url: "https://cdn.pixabay.com/photo/2016/11/29/07/29/wood-1868104_1280.jpg", matchId: 1 },
  { id: 3, type: 'Erdoel', url: "https://cdn.pixabay.com/photo/2021/02/11/12/51/petrol-6005165_1280.jpg", matchId: 4 },
  { id: 4, type: 'Plastik', url: "https://cdn.pixabay.com/photo/2019/02/01/19/12/plastic-3969638_1280.jpg", matchId: 3 },
  { id: 5, type: 'Quarzsand', url: "https://cdn.pixabay.com/photo/2016/05/05/23/19/grains-of-sand-1374989_1280.jpg", matchId: 6 },
  { id: 6, type: 'Glas', url: "https://cdn.pixabay.com/photo/2014/09/13/15/38/bottles-444170_1280.jpg", matchId: 5 },
  { id: 7, type: 'Brot', url: "https://cdn.pixabay.com/photo/2019/05/06/14/24/bread-4183225_1280.jpg", matchId: 8 },
  { id: 8, type: 'Korn', url: "https://cdn.pixabay.com/photo/2015/07/17/10/12/naked-oats-848959_1280.jpg", matchId: 7 },
  { id: 9, type: 'Brunnen', url: "https://cdn.pixabay.com/photo/2017/08/12/21/21/fountain-2635412_1280.png", matchId: 10 },
  { id: 10, type: 'Wasser', url: "https://cdn.pixabay.com/photo/2017/02/02/15/15/bottle-2032980_1280.jpg", matchId: 9 },
  { id: 11, type: 'Minze', url: "https://cdn.pixabay.com/photo/2020/04/04/01/34/mint-5000528_1280.png", matchId: 12 },
  { id: 12, type: 'Teebeutel', url: "https://cdn.pixabay.com/photo/2014/11/29/18/02/teabag-550645_1280.jpg", matchId: 11 },
  { id: 13, type: 'Erdbeermarmelade', url: "https://cdn.pixabay.com/photo/2015/06/24/10/09/strawberry-819690_1280.jpg", matchId: 14 },
  { id: 14, type: 'Erdbeeren', url: "https://cdn.pixabay.com/photo/2019/07/11/07/29/strawberries-4330211_1280.jpg", matchId: 13 },
  { id: 15, type: 'Kaese', url: "https://cdn.pixabay.com/photo/2020/05/17/04/33/cheese-5179968_1280.jpg", matchId: 16 },
  { id: 16, type: 'Milch', url: "https://cdn.pixabay.com/photo/2022/01/01/23/18/milk-6909154_1280.png", matchId: 15 },
  { id: 17, type: 'Schaf', url: "https://cdn.pixabay.com/photo/2019/03/05/17/11/sheep-4036611_1280.jpg", matchId: 18 },
  { id: 18, type: 'Wolle', url: "https://cdn.pixabay.com/photo/2022/04/29/09/19/yarn-7162973_1280.jpg", matchId: 17 },
  { id: 19, type: 'Hochofen', url: "https://cdn.pixabay.com/photo/2015/02/24/13/28/industry-647413_1280.jpg", matchId: 20 },
  { id: 20, type: 'Schrauben', url: "https://cdn.pixabay.com/photo/2018/02/19/19/11/screw-3165934_1280.jpg", matchId: 19 },
];

/**
 * MemoryGame.jsx
 * 
 * Version: 1.0.0
 * Author: Philip
 * Author: Gizem
 * Author: Jeffrey Böttcher
 * 
 * 
 * Beschreibung:
 * Dieses Spiel ist ein "klassisches" Memory-Spiel, bei dem die Spieler Kartenpaare finden müssen. Die Karten werden zufällig gemischt, und der Spieler muss zwei Karten umdrehen, um zu prüfen, ob sie ein Paar bilden. 
 * Jedoch mit der schwierigkeit das die Karten nicht gleich sind, sondern aus verschiedenen Materialien bestehen. Rohmaterialen und Produkte sind jeweils ein paar.
 * Ziel ist es, alle Paare zu finden. Der Fortschritt des Spiels wird in einer Datenbank gespeichert, sodass das Spiel nach einem Neustart fortgesetzt werden kann. 
 * Funktionen zur Speicherung, Wiederherstellung und Löschung von Spielständen sind implementiert.
 */
const MemoryGame = () => {

  const { playerGameId, spieleId, playerId } = useParams(); // Holt die Parameter aus der URL
  const authContext = useAuth(); // Authentifizierungskontext für den Benutzernamen
  const username = authContext.username;
  const navigate = useNavigate();


  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false); // Zustand für den laufenden Vergleich

  // für die abfrage ob das Spiel beendet ist
  const [isGameFinished, setIsGameFinished] = useState(false);

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
  function retrieveGames() {
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
  }

  // Speichert die Spieldaten auf dem Server
  function saveGame() {
    const updatedGame = {
      ...game,
      points: score,
      isCompleted: isGameFinished,
      isSuccessful: isGameFinished
    };

    setGame(updatedGame);

    updateGameApi(playerId, spieleId, updatedGame)
      .then(() => console.log("Game saved successfully"))
      .catch(error => console.log(error));

    console.log(updatedGame);
  }

   // Löscht die Spieldaten auf dem Server
   function deleteGame() {
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
  }




  useEffect(() => {
    initializeGame();
  }, []);

  // Überprüft nach jedem Zug, ob zwei Karten übereinstimmen
  useEffect(() => {
    const checkForMatch = () => {
      if (flipped.length === 2 && !isChecking) {
        const [firstIndex, secondIndex] = flipped;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        // Prüft, ob die beiden Karten ein Paar bilden
        if (secondCard && firstCard.matchId === secondCard.id) {
          setIsChecking(true);
          setMatched([...matched, firstIndex, secondIndex]);

          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
            setScore(score + 1); // Erhöht den Punktestand bei einem Treffer

            // Überprüft, ob alle Paare gefunden wurden und das Spiel beendet ist
            if (matched.length === cards.length - 2) { 
              setIsGameFinished(true);
            }
          }, 1000);
        } else {
          setTimeout(() => setFlipped([]), 1000); // Kehrt die Karten wieder um, wenn kein Paar gefunden wurde
        }
      }
    };

    checkForMatch();
  }, [flipped, cards, matched, score, isChecking]);

  // Initialisiert das Spiel, mischt die Karten und setzt alle Zustände zurück
  const initializeGame = () => {
    const initialCards = [...cardsData]; 
    shuffleCards(initialCards);
    setCards(initialCards);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setIsGameFinished(false);
  };

  // Funktion zum Mischen der Karten
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Tauscht zwei Karten zufällig
    }
  };

  // Behandelt das Umdrehen einer Karte
  const handleClick = (id) => {
    if (flipped.length === 2 || isChecking) return; // Stoppt, wenn zwei Karten bereits umgedreht oder ein Vergleich läuft
    if (flipped.length === 0 || (flipped.length === 1 && !flipped.includes(id))) {
      setFlipped([...flipped, id]); // Fügt die Karte in die "umgedreht"-Liste ein
    }
  };

  // Überprüft, ob eine Karte bereits Teil eines gefundenen Paares ist
  const isMatched = (id) => matched.includes(id); 

  // Setzt das Spiel zurück, wenn der Spieler erneut spielen möchte
  const handlePlayAgain = () => {
    initializeGame();
    setIsGameFinished(false);
    setScore(0);
    deleteGame();  // Löscht die Spiel-Daten vom Server
  };

  // Speichert das aktuelle Spiel und navigiert zu einem neuen Spiel
  const handleContinue = () => {
    console.log(game);
    saveGame();  // Speichert den aktuellen Spielstand auf dem Server
    navigate('/play/recycling/games'); // Navigiert zur nächsten Spielseite
  };

  return (
    <div className="memoryGame">
      {/* Titel und Punktestand */}
      <h1 style={{ fontSize: '25px', fontWeight: 'bold', color: '#BC2A6E' }}>Memory</h1>
      <h2 style={{ fontSize: '15px', fontWeight: 'bold' }}>Woraus besteht der Gegenstand?</h2>
      <p style={{ fontWeight: 'bold', color: '#70BBFF' }}>Score: {score}</p>
      
      {/* Das Spielfeld mit den Karten */}
      <div className="memoryBoard">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={index}
            type={card.type}
            url={card.url}
            handleClick={handleClick}
            isMatched={isMatched(index)}
            flipped={flipped.includes(index) || isMatched(index)}
          />
        ))}
      </div>

      {/* Zeigt Buttons zum erneuten Spielen oder Fortfahren an, wenn das Spiel beendet ist */}
      {isGameFinished && (
        <div className='finish'>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold' }}>Spiel beendet!</h2>
          <button
            onClick={handlePlayAgain} style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px' }}>Noch mal spielen
          </button>
          <button
            onClick={handleContinue} style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px', marginLeft: '10px' }}>Nächstes Spiel
          </button>
        </div>)}
    </div>
  );
};

export default MemoryGame;
