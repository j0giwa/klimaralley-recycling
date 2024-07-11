
import React, { useState, useEffect } from 'react';
import Card from './Card';
import './MemoryGame.css';
import {  useNavigate } from 'react-router-dom';

const cardsData = [
  { id: 1, type: 'papier', url: "https://cdn.pixabay.com/photo/2023/08/26/08/56/ai-generated-8214465_1280.jpg", matchId: 2 },
  { id: 2, type: 'baum', url: "https://cdn.pixabay.com/photo/2018/11/18/16/31/leaves-3823499_1280.jpg", matchId: 1 },
  { id: 3, type: 'plastik', url: "https://cdn.pixabay.com/photo/2019/02/17/11/06/egg-4002016_1280.jpg", matchId: 4 },
  { id: 4, type: 'flasche', url: "https://cdn.pixabay.com/photo/2019/05/06/14/24/bread-4183225_1280.jpg", matchId: 3 },
  // Weitere Karten mit entsprechenden Match-IDs
];

const MemoryGame = () => {

    const navigate = useNavigate();


  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(false); // Zustand für den laufenden Vergleich
  
  // für die abfrage ob das Spiel beendet ist
  const [isGameFinished, setIsGameFinished] = useState(false);


  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const checkForMatch = () => {
      if (flipped.length === 2 && !isChecking) {
        const [firstIndex, secondIndex] = flipped;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (secondCard && firstCard.matchId === secondCard.id) {
          setIsChecking(true);
          setMatched([...matched, firstIndex, secondIndex]);

          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
            setScore(score + 1); // Score erhöhen, wenn ein Paar gefunden wird

            // Überprüfen, ob alle Paare gefunden wurden
            if (matched.length === cards.length - 2) { // -2 da jedes Paar zwei Karten umfasst
            //   alert('Herzlichen Glückwunsch! Sie haben alle Karten gefunden!');
              setIsGameFinished(true);
            }
          }, 1000);
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
    };

    checkForMatch();
  }, [flipped, cards, matched, score, isChecking]);

  const initializeGame = () => {
    const initialCards = [...cardsData];
    shuffleCards(initialCards);
    setCards(initialCards);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setIsGameFinished(false);
  };

  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleClick = (id) => {
    if (flipped.length === 2 || isChecking) {
      return;
    }
    if (flipped.length === 0 || (flipped.length === 1 && !flipped.includes(id))) {
      setFlipped([...flipped, id]);
    }
  };

  const isMatched = (id) => matched.includes(id);

  const handlePlayAgain = () => {
    // Spiel zurücksetzen
    initializeGame();
    setIsGameFinished(false);
    setScore(0);
  };

  const handleContinue = () => {
    navigate('/play/recycling/games');
  };

  return (
    <div className="memoryGame">
      <h1>Recycling Memory</h1>
      <p>Score: {score}</p>
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

      {isGameFinished && (
          <div className='finish'>
            <h2>Spiel beendet</h2>
            <button onClick={handlePlayAgain}>Nochmal Spielen</button>
            <button onClick={handleContinue}>Weiterspielen</button>
          </div>)}
    </div>
  );
};

export default MemoryGame;



