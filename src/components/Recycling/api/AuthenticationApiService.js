import { apiClient } from "./ApiClient";

/**
 * 
 * 
 * Autor: Jeffrey Böttcher
 * 
 * Beschreibung:
 * Führt die JWT-Authentifizierung durch, um ein Token zu erhalten.
 * 
 * Diese Funktion sendet eine POST-Anfrage an den API-Endpunkt `/authenticate`, um die Authentifizierung eines Benutzers durchzuführen.
 * Die Anmeldeinformationen (Benutzername und Passwort) werden an den Server übermittelt, der im Erfolgsfall ein JWT-Token zurückgibt.
 * 
 * Parameter:
 * - `username` (string): Der Benutzername des Benutzers, der sich anmelden möchte.
 * - `password` (string): Das Passwort des Benutzers.
 * 
 * Rückgabewert:
 * - Ein Promise, das das Ergebnis der POST-Anfrage enthält. Die Antwort des Servers wird is ein JSON-Objekt,
 *   das ein JWT-Token enthält, wenn die Authentifizierung erfolgreich war.
 * */

export function executeJWTAuthenticationService(username, password) {
    return apiClient.post("/authenticate", {username,password})}