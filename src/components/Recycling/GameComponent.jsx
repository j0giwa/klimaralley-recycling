import { useNavigate, useParams } from "react-router-dom"
import { retrieveGameApi, updateGameApi } from "./api/GameApiService"
import { useAuth } from "./security/AuthContext.jsx"
import { useEffect, useState } from "react"


export default function GameComponent() {

    const { id } = useParams()

    const [description, setDescription] = useState('')

    const authContext = useAuth()

    const navigate = useNavigate()


    const username = authContext.username


    const [game, setGame] = useState({
        points: 0,
        id: id,
        username: username,
        done: false,
        success: false
    });

    useEffect(
        () => retrieveGames(),
        [id]
    )

    function retrieveGames() {
        if (id != -1) {
            retrieveGameApi(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setGame(prevGame => ({
                        ...prevGame,
                        description: response.data.description,
                        points: response.data.points,
                        done: response.data.done,
                        success: response.data.success
                    }));
                })
                .catch(error => console.log(error))
        }
    }


    function changeGameDone() {
        const updatedGame = {
            ...game,
            done: true
        };

        updateGameApi(username, id, updatedGame)
            .then(() => {
                navigate('/play/recycling/games');
            })
            .catch(error => console.log(error));

        console.log(updatedGame);
        console.log("clicked");
    }


    function changeGameSuccess() {
        const updatedGame = {
            ...game,
            success: true
        };

        updateGameApi(username, id, updatedGame)
            .then(() => {
                navigate('/play/recycling/games');
            })
            .catch(error => console.log(error));

        console.log(updatedGame);
        console.log("clicked");
    }

     function changePoints() {
        const updatedGame = {
            ...game,
            points: game.points + 1
        };

        setGame(updatedGame);

        updateGameApi(username, id, updatedGame)
            .then(() => {
                navigate('/play/recycling/games');
            })
            .catch(error => console.log(error));

        console.log(updatedGame);
    }

    return (
        <div className="container">
            <h1>Start des Spiels:</h1>
            <div>
                {description}
                <button className='btn btn-success' onClick={changeGameDone}>Finish</button>
                <button className='btn btn-success' onClick={changePoints}>Punkte vergeben</button>
                <button className='btn btn-success' onClick={changeGameSuccess}>Erfolgreich?</button>
            </div>
        </div>
    )
}
