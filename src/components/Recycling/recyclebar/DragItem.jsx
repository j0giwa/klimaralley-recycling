import React from 'react';
import { useDrag } from 'react-dnd';
import './GameRecyclebar.css';

/**
 * DragItem Component
 * 
 * @author Josiane tanga 
 * @author Jeffrey Böttcher
 * @version 1.0.0
 * 
 * @description
 * Diese Komponente stellt ein Drag-and-Drop-fähiges Item dar, das in eine Drop-Zone gezogen werden kann.
 * Die Komponente verwendet die `useDrag`-Hook von `react-dnd` (React Drag and Drop) für die Drag-and-Drop-Funktionalität.
 * Beim Ziehen des Items wird die Opazität reduziert, um visuelles Feedback zu geben.
 * 
 * Props:
 * - `item` (object): Das Item, das gezogen werden kann. Es enthält die folgenden Eigenschaften:
 *   - `id` (string | number): Eine eindeutige Kennung des Items.
 *   - `recyclable` (boolean): Gibt an, ob das Item recyclebar ist oder nicht.
 *   - `url` (string): Die URL des Bildes, das das Item darstellt.
 *   - `type` (string): Der Typ des Items, der für das Alt-Attribut des Bildes verwendet wird.
 */

const DragItem = ({ item }) => {
  // useDrag Hook von react-dnd, um Drag-and-Drop-Funktionalität zu ermöglichen
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item', // Definiert den Typ des Items für das Drag-and-Drop-System
    item: { id: item.id, recyclable: item.recyclable }, // Das Item, das gezogen wird
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Zeigt an, ob das Item gerade gezogen wird
    }),
  }));

  return (
    <div
      className="draggable-item"
      ref={drag} // Referenz für das ziehbare Element
      style={{ opacity: isDragging ? 0.5 : 1 }} // Reduziert die Opazität, wenn das Item gezogen wird
    >
      <img src={item.url} alt={item.type} /> {/* Bild des Items */}
    </div>
  );
};

export default DragItem;