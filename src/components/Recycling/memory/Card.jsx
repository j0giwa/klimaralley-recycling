import React from 'react';

/**
 * Card Component - Repräsentiert eine einzelne Karte im Memory-Spiel.
 * 
 * Beschreibung:
 * Diese Komponente zeigt eine Karte mit Vorder- und Rückseite an. Sie verwendet Props, um festzustellen,
 * ob die Karte bereits umgedreht oder Teil eines gefundenen Paars ist. Die Vorderseite zeigt ein Bild,
 * das über eine URL geladen wird, während die Rückseite ein festes Bild darstellt. Wenn auf die Karte
 * geklickt wird, wird die entsprechende Funktion aufgerufen, die im Memory-Spiel die Spielmechanik steuert.
 * 
 * Version: 1.0
 * Author: Philip 
 * Author: Gizem
 */
const Card = ({ id, type, url, handleClick, isMatched, flipped }) => (
  // Das Haupt-Div der Karte. Es fügt je nach Zustand (umgedreht oder gepaart) dynamische Klassen hinzu.
  <div
    className={`card ${flipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`} 
    onClick={() => handleClick(id)} // Bei Klick auf die Karte wird die entsprechende Funktion aufgerufen
  >
    {/* Container für die Vorder- und Rückseite der Karte */}
    <div className="card-inner">
      {/* Vorderseite der Karte mit dem Bild, das über die URL geladen wird */}
      <div className="card-front">
        <img src={url} alt={type} /> {/* Das Bild, das den Kartentyp repräsentiert */}
      </div>
      {/* Rückseite der Karte mit einem festen Bild für alle Karten */}
      <div className="card-back">
        <img src="https://cdn.pixabay.com/photo/2015/09/12/23/48/stripes-937568_1280.jpg" alt="Rueckseite der Karte" /> {/* Bild für die Rückseite der Karte */}
      </div>
    </div>
  </div>
);

export default Card;