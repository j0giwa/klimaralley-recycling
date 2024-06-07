import { useState } from "react";
import Title from "./components/Title";
import Image from "./components/Image";
import Answer from "./components/Answer";
import { questionsData } from "./helper/question";
import ProgressBar from "./ProgressBarGame";

function Karte() {

  const [questions, setQuestions] = useState(questionsData);//modifier 8 a 23

  const [richtig, setRichtig] = useState(0);
  const [falsch, setFalsch] = useState(0);

  const [score, setScore] = useState(0);

  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isWinner, setIsWinnwer] = useState(false);
  const totalQuestions = questionsData.length;

  const handleClick = (answerId, question) => {
    //Calculate ccore
    if (answerId === question.correctAnswerId) {
      setScore(score + 1);
      setRichtig(richtig + 10);//si la question richtig sa fait 10pour cent 
    } else {
      setFalsch(falsch + 10);
    }
    setQuestions((current) =>
      current.filter((item) => {// la question quon veut enlever de la liste 
        return item.id !== question.id;// modifier 
      })
    );
    if (questions.length === 1) {
      setIsGameFinished(true);
      if (score + 1 >= totalQuestions / 2) {
        setIsWinner(true);
      }
    }
  };

  const handleStart = () => {
    setQuestions(questionsData);
    setScore(0);
    setRichtig(0);
    setFalsch(0);
    setIsGameFinished(false); // Réinitialiser l'état du jeu
    setIsWinner(false); // Réinitialiser l'état de victoire
  };

  return (
    <>
      <div className=" flex flex-col gap-10 w-full">
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
          {isGameFinished && (
            <div className="flex flex-col gap-5">
              <div className="text-xl">
                Dein Ergebnis ist : {score}/{totalQuestions}
              </div>
              <div className="text-xl">
                {isWinner ? "Glückwunsch, du hast gewonnen!" : "Tut mir leid, du hast verloren. Versuche es erneut!"}
              </div>
              <div className="flex justify-around mt-5">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Nächtes Spiel
                </button>
                <button
                  onClick={handleStart}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Wieder Spielen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <ProgressBar percentage={(score / totalQuestions) * 100} color="green" />
      </div>
    </>
  );
}

export default Karte;
