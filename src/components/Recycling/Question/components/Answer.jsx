import React from "react";


/**
 * Autor: Josiane Tanga 
 * Autor: Gizem
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `Answer`-Komponente stellt einen Button dar, der in der Benutzeroberfläche verwendet wird. 
 * Sie nimmt Eigenschaften wie den Titel, die Hintergrundfarbe und eine Klick-Handler-Funktion entgegen, 
 * um einen anpassbaren und wiederverwendbaren Button bereitzustellen.
 * 
 * Props:
 * - `title` (string): Der Text, der auf dem Button angezeigt wird.
 * - `backgroundColor` (string): Die Hintergrundfarbe des Buttons.
 * - `onClick` (function): Eine Funktion, die beim Klicken des Buttons aufgerufen wird.
 */

const Answer = ({ title, backgroundColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor }}
      className="text-white px-4 py-2 rounded"
    >
      {title}
    </button>
  );
};

export default Answer;
