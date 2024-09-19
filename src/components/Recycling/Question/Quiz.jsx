
import Title from "./components/Title";
import Image from "./components/Image";
import Answer from "./components/Answer";
import { questionsData } from "./helper/question";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthContext.jsx";
import { getPlayerGameByIdApi, getPlayerGameByIdApiDto, updateGameApi } from "../api/GameApiService";

/**
 * Autor: Gizem
 * Autor: Josiane Tanga 
 * Autor: Jeffrey Böttcher
 * Version: 1.0
 * 
 * Beschreibung:
 * Die `Quiz`-Komponente stellt das Haupt-Quizspiel dar, bei dem Benutzer Fragen beantworten können. 
 * Die Komponente verwaltet den Zustand des Spiels, einschließlich der verbleibenden Fragen, 
 * der Punktzahl, der richtigen und falschen Antworten sowie des Spielstatus (ob das Spiel 
 * beendet ist und ob der Benutzer gewonnen hat).
 * 
 * Funktionen:
 * - `handleClick`: Verarbeitet die Auswahl einer Antwort, aktualisiert die Punktzahl und entfernt 
 *   die beantwortete Frage aus der Liste.
 * - `handleStart`: Setzt das Spiel zurück und löscht die Spieldaten vom Server.
 * - `nextGame`: Speichert die aktuellen Spiel-Daten auf dem Server und navigiert zum nächsten Spiel.
 * 
 * Zustände:
 * - `questions`: Eine Liste der verbleibenden Fragen, die im Quiz angezeigt werden.
 * - `richtig`: Punktzahl für die richtigen Antworten in Prozent.
 * - `falsch`: Punktzahl für die falschen Antworten in Prozent.
 * - `score`: Gesamtpunktzahl des Spielers.
 * - `isGameFinished`: Ein Flag, das angibt, ob das Spiel beendet ist.
 * - `isWinner`: Ein Flag, das angibt, ob der Spieler gewonnen hat.
 * - `game`: Ein Objekt, das Informationen über das aktuelle Spiel enthält, einschließlich Punktzahl 
 *   und Status.
 * 
 * Effekte:
 * - `useEffect`: Ruft die `retrieveGames`-Funktion auf, um die Spieldaten beim Laden des Components 
 *   abzurufen.
 * 
 * API-Integration:
 * - `retrieveGames`: Lädt die Spieldaten vom Server.
 * - `saveGame`: Speichert die aktuellen Spiel-Daten auf dem Server.
 * - `deleteGame`: Löscht die Spiel-Daten vom Server.
 */
function Quiz() {
  const { playerGameId, spieleId, playerId } = useParams(); // Holt die Parameter aus der URL
  const authContext = useAuth(); // Authentifizierungskontext verwenden
  const navigate = useNavigate();
  const username = authContext.username;

  // Fragen- und Spielstatus
  const [questions, setQuestions] = useState(questionsData); // Fragen-Daten
  const [richtig, setRichtig] = useState(0); // Punktzahl für richtige Antworten in Prozent
  const [falsch, setFalsch] = useState(0); // Punktzahl für falsche Antworten in Prozent
  const [score, setScore] = useState(0); // Gesamtpunktzahl
  const [isGameFinished, setIsGameFinished] = useState(false); // Spielstatus
  const [isWinner, setIsWinner] = useState(false); // Gewinnerstatus

  const totalQuestions = questionsData.length; // Gesamtanzahl der Fragen

  // Spiel-Daten vom Server laden
  const [game, setGame] = useState({
    points: 0,
    playerGameId: playerGameId,
    playerId: playerId,
    spieleId: spieleId,
    username: username,
    isCompleted: false,
    isSuccessful: false
  });

  useEffect(() => {
    retrieveGames(); // Spiel-Daten beim Laden des Components abrufen
  }, [playerGameId]);

  // Holt die Spieldaten vom Server
  function retrieveGames() {
    if (playerGameId) {
      getPlayerGameByIdApiDto(playerId, spieleId)
        .then(response => {
          setGame(prevGame => ({
            ...prevGame,
            points: response.data.points,
            isCompleted: response.data.isCompleted,
            isSuccessful: response.data.isSuccessful
          }));
        })
        .catch(error => console.log("Error fetching game data: ", error));
    }
  }

  // Speichert die Spieldaten auf dem Server
  function saveGame() {
    const updatedGame = {
      ...game,
      points: score,
      isCompleted: isGameFinished,
      isSuccessful: isWinner
    };

    setGame(updatedGame);

    updateGameApi(playerId, spieleId, updatedGame)
      .then(() => console.log("Game saved successfully"))
      .catch(error => console.log(error));

    console.log(updatedGame);
  }

  // Löscht die Spieldaten auf dem Server
  function deleteGame() {
    const updatedGame = {
      ...game,
      points: 0,
      isCompleted: false,
      isSuccessful: false
    };

    setGame(updatedGame);

    updateGameApi(playerId, spieleId, updatedGame)
      .then(() => console.log("Game deleted successfully"))
      .catch(error => console.log(error));

    console.log(updatedGame);
  }

  // Verarbeitet die Auswahl einer Antwort
  function handleClick(answerId, question) {
    if (questions.length === 1) {
      setIsGameFinished(true); // Spiel beenden, wenn alle Fragen beantwortet sind

      if (score >= totalQuestions / 2) { // Überprüft, ob der Spieler gewonnen hat
        setIsWinner(true);
      }
    }

    if (answerId === question.correctAnswerId) {   // Berechnet die Punktzahl
      setScore(score + 1);
      setRichtig(richtig + 10); // Richtige Antwort: 10% hinzufügen
    } else {
      setFalsch(falsch + 10); // Falsche Antwort: 10% hinzufügen
    }

    // Entfernt die beantwortete Frage aus der Liste der verbleibenden Fragen
    setQuestions(current =>
      current.filter(item => item.id !== question.id)
    );
    console.log(game);
    console.log(score);
  }

  // Startet ein neues Spiel
  function handleStart() {
    setScore(0);   // Setzt die Punktzahl zurück
    setIsGameFinished(false);
    setIsWinner(false);
    setQuestions(questionsData); // Setzt die Fragen zurück
    setRichtig(0);
    setFalsch(0);

    deleteGame();  // Spiel-Daten vom Server löschen
  }

  // Navigiert zum nächsten Spiel
  function nextGame() {  
    saveGame();  // Speichert die Spiel-Daten auf dem Server
    navigate('/play/recycling/games'); // Navigiert zur Spieleübersicht
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
                {isWinner ? "Glückwunsch, du hast gewonnen!" : "Tut mir leid, du hast verloren. Versuche es erneut!"}
              </div>
              <div className="flex justify-around mt-5">
                <button onClick={nextGame} className="bg-blue-500 text-white px-4 py-2 rounded">Nächstes Spiel</button>
                <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">Noch mal spielen</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;


