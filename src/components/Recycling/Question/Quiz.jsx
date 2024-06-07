import Title from "./components/Title";
import Image from "./components/Image";
import Answer from "./components/Answer";
import { questionsData } from "./helper/question";
import ProgressBar from "./components/ProgressBarGame";

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../security/AuthContext.jsx"

import { retrieveGameApi, updateGameApi } from "../api/GameApiService"



function Quiz() {

  const [richtig, setRichtig] = useState(0);
  const [falsch, setFalsch] = useState(0);

  const [score, setScore] = useState(0);
  const totalQuestions = questionsData.length;

  const [questions, setQuestions] = useState(questionsData);//modifier 8 a 23
   const [originalQuestions] = useState(questionsData);



  // Ab hier ist der Code für die Backend-Integration
  const { id } = useParams(); //id für die Authentifizierung
  
  const [description, setDescription] = useState('');


  const authContext = useAuth(); //Authentifizierung

  const navigate = useNavigate();

  const username = authContext.username;
   
  //Ein game wird initialisiert mit den Start Attributen
  const [game, setGame] = useState({
    points: 0,
    id: id,
    username: username,
    done: false,
    success: false
});
 
//Die Funktion retrieveGames() wird aufgerufen, wenn die Komponente gerendert wird
useEffect(
  () => retrieveGames(),
  [id]
)

//Die Funktion retrieveGames() ruft die Daten des Spiels vom Backend ab
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

//Die Funktion changeGameDone() wird aufgerufen, wenn das Spiel beendet wurde
function changeGameDone(isDone) {
  const updatedGame = {
    ...game,
    done: isDone
  };

  setGame(updatedGame);

  updateGameApi(username, id, updatedGame)
    .then(() => {  
      // navigate('/games');
    })
    .catch(error => console.log(error));

 
  console.log(updatedGame);
}


//Die Funktion changeGameSuccess() wird aufgerufen, wenn das Spiel ERFOLGREICH beendet wurde
function changeGameSuccess(isSuccess) {
  const updatedGame = {
    ...game,
    success: isSuccess 
  };
  setGame(updatedGame);
  
  updateGameApi(username, id, updatedGame)
    .then(() => {
      // navigate('/games');
    })
    .catch(error => console.log(error));


  console.log(updatedGame);
}



//Die Funktion changePoints() wird aufgerufen, wenn eine Antwort beantwortet wurde
function changePoints(setPoints) {
  let updatedGame = { ...game }; 

  
    updatedGame.points += setPoints; 
  

  
  setGame(updatedGame);

  updateGameApi(username, id, updatedGame)
    .then(() => {
      
    })
    .catch(error => console.log(error));

 
  console.log(updatedGame);
}



  // ab hier ist der Code für das Quiz welches man auf der Seite sieht

   

  const handleClick = (answerId, question) => {
    if (answerId === question.correctAnswerId) {
      console.log("richtig");
      setScore(score + 1);
      changePoints(1)
      setRichtig(richtig + 10);
    } else {
      console.log("Falsch");
      setFalsch(falsch + 10);
    }
    
    setQuestions(current => current.filter(item => item.id !== question.id));
    console.log(questions.length);
    console.log(game.done);

    if (questions.length === 1) {
      changeGameDone(game.done = true);
    }

    if (game.points >= 5) {
      changeGameSuccess(game.success = true);


    }
  };

  function handleStart() {
   
    setQuestions(originalQuestions);
    changeGameDone(game.done = false);
    changeGameSuccess(game.success = false);
    changePoints(- game.points);

    setScore(0);
    setRichtig(0);
    setFalsch(0);
    
  };

  const startNextGame = () => {
    navigate('/muellsortieren');
  };

  return (
    <>
      <div className=" flex flex-col gap-10 w-full">
        <div className="relative w-full">
          <div className="w-full bg-white py-5 px-5">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${richtig}%` }} // progressbar grün
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                <div
                  style={{ width: `${falsch}%` }} // progressbar rot
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center flex-wrap justify-around">
          {questions.map((item, i) => {
            return (
              <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                <div className="bg-white shadow-lg rounded-lg">
                  <Image image={item.image} />
                  <Title index={item.id} title={item.title} />  {/*ich habe {i} mit {item.id }geändern  */}
                  <div className="p-4 flex flex-col justify-between">
                    {item.answers.map((answer, index) => (
                      <Answer
                        onClick={() => handleClick(answer.id, item)}
                        key={index}
                        title={answer.title}
                        backgroundColor={answer.backgroundColor}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
           { game.done &&  ( 
            <div className="flex flex-col gap-5">
              <div className="text-xl">
                Dein Ergebnis ist : {game.points}/{totalQuestions}
              </div>
              <div className="text-xl">
                {game.success ? "Glückwunsch, du hast gewonnen!" : "Tut mir leid, du hast verloren. Versuche es erneut oder starte das nächste Spiel !"}
              </div>
              <div className="flex justify-around mt-5">
                <button onClick={startNextGame} className="bg-blue-500 text-white px-4 py-2 rounded">Nächtes Spiel </button>
                <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">Wieder Spielen</button>
              </div>
            </div>
           )} 
        </div>
      </div>
      <div>
        {/* <ProgressBar percentage={(game.points / (totalQuestions)) * 100} color="green" />  */}
      </div>
    </>
  );
}

export default Quiz;
