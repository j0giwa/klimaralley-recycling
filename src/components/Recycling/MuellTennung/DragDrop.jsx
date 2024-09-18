import Picture from './Picture';
import { useDrop } from 'react-dnd';
import React, { useState } from 'react';
//import "../App.css";
import "./muellTrennung.css";
import { useNavigate } from 'react-router-dom';

//import { BrowserRouter } from 'react-router-dom';


const PictureList = [
    {
        id: 1, //Zeitung
    url: "https://cdn.pixabay.com/photo/2016/05/24/18/22/newspapers-1412940_1280.png",
    boardId: 1
  },
  {
  id: 2, //Brot
    url: "https://cdn.pixabay.com/photo/2019/05/06/14/24/bread-4183225_1280.jpg",
    boardId: 2
  },
  {
    id: 3, //Windeln
    url: "https://cdn.pixabay.com/photo/2018/03/17/19/57/diaper-3234992_640.png",
    boardId: 4
  },
  {
    id: 4, //Alu-Schalen
    url: "https://cdn.pixabay.com/photo/2017/01/16/15/13/shells-1984293_1280.png",
    boardId: 3
  },
  {
    id: 5, //Kartoffelschalen
    url: "https://cdn.pixabay.com/photo/2014/05/14/16/15/potato-skins-344185_1280.jpg",
    boardId: 2
  },
  {
    id: 6, //Umschläge
    url: "https://cdn.pixabay.com/photo/2016/09/10/17/17/letters-1659715_1280.jpg",
    boardId: 1
  },
  {
    id: 7, //PET-Flasche
    url: "https://cdn.pixabay.com/photo/2024/04/29/14/47/packing-8728105_1280.jpg",
    boardId: 3
  },
  {
    id: 8, //Tassen
    url: "https://cdn.pixabay.com/photo/2020/01/29/13/47/connection-4802578_1280.jpg",
    boardId: 4
  },
  {
    id: 9, //Joghurt-Becher
    url: "https://cdn.pixabay.com/photo/2016/03/14/09/41/garbage-1255244_1280.jpg",
    boardId: 3
  },
  {
    id: 10, //Karton
    url: "https://cdn.pixabay.com/photo/2023/08/26/08/56/ai-generated-8214465_1280.jpg",
    boardId: 1
  },
  {
    id: 11, //Shampoo-Flasche
    url: "https://cdn.pixabay.com/photo/2019/02/01/19/12/plastic-3969638_1280.jpg",
    boardId: 3
  },
  {
    id: 12, //Teekanne
    url: "https://cdn.pixabay.com/photo/2014/03/24/18/25/teapot-295570_1280.jpg",
    boardId: 4
  },
  {
    id: 13, //Blätter
    url: "https://cdn.pixabay.com/photo/2018/11/18/16/31/leaves-3823499_1280.jpg",
    boardId: 2
  },
  {
    id: 14, //Rollen
    url: "https://cdn.pixabay.com/photo/2016/03/05/22/12/roll-1239215_1280.jpg",
    boardId: 1
  },
  {
    id: 15, //Kerzen
    url: "https://cdn.pixabay.com/photo/2016/07/27/21/38/candles-1546499_1280.jpg",
    boardId: 4
  },
  {
    id: 16, //Eier
    url: "https://cdn.pixabay.com/photo/2019/02/17/11/06/egg-4002016_1280.jpg",
    boardId: 2
  },


];

function DragDrop() {

 
  const navigate = useNavigate();

  
  // die Boards in denen die Items abgelegt werden können
  const [blueBoard, setBlueBoard] = useState([]);
  const [greenBoard, setGreenBoard] = useState([]);
  const [yellowBoard, setYellowBoard] = useState([]);
  const [grayBoard, setGrayBoard] = useState([]);
  const [score, setScore] = useState(0); // Verfolgen den Punktestand
  const [evaluation, setEvaluation] = useState(""); // Verfolgen die Bewertung am Ende

  //die Items die noch in der Liste sind
  const [pictures, setPictures] = useState(PictureList);

  // für die abfrage ob das Spiel beendet ist
  const [isGameFinished, setIsGameFinished] = useState(false);


  
    // Funktion um ein Drop zu erstellen 
    // boardSetter ist die Funktion die das Board setzt
    function useCreateDrop(boardSetter) {
     
      const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'image', 
        drop: (item) => addImageToBoard(item.id, boardSetter), 
        collect: (monitor) => ({
          isOver: !!monitor.isOver(), 
        }),
      }), [boardSetter]);  
    
      return [dropRef, isOver];  
    }


  // Logik wenn ein Item in ein Board gezogen wird
  const addImageToBoard = (id, boardSetter) => {
  const picture = pictures.find((picture) => id === picture.id); //sucht das Bild in der Liste  
   
    if (!picture) {
      console.log("Picture not found in PictureList");
      return;
    }
    const boardId = picture.boardId;


    //prüft ob das Bild in das richtige Board gezogen wird und wählt das entsprechende Board aus
    if (boardId === 1 && boardSetter === setBlueBoard) {
      setBlueBoard((board) => [...board, picture]);
      setScore((prevScore) => prevScore + 10); // Erhöhen Sie die Punktzahl für den richtigen Drop
    } else if (boardId === 2 && boardSetter === setGreenBoard) {
      setGreenBoard((board) => [...board, picture]);
      setScore((prevScore) => prevScore + 10); 
    } else if (boardId === 3 && boardSetter === setYellowBoard) {
      setYellowBoard((board) => [...board, picture]);
      setScore((prevScore) => prevScore + 10);
    } else if (boardId === 4 && boardSetter === setGrayBoard) {
      setGrayBoard((board) => [...board, picture]);
      setScore((prevScore) => prevScore + 10);
    } else {
      console.log("This item can't be added to the board");
      setScore((prevScore) => prevScore - 5); // Punkteabzug bei Falschen Drop
      return;
    }

    setPictures((prevPictures) => prevPictures.filter((p) => p.id !== id)); //entfernt das Bild aus der Liste der Items

    
    //prüft ob das Spiel beendet ist, funktiioniert noch nicht!
    if (pictures.length === 0) {
      setIsGameFinished(true);
      handleGameEnd();

    }
  
  const handleGameEnd = () => {
    let finalEvaluation = "";
    if (score >= 130) {
      finalEvaluation = "Excellent! You sorted everything correctly!";
    } else if (score >= 100) {
      finalEvaluation = "Good job! You got most items right.";
    } else {
      finalEvaluation = "You can do better! Try again to improve your score.";
    }
    setEvaluation(finalEvaluation);
    console.log("Game has ended. Final score:", score);
    alert(`Game finished! Your final score is: ${score}`);
  };

    console.log(isGameFinished);
    console.log(pictures.length);

  };

  //erstellt die Drop Bereiche
  const [blueDrop,blueIsOver] = useCreateDrop (setBlueBoard);
  const [greenDrop,greenIsOver] = useCreateDrop (setGreenBoard);
  const [yellowDrop,yellowIsOver] = useCreateDrop (setYellowBoard);
  const [grayDrop,grayIsOver] = useCreateDrop (setGrayBoard);

  //setzt die Boards zurück
  const resetBoards = () => {
    setBlueBoard([]);
    setYellowBoard([]);
    setGreenBoard([]);
    setGrayBoard([]);
    setPictures(PictureList);
    setIsGameFinished(false);
    setScore(0); // Punktzahl zurücksetzen
    setEvaluation(""); // Auswertung zurücksetzen
  };
 //navigiert zum nächsten Spiel, in dem zu der Liste der Games
  const nextGame = () => {
    navigate('/play/recycling/recyclebar/:id');
    
  };
  //Frontend ansicht
  return (
    
    <>
    <div className="Müll Sortieren Spiel">
      <h1 style={{ fontSize: '25px', fontWeight: 'bold', color: '#BC2A6E'  }}>Müll Sortieren Spiel</h1>
      <h2 style={{ fontSize: '15px', fontWeight: 'bold' }}>was gehört in welche Tonne?</h2>
      
    </div>
      
     <div className="Score"> {/*Anzeige des Punktestands */}
      <p style={{ fontWeight: 'bold', color: '#70BBFF' }}>Score: {score}</p>
    </div>

    <div className="Pictures">
        {/* die Items die noch in der Liste sind */} 
        {pictures.map((picture) => {
          return <Picture url={picture.url} id={picture.id} key={picture.id} />;
        })}
    </div>

    <div className="ResetButton">
         <button 
            onClick={resetBoards} style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px' }}>Noch mal spielen
            </button>
            <button
            onClick={nextGame} style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px', marginLeft: '10px' }}>Nächstes Spiel
          </button>
    </div>

      {/* die Boards in denen die Items abgelegt werden können */}
      <div className="BoardsContainer">
        <div className="BlueBoard" ref={blueDrop}>
          {blueBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
        </div>
        <div className="GreenBoard" ref={greenDrop}>
          {greenBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
        </div>
        <div className="YellowBoard" ref={yellowDrop}>
          {yellowBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
         
        </div>
        <div className="GrayBoard" ref={grayDrop}>
          {grayBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
          </div>
      </div>
      
           {/* Display final evaluation when the game is finished */}
      {isGameFinished && (
        <div className="Evaluation">
          <h3>Game Finished!</h3>
          <p>{evaluation}</p> {/* Display evaluation */}
        </div>
      )}
          
    </>
  );
}

export default DragDrop;

