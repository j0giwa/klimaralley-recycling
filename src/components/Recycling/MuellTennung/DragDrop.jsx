import React, { useState } from 'react';
import Picture from './Picture';
import { useDrop } from 'react-dnd';
import "./muellTrennung.css";
import { useNavigate } from 'react-router-dom';

const PictureList = [
  {
    id: 1, //Zeitung
    url: "https://cdn.pixabay.com/photo/2016/05/24/18/22/newspapers-1412940_1280.png",
    boardId: 1
  },
  {
    id: 2, //Karton
    url: "https://cdn.pixabay.com/photo/2012/02/25/19/00/beige-16875_1280.jpg",
    boardId: 1
  },
  {
    id: 3, // Roll
    url: "https://cdn.pixabay.com/photo/2016/03/05/22/12/roll-1239215_1280.jpg",
    boardId: 1
  },
  {
    id: 4,//Briefe 
    url: "https://cdn.pixabay.com/photo/2016/09/10/17/17/letters-1659715_1280.jpg",
    boardId: 1
  },
  {
    id: 5, // Karton2 
    url: "https://cdn.pixabay.com/photo/2023/08/26/08/56/ai-generated-8214465_1280.jpg",
    boardId: 1
  },
  
  {
    id: 6, //Apfel
    url: "https://cdn.pixabay.com/photo/2022/09/18/20/57/apples-7464059_1280.jpg",
    boardId: 2
  },
  {
    id: 7, //Kartoffelschale
    url: "https://cdn.pixabay.com/photo/2014/05/14/16/15/potato-skins-344185_1280.jpg",
    boardId: 2
  },
  {
    id: 8, //Brot
    url: "https://cdn.pixabay.com/photo/2019/05/06/14/24/bread-4183225_1280.jpg",
    boardId: 2
  },
  {
    id: 9, //Blätter
    url: "https://cdn.pixabay.com/photo/2018/11/18/16/31/leaves-3823499_1280.jpg",
    boardId: 2
  },
  {
    id: 10, //Eier
    url: "https://cdn.pixabay.com/photo/2019/02/17/11/06/egg-4002016_1280.jpg",
    boardId: 2
  },
  {
    id: 11, //Muscheln
    url: "https://cdn.pixabay.com/photo/2017/01/16/15/13/shells-1984293_1280.png",
    boardId: 3
  },
  {
    id: 12, //Verpackung
    url: "https://cdn.pixabay.com/photo/2024/04/29/14/47/packing-8728105_1280.jpg",
    boardId: 3
  },
  {
    id: 13, //Joghurt-Becher
    url: "https://cdn.pixabay.com/photo/2016/03/14/09/41/garbage-1255244_1280.jpg",
    boardId: 3
  },
  {
    id: 14, //Shampoo-Flasche
    url: "https://cdn.pixabay.com/photo/2019/02/01/19/12/plastic-3969638_1280.jpg",
    boardId: 3
  },
  {
    id: 15, //Becher
    url: "https://cdn.pixabay.com/photo/2018/07/15/21/04/recycle-3540561_1280.jpg",
    boardId: 3
  },
  {
    id: 16, //Toilette
    url: "https://cdn.pixabay.com/photo/2012/02/22/20/05/bathroom-15565_1280.jpg",
    boardId: 4
  },
  {
    id: 17, //Teekanne
    url: "https://cdn.pixabay.com/photo/2014/03/24/18/25/teapot-295570_1280.jpg",
    boardId: 4
  },
  {
    id: 18, //Tassen
    url: "https://cdn.pixabay.com/photo/2020/01/29/13/47/connection-4802578_1280.jpg",
    boardId: 4
  },
  {
    id: 19, //Virus
    url: "https://cdn.pixabay.com/photo/2018/02/25/17/19/viruses-3181157_1280.jpg",
    boardId: 4
  },
  {
    id: 20, //Kerzen
    url: "https://cdn.pixabay.com/photo/2016/07/27/21/38/candles-1546499_1280.jpg",
    boardId: 4
  },
  

]

function DragDrop() {

  const navigate = useNavigate();
  const [blueBoard, setBlueBoard] = useState([]);
  const [greenBoard, setGreenBoard] = useState([]);
  const [yellowBoard, setYellowBoard] = useState([]);
  const [grayBoard, setGrayBoard] = useState([]);

  const [pictures, setPictures] = useState(PictureList);

  const [isGameFinished, setIsGameFinished] = useState(false);

  const createDrop = (boardSetter) => {
    return useDrop(() => ({
      accept: "image",
      drop: (item) => addImageToBoard(item.id, boardSetter),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }))[1];
  };

  const addImageToBoard = (id, boardSetter) => {
    const picture = pictures.find((picture) => id === picture.id);
   
    if (!picture) {
      console.log("Picture not found in PictureList");
      return;
    }
    const boardId = picture.boardId;

    
    if (boardId === 1 && boardSetter === setBlueBoard) {
      setBlueBoard((board) => [...board, picture]);
    } else if (boardId === 2 && boardSetter === setGreenBoard) {
      setGreenBoard((board) => [...board, picture]);
    } else if (boardId === 3 && boardSetter === setYellowBoard) {
      setYellowBoard((board) => [...board, picture]);
    } else if (boardId === 4 && boardSetter === setGrayBoard) {
      setGrayBoard((board) => [...board, picture]);
    } else {
      console.log("This item can't be added to the board");
      return;
    }

    setPictures((prevPictures) => prevPictures.filter((p) => p.id !== id));

    if (pictures.length === 1) {
      setIsGameFinished(true);
    }

    console.log(isGameFinished);
    console.log(pictures.length);

  };

  const blueDrop = createDrop(setBlueBoard);
  const greenDrop = createDrop(setGreenBoard);
  const yellowDrop = createDrop(setYellowBoard);
  const grayDrop = createDrop(setGrayBoard);

  const resetBoards = () => {
    setBlueBoard([]);
    setYellowBoard([]);
    setGreenBoard([]);
    setGrayBoard([]);
    setPictures(PictureList);
    setIsGameFinished(false);
  };

  const nextGame = () => {
    navigate('/games');
    
  };

  return (
    <>

      <div className="Pictures">
        {pictures.map((picture) => {
          return <Picture url={picture.url} id={picture.id} key={picture.id} />;
        })}
      </div>

      <div className="ResetButton">
        <button onClick={resetBoards} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' >Items zurücklegen</button>
         <button onClick={nextGame} className='btn btn-success'>Nächstes Spiel</button>
      </div>


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
      
          
    </>
  );
}

export default DragDrop;
