import { apiClient } from './ApiClient.js';


/**
 * 
 * 
 * Autor: Jeffrey Böttcher
 * 
 * Beschreibung:
 * Diese Funktion sendet eine GET-Anfrage an den API-Endpunkt `/recyclingapi/players/username/{username}`, um die Details eines Spielers zu erhalten,
 * der durch den angegebenen Benutzernamen identifiziert wird.
 * 
 * Parameter:
 * - `username` (string): Der Benutzername des Spielers, dessen Daten abgerufen werden sollen.
 * 
 * Rückgabewert:
 * - Ein Promise, das das Ergebnis der GET-Anfrage enthält. Die Antwort des Servers ist ein JSON-Objekt,
 *   das die Spielerinformationen enthält.
 * */

export function getPlayerByUsernameApi(username) {
    return apiClient.get(`/recyclingapi/players/username/${username}`);
}
