
import axios from "axios";

/**
 * Autor: Jeffrey Böttcher
 * 
 * Beschreibung:
 * Verbindet die Anwendung mit dem Backend-Server über eine HTTP-Anfragebibliothek.
 **/

// Erzeugt eine Instanz von 'axios' mit vordefinierten Konfigurationen
export const apiClient = axios.create({
    // Basis-URL für alle Anfragen, die mit dieser Instanz gesendet werden
    baseURL: 'http://localhost:8080'
    
    // Hier können weitere Konfigurationen hinzugefügt
});
