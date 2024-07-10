import React from 'react';
import { useDrop } from 'react-dnd';
import './GameRecyclebar.css';

const DropZone = ({ recyclable, onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item) => onDrop(item, recyclable),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className={`drop-zone ${isOver ? 'highlight' : ''}`}
      ref={drop}
    >
      {children}
    </div>
  );
};

export default DropZone;
