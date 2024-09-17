import React from "react";


/**
 * Autor: Josy
 * Autor: Josy
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `ProgressBar`-Komponente stellt eine Fortschrittsanzeige dar, die den Fortschritt
 * in Form eines Balkens anzeigt. Die Breite des Balkens wird durch den `percentage`-Prop
 * bestimmt, und die Farbe des Balkens wird durch den `color`-Prop festgelegt.
 * 
 * Props:
 * - `percentage` (number): Der Fortschrittswert in Prozent, der die Breite des gefüllten Bereichs bestimmt.
 * - `color` (string): Die Basisfarbe für die Fortschrittsanzeige, z.B. "blue", "green", etc.
 */
const  ProgressBar = ({ percentage, color }) => {
  return (
    <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${color}-200`}>
      <div
        style={{ width: `${percentage}%` }}
        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
      ></div>
    </div>
  );
};

export default ProgressBar;
