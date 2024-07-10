import React, { useState } from 'react';
import DragItem from './DragItem';
import DropZone from './DropZone';
import './GameRecyclebar.css';

const initialItems = [
  { id: 1, type: 'paper', url: "https://cdn.pixabay.com/photo/2017/01/16/15/13/shells-1984293_1280.png" , recyclable: true },
  { id: 2, type: 'plastic', url: "https://cdn.pixabay.com/photo/2016/07/27/21/38/candles-1546499_1280.jpg" , recyclable: true },
  { id: 3, type: 'glass', url: "https://cdn.pixabay.com/photo/2019/02/17/11/06/egg-4002016_1280.jpg", recyclable: true },
  { id: 4, type: 'metal', url: "https://cdn.pixabay.com/photo/2019/02/01/19/12/plastic-3969638_1280.jpg", recyclable: true },
  { id: 5, type: 'food', url: "https://cdn.pixabay.com/photo/2016/03/14/09/41/garbage-1255244_1280.jpg", recyclable: false },
  { id: 6, type: 'electronics', url: "https://cdn.pixabay.com/photo/2016/09/10/17/17/letters-1659715_1280.jpg" , recyclable: false },
];

const GameRecyclebar = () => {
  const [items, setItems] = useState(initialItems);
  const [score, setScore] = useState(0);

  const handleDrop = (item, recyclable) => {
    if (item.recyclable === recyclable) {
      setScore(prevScore => prevScore + 1);
      setItems(prevItems => prevItems.filter(i => i.id !== item.id));
    } else {
      setScore(prevScore => prevScore - 1);
    }
  };

  return (
    <div className="game-board">
      <div className="score">Score: {score}</div>
      <div className="drop-zones">
        <DropZone recyclable={true} onDrop={handleDrop}>Recyclebar</DropZone>
        <DropZone recyclable={false} onDrop={handleDrop}>Nicht Recyclebar</DropZone>
      </div>
      <div className="items">
        {items.map(item => (
          <DragItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default GameRecyclebar;
