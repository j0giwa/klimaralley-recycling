
/**
 * Autor: Josy
 * Autor: Gizem
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `Image`-Komponente rendert ein Bild mit bestimmten Stilen. 
 * Sie erhält die Bildquelle und einen Index als Props, um das Bild anzuzeigen.
 * Der `alt`-Text des Bildes wird basierend auf dem Index der Frage generiert.
 * 
 * Props:
 * - `image` (string): Die URL oder der Pfad des anzuzeigenden Bildes.
 * - `index` (number): Der Index der Frage, der im `alt`-Text des Bildes verwendet wird.
 */

const Image = ({ image, index }) => {
    return (
      <>
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={image}
          alt={`Frage-${index + 1}`}
        />{" "}
      </>
    );
  };
  
  export default Image;
  