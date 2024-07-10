import React from 'react';
import { useDrag } from 'react-dnd';
import './GameRecyclebar.css';

const DragItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id: item.id, recyclable: item.recyclable },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="draggable-item"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={item.src} alt={item.type} />
    </div>
  );
};

export default DragItem;
