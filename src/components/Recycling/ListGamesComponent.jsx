import { useState } from 'react'
import { deleteGameApi, retrieveAllGamesForUserApi } from "./api/GameApiService"
import { useEffect } from 'react';
import { useAuth } from "./security/AuthContext.jsx"
import {  useNavigate } from "react-router-dom"



export default function ListGamesComponent() {


    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    const [games, setGames] = useState([])
    const [message, setMessage] = useState(null)


    useEffect(() => refreshGames(), [])

    function refreshGames() {
        retrieveAllGamesForUserApi(username)
            .then(
                response => {
                    setGames(response.data)
                    console.log(response.data)
                }
            )
            .catch(error => console.log(error))
    }

    function startGame(id) {   
        if(id === 10001) {
            startQuiz(id);
        } else if(id === 10002) {
            startMüllSortieren();
        } else {
            navigate(`/game/${id}`);
        } 
    }

    function startQuiz(id) {       
        navigate(`/quiz/${id}`)  
    }
    
    function startMüllSortieren() {
        console.log("clicked")  
        navigate(`/muellsortieren`)  
    }

    

    return (
        <div className="ListGamesComponent">
            <h1>Recycling Spiele</h1>
            {message && <div className='alert alert-warning'>{message}</div>}

            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Spielname</th>
                            <th>Zuende gespielt?</th>
                            {/* <th>Delete</th> */}
                            <th>Erfolgreich</th>
                            <th>Anzahl der Punkte</th>
                            <th>Spiel Starten</th>


                        </tr>
                    </thead>
                    <tbody>

                         {/* <button className='btn btn-success' onClick={ startQuiz }>quiz</button> 
                         <button className='btn btn-success' onClick={ startMüllSortieren }>Müll sortieren</button>  */}

                    {
                            games.map(
                                game => (
                                    <tr key={game.id}>
                                        {/* <td>{game.id}</td> */}
                                        <td>{game.description}</td>
                                        <td>{game.done.toString()}</td>
                                        {/* <td><button className='btn btn-warning' onClick={() => deleteGame(game.id)}>Delete</button></td> */}    
                                        <td>{game.success.toString()}</td>
                                        <td>{game.points}</td>
                                        <td><button className='btn btn-success' onClick={() => startGame(game.id)}>Start</button></td>
                                    </tr>
                                )
                            )
                        }
                        
                        
                        {/* <tr >

                            <td>backend anbindung</td>
                            <td>backend</td>
                            <td><button className='btn btn-success' onClick={() => startGame(game)} >Spiel Starten</button></td>
                        </tr> */}



                    </tbody>
                </table>
            </div>
        </div>
    )
}