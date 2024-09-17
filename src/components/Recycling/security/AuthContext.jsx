import React, { createContext, useContext, useState } from "react";
import {  executeJWTAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Der `AuthContext` stellt den Authentifizierungszustand und Authentifizierungsoperationen 
 * für die gesamte Anwendung zur Verfügung. Die `AuthProvider`-Komponente verwaltet 
 * die Authentifizierung und gibt den Status sowie Funktionen zur Anmeldung und Abmeldung 
 * an untergeordnete Komponenten weiter.
 */

// Erstellen des Authentifizierungs-Kontexts
export const AuthContext = createContext();

// Hook zum Zugriff auf den Authentifizierungs-Kontext
export const useAuth = () => useContext(AuthContext);

/**
 * Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Der `AuthProvider`-Komponente bietet den Authentifizierungs-Kontext für die untergeordneten Komponenten. 
 * Sie verwaltet den Anmeldestatus, das Benutzername und das Token. Sie enthält Funktionen zur 
 * Anmeldung (`login`) und Abmeldung (`logout`).
 */
export default function AuthProvider({ children }) {

  // State-Variablen zur Verwaltung des Authentifizierungsstatus
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // Funktion zur Anmeldung
  async function login(username, password) {
    try {
      // Authentifizierung durchführen und Token erhalten
      const response = await executeJWTAuthenticationService(username, password);
      const jwtToken = 'Bearer ' + response.data.token;
      
      // Erfolgreiche Anmeldung
      if (response.status === 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        // API-Client mit JWT-Token konfigurieren
        apiClient.interceptors.request.use(
          (config) => {
            config.headers.Authorization = jwtToken;
            return config;
          }
        );

        return true;
      } else {
        console.error('Es gab einen Fehler:', response.statusText);
        logout(); // Abmelden des Benutzers bei Fehler
        return false;
      }
    } catch (error) {
      console.error('Es gab einen Fehler:', error.message);
      logout(); // Abmelden des Benutzers bei Fehler
      return false;
    }
  }

  // Funktion zum Abmelden des Benutzers
  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}