//import React from 'react'   
import Picture from './Picture';
import { useDrop } from 'react-dnd';
import React, { useState } from 'react';
import "../App.css";

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
    const [board, setBoard] = useState([]);
  
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "image",
      drop: (item) => addImageToBoard(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    const addImageToBoard = (id) => {
      const pictureList = PictureList.filter((picture) => id === picture.id);
      setBoard((board) => [...board, pictureList[0]]);
    };
    return (
      <>
        <div className="Pictures">
          {PictureList.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />;
          })}
        </div>
        <div className="Board" ref={drop}>
          {board.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />;
          })}
        </div>
      </>
    );
  }
  
  export default DragDrop;