import React, { useState } from 'react';
import DragItem from './DragItem';
import DropZone from './DropZone';
import './GameRecyclebar.css';
import { useNavigate } from 'react-router-dom';

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
const GameRecyclebar = () => {
    
  const navigate = useNavigate();

  const [isGameFinished, setIsGameFinished] = useState(false);
    const [items, setItems] = useState(initialItems);
    const [score, setScore] = useState(0);
    const [gameWon, setGameWon] = useState(false); // Neuer Zustand für den Gewinnstatus
    const totalItems = initialItems.length;
    const winningScore = 5; //Math.ceil(totalItems / 2); // Die Punktzahl, die überschritten werden muss, um zu gewinnen
  const handleDrop = (item, recyclable) => {
    if (item.recyclable === recyclable) {
        setScore(prevScore => prevScore + 1);
        // Callback Funktion um items.length richtig abrufen zu könen! 
        setItems(prevItems => {
          console.log(gameWon);
          const updatedItems = prevItems.filter(i => i.id !== item.id);
          // Prüfen, ob alle Items abgelegt wurden
          if (updatedItems.length === 0){
             // Spielende: Gewinn-Status prüfen
          if(score  > winningScore)
            setGameWon(true);
          }else
          {setGameWon(false);
          }
          {setIsGameFinished(true);}
          return updatedItems;
        });
      } else {
        setScore(prevScore => prevScore - 1);
      }


    //console.log(items.length);
  };

  const handlePlayAgain = () => {
    // Spiel zurücksetzen
    setIsGameFinished(false);
    setScore(0);
    setGameWon(false); // Zurücksetzen des Gewinnstatus
    // Items wiederherstellen
    setItems(initialItems);
  };

  const handleContinue = () => {
    // Logik zum Weiterspielen
    navigate('/play/recycling/memory/:id');
  };

  return (
    <div className="game-board">
      <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>GameRecyclebar</h1>
      <h2 style={{ fontSize: '15px', fontWeight: 'bold'}}>welche Gegenstand ist recyclebar oder nicht recyclebar?</h2>
      
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
            <div className="score" >Score: {score}</div>
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
             <h2>{gameWon ? 'Herzlichen Glückwunsch, Sie haben gewonnen!' : 'Leider verloren. Versuchen Sie es erneut!'}</h2>
            <button onClick={handlePlayAgain}style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px' }}>Noch mal spielen</button>
            <button onClick={handleContinue}style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px', marginLeft: '10px' }}>Nächstes Spiel</button>
          </div>)}
      </div>
      
  );
};

export default GameRecyclebar;
