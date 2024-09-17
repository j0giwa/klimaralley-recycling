import { Link, useParams } from 'react-router-dom'
import './RecyclingApp.css'
import React from 'react'


/**
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `WelcomeComponent`-Komponente zeigt eine Willkommensnachricht für den Benutzer an, der sich mit einem Benutzernamen
 * authentifiziert hat. Der Benutzername wird aus den URL-Parametern extrahiert. Außerdem wird ein Link angezeigt, 
 * der den Benutzer zu einer Seite mit seinen Spielen führt.
 */
export default function WelcomeComponent() {

    const { username } = useParams()
   
    return (
        <div className="Welcome">
            <h1>Willkommen {username}</h1>
            <div >
                Deine Spiele. <Link to='/play/recycling/games'>Klick hier</Link>
            </div>
        </div>
    )

}