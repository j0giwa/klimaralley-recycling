import React from 'react';
import { useDrop } from 'react-dnd';
import './GameRecyclebar.css';

/**
 * DropZone Component
 * 
 * @author Josy
 * @author Jeffrey Böttcher
 * @version 1.0.0
 * 
 * @description
 * Diese Komponente stellt eine Drop-Zone dar, in die Items per Drag & Drop abgelegt werden können. 
 * Die Drop-Zone wird durch ein Highlight angezeigt, wenn sich ein Item darüber befindet.
 * Die Komponente verwendet die `useDrop`-Hook von `react-dnd` (React Drag and Drop) für die Drag-and-Drop-Funktionalität.
 * 
 * Props:
 * - `recyclable` (boolean): Gibt an, ob die Drop-Zone für recyclebare Items oder nicht recyclebare Items gedacht ist.
 * - `onDrop` (function): Callback-Funktion, die aufgerufen wird, wenn ein Item in die Drop-Zone abgelegt wird.
 * - `children` (node): Die Elemente, die innerhalb der Drop-Zone angezeigt werden (z.B. Text oder Labels).
 */

import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ recyclable, onDrop, children }) => {
  // useDrop Hook von react-dnd, um Drag-and-Drop-Funktionalität zu ermöglichen
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item', // Definiert den Typ der akzeptierten Items
    drop: (item) => onDrop(item, recyclable), // Callback bei Drop-Ereignis
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Zeigt an, ob ein Item über der Drop-Zone ist
    }),
  }));

  return (
    <div
      className={`drop-zone ${isOver ? 'highlight' : ''}`} // Fügt Highlight-Klasse hinzu, wenn ein Item über der Drop-Zone ist
      ref={drop} // Referenz für die Drop-Zone
    >
      {children} {/* Rendern von Kind-Elementen innerhalb der Drop-Zone */}
    </div>
  );
};

export default DropZone;
