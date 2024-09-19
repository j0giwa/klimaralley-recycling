/**
 * Autor: Josiane tanga 
 * Autor: Gizem
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `Title`-Komponente zeigt eine Frage mit einem Titel und einer Indexnummer an.
 * Der Titel wird als Hauptüberschrift und der Index als Unterüberschrift dargestellt.
 * 
 * Props:
 * - `title` (string): Der Text der Frage oder des Titels, der angezeigt werden soll.
 * - `index` (number): Die Indexnummer der Frage, die in der Überschrift angezeigt wird.
 */

const Title = ({ title, index }) => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Frage-{index + 1}</h2>
        <p className="text-gray-700 mb-4">{title}</p>
      </div>
    );
  };
  
  export default Title; 
  