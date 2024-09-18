
import { useDrag } from "react-dnd";


/**
 * Picture-Komponente
 * 
 * Autor: Jeffrey Böttcher
 * Autor: Mohamed
 * 
 * Beschreibung:
 * Diese Komponente stellt ein Bild dar, das in einem Drag-and-Drop-Szenario verwendet wird. Das Bild kann in verschiedene Drop-Zonen gezogen werden, um eine Interaktion zu ermöglichen.
 * Die Komponente nutzt `react-dnd`, um Drag-and-Drop-Funktionalität bereitzustellen.
 * 
 * Funktionen:
 * - `useDrag`: Ein Hook von `react-dnd`, der das Bild als draggable (ziehbar) markiert und es ermöglicht, dass das Bild per Drag-and-Drop bewegt werden kann.
 * - `collect`: Ein Callback, der den Dragging-Zustand des Bildes verfolgt und einen visuellen Hinweis gibt, ob das Bild gerade gezogen wird.
 * 
 * Props:
 * - `id`: Die eindeutige Identifikationsnummer des Bildes, die für Drag-and-Drop-Zwecke verwendet wird.
 * - `url`: Die URL des Bildes, das angezeigt wird.
 * 
 * Die Darstellung des Bildes ändert sich visuell während des Ziehvorgangs, indem eine pinke Umrandung hinzugefügt wird, wenn das Bild gerade gezogen wird.
 * 
 * Die Komponente verwendet den `ref` von `useDrag`, um den Drag-and-Drop-Ereignissen zu lauschen und die entsprechenden Stile anzuwenden.
 */

function Picture({ id, url }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      src={url}
      width="100px" //Picture width.
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    />
  );
}

export default Picture;