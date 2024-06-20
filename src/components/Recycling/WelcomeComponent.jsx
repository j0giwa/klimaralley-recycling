import { Link, useParams } from 'react-router-dom'
import './RecyclingApp.css'
import React from 'react'

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