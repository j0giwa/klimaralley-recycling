import React, { useState } from 'react';
import Picture from './Picture';
import { useDrop } from 'react-dnd';
import "./muellTrennung.css";
import { useNavigate } from 'react-router-dom';


// TODO: viertes Board anlegen! als Graue Müllltonne!

// Liste der "Items" die in die Boards gezogen werden können
// boardId beschreibt welches Item das Board akzeptiert 1 = Blau, 2 = Grün, 3 = Gelb 4 
const PictureList = [
  {
    id: 1, //Fleisch
    url: "https://img.freepik.com/free-vector/floating-beef-steak-cartoon-vector-icon-illustration-food-object-icon-concept-isolated-flat-cartoon_138676-4312.jpg",
    boardId: 2 
  },
  {
    id: 2, //Knochen
    url: "https://images.vexels.com/media/users/3/327154/isolated/preview/17f8d9ed785f1023b4b4ce9824214db2-bone-icon.png",
    boardId: 2
  },
  {
    id: 3, // Dose 
    url: "https://w7.pngwing.com/pngs/331/107/png-transparent-tin-can-old-background-miscellaneous-metal-aluminium-thumbnail.png",
    boardId: 3
  },
  {
    id: 4,//Batterie 
    url: "https://w7.pngwing.com/pngs/420/423/png-transparent-batteries-png-transparent-battery-battery-icon-two-batteries-2-batteries-icon-battery-thumbnail.png",
    boardId: 3
  },
  {
    id: 5, // Karton 
    url: "https://w7.pngwing.com/pngs/794/375/png-transparent-ukraine-paper-cardboard-vendor-postage-stamps-karton-angle-rectangle-cardboard-thumbnail.png",
    boardId: 1
  },
  {
    id: 6, //Flasche
    url: "https://w7.pngwing.com/pngs/680/59/png-transparent-green-glass-bottle-illustration-beer-bottle-glass-bottle-green-beer-bottle-glass-wine-green-apple-thumbnail.png",
    boardId: 3
  },
  {
    id: 7, //Kleidung
    url: "https://w7.pngwing.com/pngs/760/991/png-transparent-folded-shirts-illustration-clothing-computer-file-clean-clothes-textile-baby-clothes-woolen-thumbnail.png",
    boardId: 3
  }]

function DragDrop() {

  const navigate = useNavigate();
  
  // die Boards in denen die Items abgelegt werden können
  const [blueBoard, setBlueBoard] = useState([]);
  const [greenBoard, setGreenBoard] = useState([]);
  const [yellowBoard, setYellowBoard] = useState([]);

  //die Items die noch in der Liste sind
  const [pictures, setPictures] = useState(PictureList);

  // für die abfrage ob das Spiel beendet ist
  const [isGameFinished, setIsGameFinished] = useState(false);


  // Funktion um ein Drop zu erstellen 
  // boardSetter ist die Funktion die das Board setzt
  const createDrop = (boardSetter) => {
    return useDrop(() => ({
      accept: "image",
      drop: (item) => addImageToBoard(item.id, boardSetter), //wenn ein Item gedroppt wird wird es dem richtigen Board hinzugefügt. Ruft die Metode  addImageToBoard auf
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }))[1];
  };


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
    } else if (boardId === 2 && boardSetter === setGreenBoard) {
      setGreenBoard((board) => [...board, picture]);
    } else if (boardId === 3 && boardSetter === setYellowBoard) {
      setYellowBoard((board) => [...board, picture]);
    } else {
      console.log("This item can't be added to the board");
      return;
    }

    setPictures((prevPictures) => prevPictures.filter((p) => p.id !== id)); //entfernt das Bild aus der Liste der Items

    //prüft ob das Spiel beendet ist, funktiioniert noch nicht!
    if (pictures.length === 1) {
      setIsGameFinished(true);
    }

    console.log(isGameFinished);
    console.log(pictures.length);

  };

  //erstellt die Drop Bereiche
  const blueDrop = createDrop(setBlueBoard);
  const greenDrop = createDrop(setGreenBoard);
  const yellowDrop = createDrop(setYellowBoard);

  //setzt die Boards zurück
  const resetBoards = () => {
    setBlueBoard([]);
    setYellowBoard([]);
    setGreenBoard([]);
    setPictures(PictureList);
    setIsGameFinished(false);
  };
 //navigiert zum nächsten Spiel, in dem zu der Liste der Games
  const nextGame = () => {
    navigate('/games');
    
  };
  //Frontend ansicht
  return (
    <>

      <div className="Pictures">
        {/* die Items die noch in der Liste sind */} // 
        {pictures.map((picture) => {
          return <Picture url={picture.url} id={picture.id} key={picture.id} />;
        })}
      </div>

      <div className="ResetButton">
        <button onClick={resetBoards} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' >Items zurücklegen</button>
         <button onClick={nextGame} className='btn btn-success'>Nächstes Spiel</button>
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
      </div>
    </>
  );
}

export default DragDrop;
