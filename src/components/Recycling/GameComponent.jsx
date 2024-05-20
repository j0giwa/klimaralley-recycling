import { useParams } from "react-router-dom"
import { retrieveGameApi } from "./api/GameApiService"
import { useAuth } from "./security/AuthContext.jsx"
import { useEffect, useState } from "react"


export default function GameComponent(){
    
    const { id } = useParams()

    const [description, setDescription] = useState('')

    const authContext = useAuth 


    const username = authContext.username

    useEffect(
        ()=> retrieveGames(),
        [id]
    )

    function retrieveGames(){
        retrieveGameApi(username, id)
        .then(response =>{

           setDescription(response.data.description)

        } )
        .catch(error => console.log(error))

    }

    return(
        <div className="container">
            <h1>Start des Spiels:</h1>
            <div>
                {description}
            </div>
        </div>
    )
}