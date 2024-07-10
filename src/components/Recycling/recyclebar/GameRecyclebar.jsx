import React, { useState } from 'react';
import DragItem from './DragItem';
import DropZone from './DropZone';
import './GameRecyclebar.css';
import { useNavigate } from 'react-router-dom';

const initialItems = [
  { id: 1, type: 'Alu', url: "https://cdn.pixabay.com/photo/2017/01/16/15/13/shells-1984293_1280.png" , recyclable: true },
  { id: 2, type: 'Kerzen', url: "https://cdn.pixabay.com/photo/2016/07/27/21/38/candles-1546499_1280.jpg" , recyclable: true },
  { id: 3, type: 'Eier', url: "https://cdn.pixabay.com/photo/2019/02/17/11/06/egg-4002016_1280.jpg", recyclable: true },
  { id: 4, type: 'Plastik', url: "https://cdn.pixabay.com/photo/2019/02/01/19/12/plastic-3969638_1280.jpg", recyclable: false },
  { id: 5, type: 'PlastikYoghurt', url: "https://cdn.pixabay.com/photo/2016/03/14/09/41/garbage-1255244_1280.jpg", recyclable: false },
  { id: 6, type: 'Briefe', url: "https://cdn.pixabay.com/photo/2016/09/10/17/17/letters-1659715_1280.jpg" , recyclable: false },
];

const GameRecyclebar = () => {
    
  const navigate = useNavigate();

    const [isGameFinished, setIsGameFinished] = useState(false);
    const [items, setItems] = useState(initialItems);
    const [score, setScore] = useState(0);

  const handleDrop = (item, recyclable) => {
    if (item.recyclable === recyclable) {
        setScore(prevScore => prevScore + 1);
        // Callback Funktion um items.length richtig abrufen zu könen! 
        setItems(prevItems => {
          const updatedItems = prevItems.filter(i => i.id !== item.id);
          // Prüfen, ob alle Items abgelegt wurden
          if (updatedItems.length === 0) {
            setIsGameFinished(true);
          }
          return updatedItems;
        });
      } else {
        setScore(prevScore => prevScore - 1);
      }


    console.log(items.length);
  };

  const handlePlayAgain = () => {
    // Spiel zurücksetzen
    setIsGameFinished(false);
    setScore(0);
    // Items wiederherstellen
    setItems(initialItems);
  };

  const handleContinue = () => {
    // Logik zum Weiterspielen
    navigate('/play/recycling/memory/:id');
  };

  return (
    <div className="game-board">
      
      {/* <div className="score">Punkte: {score}</div>
      <div className="drop-zones">
        <DropZone recyclable={true} onDrop={handleDrop}>Recyclebar</DropZone>
        <div className="items">
        {items.map(item => (
          <DragItem key={item.id} item={item} />
        ))}
      </div>
        <DropZone recyclable={false} onDrop={handleDrop}>Nicht Recyclebar</DropZone>
      </div> */}

     
          <div>
            <div className="score">Score: {score}</div>
            <div className="drop-zones">
              <DropZone recyclable={true} onDrop={(item) => handleDrop(item, true)}>Recyclebar</DropZone>
              <div className="items">
                {items.map(item => (
                  <DragItem key={item.id} item={item} />
                ))}
              </div>
              <DropZone recyclable={false} onDrop={(item) => handleDrop(item, false)}>Nicht Recyclebar</DropZone>
            </div>
          </div>
        
          {isGameFinished && (
          <div>
            <h2>Spiel beendet</h2>
            <button onClick={handlePlayAgain}>Nochmal Spielen</button>
            <button onClick={handleContinue}>Weiterspielen</button>
          </div>)}
      </div>
      
  );
};

export default GameRecyclebar;
