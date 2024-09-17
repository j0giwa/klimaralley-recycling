/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `LogoutComponent`-Komponente zeigt eine Nachricht an, die dem Benutzer mitteilt, dass er erfolgreich ausgeloggt wurde.
 * Zudem enthält sie eine freundliche Botschaft, die dem Benutzer für die Nutzung der App dankt.
 */

export default function LogoutComponent() {
    return (
        <div className="LogoutComponent">
            <h1>Sie sind ausgeloggt</h1>
            <div>
                Wir hoffen du hattest Spaß mit der App!
            </div>
        </div>
    )
}