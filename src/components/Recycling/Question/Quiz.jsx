import Title from "./components/Title";
import Image from "./components/Image";
import Answer from "./components/Answer";
import ProgressBar from "./components/ProgressBarGame";
import { questionsData } from "./helper/question";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext.jsx";
import { retrieveGameApi, updateGameApi } from "../api/GameApiService";

function Quiz() {
  const { id } = useParams();
  const authContext = useAuth();
  const navigate = useNavigate();
  const username = authContext.username;

  const [questions, setQuestions] = useState(questionsData);   //modifier 8 a 23
  const [richtig, setRichtig] = useState(0);
  const [falsch, setFalsch] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const totalQuestions = questionsData.length;


  //Daten vom server laden

  const [game, setGame] = useState({
    points: 0,
    id: id,
    username: username,
    done: false,
    success: false
  });

  useEffect(() => {
    retrieveGames();
  }, [id]);

  function retrieveGames() {
    if (id !== -1) {
      retrieveGameApi(username, id)
        .then(response => {
          setDescription(response.data.description);
          setGame(prevGame => ({
            ...prevGame,
            description: response.data.description,
            points: response.data.points,
            done: response.data.done,
            success: response.data.success
          }));
        })
        .catch(error => console.log(error));
    }
  }

  function saveGame() {
    const updatedGame = {
      ...game,
      points: score,
      done: isGameFinished,
      success: isWinner
    };

    setGame(updatedGame);

    updateGameApi(username, id, updatedGame)
      .then(() => {
        // navigate('/games');
      })
      .catch(error => console.log(error));

    console.log(updatedGame);
  }

  function deleteGame() {
    const updatedGame = {
      ...game,
      points: 0,
      done: false,
      success: false
    };

    setGame(updatedGame);

    updateGameApi(username, id, updatedGame)
      .then(() => {
        // navigate('/games');
      })
      .catch(error => console.log(error));

    console.log(updatedGame);
  }



  // frontend quiz

  function handleClick(answerId, question) {

    if (questions.length === 1) {
      setIsGameFinished(true);

      if (score >= totalQuestions / 2) {
        setIsWinner(true);
      }
    }

    if (answerId === question.correctAnswerId) {   //calculate Score
      setScore(score + 1);
      setRichtig(richtig + 10);   //si la question richtig sa fait 10 pour cent
    } else {
      setFalsch(falsch + 10);   // Si la réponse est incorrecte, ajouter 10% à 'falsch'
    }
    
    setQuestions(current =>
      current.filter(item => item.id !== question.id)   //suprimer la question repondue de la liste des questions restantes 
    );
    console.log(game);
}

  function handleStart() {
    setScore(0);   //reinitialiser le score
    setIsGameFinished(false);
    setIsWinner(false);
    setQuestions(questionsData);
    setRichtig(0);
    setFalsch(0);

    deleteGame();  // daten vom Server löschen
  }

  function nextGame() {
    navigate('/play/recycling/muellSortieren/:id');
    saveGame();  // daten auf Server speichern
  }

  return (
    <>
      <div className="flex flex-col gap-10 w-full">
        <div className="relative w-full">
          <div className="w-full bg-white py-5 px-5">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: `${richtig}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                <div
                  style={{ width: `${falsch}%` }}
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
                  <Title index={item.id} title={item.title} /> 
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
          {isGameFinished && (
            <div className="flex flex-col gap-5">
              <div className="text-xl">
                Dein Ergebnis ist: {score}/{totalQuestions}
              </div>
              <div className="text-xl">
                {isWinner ? "Glückwunsch, du hast gewonnen!" : "Tut mir leid, du hast verloren. Versuche es erneut!"}</div>
              <div className="flex justify-around mt-5">
                <button onClick={nextGame} className="bg-blue-500 text-white px-4 py-2 rounded">Nächstes Spiel</button>
                <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">Wieder Spielen</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;


