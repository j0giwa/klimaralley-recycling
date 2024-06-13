import React, { useState } from 'react';
import Picture from './Picture';
import { useDrop } from 'react-dnd';
import "./muellTrennung.css";

const PictureList = [
    {
        id: 1, //Fleisch
        url:"https://img.freepik.com/free-vector/floating-beef-steak-cartoon-vector-icon-illustration-food-object-icon-concept-isolated-flat-cartoon_138676-4312.jpg"
    },
    {
        id: 2, //Knochen
        url:"https://images.vexels.com/media/users/3/327154/isolated/preview/17f8d9ed785f1023b4b4ce9824214db2-bone-icon.png"
    },
    {
        id: 3, // Dose 
        url:"https://w7.pngwing.com/pngs/331/107/png-transparent-tin-can-old-background-miscellaneous-metal-aluminium-thumbnail.png"
    },
    {
        id: 4,//Batterie 
        url:"https://w7.pngwing.com/pngs/420/423/png-transparent-batteries-png-transparent-battery-battery-icon-two-batteries-2-batteries-icon-battery-thumbnail.png"
    },
    {
        id: 5, // Karton 
        url:"https://w7.pngwing.com/pngs/794/375/png-transparent-ukraine-paper-cardboard-vendor-postage-stamps-karton-angle-rectangle-cardboard-thumbnail.png"
    },
    {
        id: 6, //Flasche
        url:"https://w7.pngwing.com/pngs/680/59/png-transparent-green-glass-bottle-illustration-beer-bottle-glass-bottle-green-beer-bottle-glass-wine-green-apple-thumbnail.png"
    },
    {
        id: 7, //Kleidung
        url:"https://w7.pngwing.com/pngs/760/991/png-transparent-folded-shirts-illustration-clothing-computer-file-clean-clothes-textile-baby-clothes-woolen-thumbnail.png"
    }] 

function DragDrop() {
    const [blueBoard, setBlueBoard] = useState([]);
    const [greenBoard, setGreenBoard] = useState([]);
    const [yellowBoard, setYellowBoard] = useState([]);

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
        const pictureList = PictureList.filter((picture) => id === picture.id);
        boardSetter((board) => [...board, pictureList[0]]);
    };

    const blueDrop = createDrop(setBlueBoard);
    const greenDrop = createDrop(setGreenBoard);
    const yellowDrop = createDrop(setYellowBoard);

    return (
      <>
      
        <div className="Pictures">
          {PictureList.map((picture) => {
            return <Picture url={picture.url} id={picture.id} key={picture.id} />;
          })}
        </div> 
        <div className="Controls">
                {/* <button className='resetButton' >Reset Boards</button> 
                onClick={resetBoards} */}
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
        </div>
      </>
    );
}

export default DragDrop;
