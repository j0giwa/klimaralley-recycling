

/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `ErrorComponent`-Komponente wird angezeigt, wenn ein Benutzer auf eine Seite zugreift, die noch nicht fertiggestellt 
 * oder verfügbar ist. Sie zeigt eine einfache Fehlermeldung und entschuldigt sich für die Unannehmlichkeiten.
 */

export default function ErrorComponent() {
    return (
        <div className="ErrorComponent">
            <h1>Die Seite befindet sich noch im Aufbau!</h1>
            <div>
                Entschuldigung für den Fehler! Wir arbeiten dran!
            </div>
        </div>
    )
}