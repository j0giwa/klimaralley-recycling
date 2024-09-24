import Picture from './Picture';
import React, { useState,useEffect, useCallback } from 'react';
import "./muellTrennung.css";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayerGameByIdApiDto, updateGameApi } from "../api/GameApiService";
import { useAuth } from "../security/AuthContext.jsx";
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDrag, useDrop } from 'react-dnd';




const PictureList = [
    {
        id: 1, //Zeitung
    url: "https://cdn.pixabay.com/photo/2016/05/24/18/22/newspapers-1412940_1280.png",
    boardId: 1
  },
  {
  id: 2, //Brot
    url: "https://cdn.pixabay.com/photo/2019/05/06/14/24/bread-4183225_1280.jpg",
    boardId: 2
  },
  {
    id: 3, //Windeln
    url: "https://cdn.pixabay.com/photo/2018/03/17/19/57/diaper-3234992_640.png",
    boardId: 4
  },
  {
    id: 4, //Alu-Schalen
    url: "https://cdn.pixabay.com/photo/2017/01/16/15/13/shells-1984293_1280.png",
    boardId: 3
  },
  {
    id: 5, //Kartoffelschalen
    url: "https://cdn.pixabay.com/photo/2014/05/14/16/15/potato-skins-344185_1280.jpg",
    boardId: 2
  },
  {
    id: 6, //Umschläge
    url: "https://cdn.pixabay.com/photo/2016/09/10/17/17/letters-1659715_1280.jpg",
    boardId: 1
  },
  {
    id: 7, //PET-Flasche
    url: "https://cdn.pixabay.com/photo/2024/04/29/14/47/packing-8728105_1280.jpg",
    boardId: 3
  },
  {
    id: 8, //Tassen
    url: "https://cdn.pixabay.com/photo/2020/01/29/13/47/connection-4802578_1280.jpg",
    boardId: 4
  },
  {
    id: 9, //Joghurt-Becher
    url: "https://cdn.pixabay.com/photo/2016/03/14/09/41/garbage-1255244_1280.jpg",
    boardId: 3
  },
  {
    id: 10, //Karton
    url: "https://cdn.pixabay.com/photo/2023/08/26/08/56/ai-generated-8214465_1280.jpg",
    boardId: 1
  },
  {
    id: 11, //Shampoo-Flasche
    url: "https://cdn.pixabay.com/photo/2019/02/01/19/12/plastic-3969638_1280.jpg",
    boardId: 3
  },
  {
    id: 12, //Teekanne
    url: "https://cdn.pixabay.com/photo/2014/03/24/18/25/teapot-295570_1280.jpg",
    boardId: 4
  },
  {
    id: 13, //Blätter
    url: "https://cdn.pixabay.com/photo/2018/11/18/16/31/leaves-3823499_1280.jpg",
    boardId: 2
  },
  {
    id: 14, //Rollen
    url: "https://cdn.pixabay.com/photo/2016/03/05/22/12/roll-1239215_1280.jpg",
    boardId: 1
  },
  {
    id: 15, //Kerzen
    url: "https://cdn.pixabay.com/photo/2016/07/27/21/38/candles-1546499_1280.jpg",
    boardId: 4
  },
  {
    id: 16, //Eier
    url: "https://cdn.pixabay.com/photo/2019/02/17/11/06/egg-4002016_1280.jpg",
    boardId: 2
  },


];


/**
 * DragDrop-Komponente
 * 
 * Autor: Mohammed
 * Autor: Jeffrey Böttcher
 * 
 * Beschreibung:
 * Diese Komponente implementiert ein Drag-and-Drop-Spiel, bei dem Benutzer Bilder in verschiedene Mülltonnen ziehen müssen, um Punkte zu sammeln. 
 * Die Bilder repräsentieren Abfälle, die korrekt sortiert werden müssen. Das Spiel enthält vier verschiedene Boards für jede Mülltonne: Blau, Grün, Gelb und Grau.
 * 
 * Funktionen:
 * - `retrieveGames`: Lädt die aktuellen Spieldaten vom Server, einschließlich Punktestand, Status des Spiels (abgeschlossen oder nicht) und Erfolg.
 * - `saveGame`: Speichert den aktuellen Punktestand und den Status des Spiels auf dem Server.
 * - `deleteGame`: Setzt die Spieldaten auf die Ausgangswerte zurück und löscht sie vom Server.
 * - `useCreateDrop`: Ein Hook für die Erstellung von Drop-Bereichen, die Drag-and-Drop-Funktionalität ermöglichen.
 * - `addImageToBoard`: Fügt ein Bild zu einem bestimmten Board hinzu, aktualisiert den Punktestand und überprüft, ob das Spiel beendet ist.
 * - `handleGameEnd`: Bewertet das Spiel am Ende und setzt die entsprechende Bewertung auf Basis des Punktestands.
 * - `resetBoards`: Setzt alle Boards und den Punktestand zurück und löscht die Spieldaten.
 * - `nextGame`: Speichert die aktuellen Spieldaten und navigiert zu einer Übersicht aller Spiele.
 * 
 * Die Komponente verwendet React Hooks (`useState`, `useEffect`, `useCallback`) zur Verwaltung des Zustands und der Seiteneffekte.
 * Sie implementiert Drag-and-Drop-Funktionalität mittels `react-dnd` und kommuniziert mit einem Backend-Server über API-Funktionen.
 * 
 * Die Benutzeroberfläche zeigt die Punktzahl, die verfügbaren Bilder und die vier Boards an. 
 * Nach dem Ende des Spiels wird eine Bewertung angezeigt und der Benutzer hat die Möglichkeit, das Spiel zurückzusetzen oder zum nächsten Spiel zu wechseln.
*/

function DragDrop() {

  // Hole die Parameter aus der URL
  const { playerGameId, spieleId, playerId } = useParams();
  const authContext = useAuth(); // Hole den Authentifizierungskontext
  const username = authContext.username;
  const navigate = useNavigate();

  // Zustand für die Boards, Punktestand, Bewertung und Spieldaten
  const [blueBoard, setBlueBoard] = useState([]);
  const [greenBoard, setGreenBoard] = useState([]);
  const [yellowBoard, setYellowBoard] = useState([]);
  const [grayBoard, setGrayBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [evaluation, setEvaluation] = useState("");
  const [pictures, setPictures] = useState(PictureList);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Zustand für die Spiel-Daten
  const [game, setGame] = useState({
    points: 0,
    playerGameId: playerGameId,
    playerId: playerId,
    spieleId: spieleId,
    username: username,
    isCompleted: false,
    isSuccessful: false
  });

  // Lade die Spieldaten beim Laden des Components
  useEffect(() => {
    retrieveGames();
  }, [playerGameId]);

  // Funktion zum Abrufen der Spieldaten vom Server
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

  // Funktion zum Speichern der Spieldaten auf dem Server
  function saveGame() {
    const updatedGame = {
      ...game,
      points: score,
      isCompleted: isGameFinished,
      isSuccessful: isGameFinished
    };

    setGame(updatedGame);

    updateGameApi(playerId, spieleId, updatedGame)
      .then(() => console.log("Game saved successfully"))
      .catch(error => console.log(error));

    console.log(updatedGame);
  }

  // Funktion zum Löschen der Spieldaten auf dem Server
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

  // Funktion zum Erstellen eines Drop-Bereichs für das Drag-and-Drop
  const useCreateDrop = useCallback((boardSetter) => {
    const [{ isOver }, dropRef] = useDrop(() => ({
      accept: 'image',
      drop: (item) => addImageToBoard(item.id, boardSetter),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }), [boardSetter]);

    return [dropRef, isOver];
  }, []);

  // Funktion zum Hinzufügen eines Bildes zu einem Board und Punktestand aktualisieren
  const addImageToBoard = (id, boardSetter) => {
    const picture = pictures.find((picture) => id === picture.id);

    if (!picture) {
      console.error("Bild nicht gefunden in PictureList");
      return;
    }

    const boardId = picture.boardId;

    // Funktion zum Aktualisieren des Punktestands
    const updateScore = (increment) => {
      setScore(prevScore => prevScore + increment);
    };

    switch (boardId) {
      case 1:
        if (boardSetter === setBlueBoard) {
          setBlueBoard(board => [...board, picture]);
          updateScore(10);
        }
        break;
      case 2:
        if (boardSetter === setGreenBoard) {
          setGreenBoard(board => [...board, picture]);
          updateScore(10);
        }
        break;
      case 3:
        if (boardSetter === setYellowBoard) {
          setYellowBoard(board => [...board, picture]);
          updateScore(10);
        }
        break;
      case 4:
        if (boardSetter === setGrayBoard) {
          setGrayBoard(board => [...board, picture]);
          updateScore(10);
        }
        break;
      default:
        console.error("Das Bild hat keine gültige boardId");
        updateScore(-5);
        return;
    }

    // Aktualisiere die Liste der Bilder und überprüfe, ob das Spiel beendet ist
    setPictures(prevPictures => {
      const updatedPictures = prevPictures.filter(p => p.id !== id);
      if (updatedPictures.length === 0) {
        setIsGameFinished(true);
      }
      return updatedPictures;
    });
  };

  // Wenn das Spiel beendet ist, führe die End-Spiel-Logik aus
  useEffect(() => {
    if (isGameFinished) {
      handleGameEnd();
    }
  }, [isGameFinished]);

  // Funktion zur Bewertung am Ende des Spiels
  const handleGameEnd = () => {
    let finalEvaluation = "";
    if (score >= 130) {
      finalEvaluation = "Herausragend! Du hast ALLES korrekt sortiert!";
    } else if (score >= 100) {
      finalEvaluation = "Gut gemacht! Du hast das meiste richtig zugeordnet!";
    } else {
      finalEvaluation = "Das kannst du besser! Versuche es nochmal.";
    }
    setEvaluation(finalEvaluation);
    //console.log("Final score:", score);
  };

  // Erstelle die Drop-Bereiche für jedes Board
  const [blueDrop] = useCreateDrop(setBlueBoard);
  const [greenDrop] = useCreateDrop(setGreenBoard);
  const [yellowDrop] = useCreateDrop(setYellowBoard);
  const [grayDrop] = useCreateDrop(setGrayBoard);

  // Setzt die Boards zurück und löscht die Spieldaten
  const resetBoards = () => {
    setBlueBoard([]);
    setGreenBoard([]);
    setYellowBoard([]);
    setGrayBoard([]);
    setPictures(PictureList);
    setIsGameFinished(false);
    setScore(0);
    setEvaluation("");
    deleteGame();
  };

  // Navigiert zum nächsten Spiel, speichert die aktuellen Spieldaten
  const nextGame = () => {
    saveGame();
    navigate('/play/recycling/games');
  };

  return (
    <>
      <div className="MüllSortierenSpiel">
        <h1 style={{ fontSize: '25px', fontWeight: 'bold', color: '#BC2A6E' }}>Müll Sortieren Spiel</h1>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold' }}>Was gehört in welche Tonne?</h2>
      </div>

      <div className="Score">
        <p style={{ fontWeight: 'bold', color: '#70BBFF' }}>Score: {score}</p>
      </div>

      <div className="Pictures">
        {pictures.map((picture) => (
          <Picture url={picture.url} id={picture.id} key={picture.id} />
        ))}
      </div>

      <div className="BoardsContainer">
        <div className="BlueBoard" ref={blueDrop}>
          {blueBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
        </div>
        <div className="GreenBoard" ref={greenDrop}>
          {greenBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
        </div>
        <div className="YellowBoard" ref={yellowDrop}>
          {yellowBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
        </div>
        <div className="GrayBoard" ref={grayDrop}>
          {grayBoard.map((picture) => (
            <Picture key={picture.id} url={picture.url} id={picture.id} />
          ))}
        </div>
      </div>

      {isGameFinished && (
        <div className="Evaluation">
          <h3>Spiel zuende!</h3>
          <p>{evaluation}</p>
          <div className="ResetButton">
            <button 
              onClick={resetBoards} 
              style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px' }}
            >
              Noch mal spielen
            </button>
            <button
              onClick={nextGame} 
              style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px', marginLeft: '10px' }}
            >
              Nächstes Spiel
            </button>
          </div>
        </div>
      )}
    </>
  );
} export default DragDrop;

// function DragDrop() {
//   const { playerGameId, spieleId, playerId } = useParams();
//   const authContext = useAuth();
//   const username = authContext.username;
//   const navigate = useNavigate();

//   // Zustand für die Boards, Punktestand, Bewertung und Spieldaten
//   const [blueBoard, setBlueBoard] = useState([]);
//   const [greenBoard, setGreenBoard] = useState([]);
//   const [yellowBoard, setYellowBoard] = useState([]);
//   const [grayBoard, setGrayBoard] = useState([]);
//   const [score, setScore] = useState(0);
//   const [evaluation, setEvaluation] = useState("");
//   const [pictures, setPictures] = useState(PictureList);
//   const [isGameFinished, setIsGameFinished] = useState(false);

//   // Zustand für die Spiel-Daten
//   const [game, setGame] = useState({
//     points: 0,
//     playerGameId: playerGameId,
//     playerId: playerId,
//     spieleId: spieleId,
//     username: username,
//     isCompleted: false,
//     isSuccessful: false
//   });

//   // Lade die Spieldaten beim Laden des Components
//   useEffect(() => {
//     retrieveGames();
//   }, [playerGameId]);

//   // Funktion zum Abrufen der Spieldaten vom Server
//   function retrieveGames() {
//     if (playerGameId) {
//       getPlayerGameByIdApiDto(playerId, spieleId)
//         .then(response => {
//           setGame(prevGame => ({
//             ...prevGame,
//             points: response.data.points,
//             isCompleted: response.data.isCompleted,
//             isSuccessful: response.data.isSuccessful
//           }));
//         })
//         .catch(error => console.log("Error fetching game data: ", error));
//     }
//   }

//   // Drag-and-Drop Logik
//   const useCreateDrop = useCallback((boardSetter) => {
//     const [{ isOver }, dropRef] = useDrop(() => ({
//       accept: 'image',
//       drop: (item) => addImageToBoard(item.id, boardSetter),
//       collect: (monitor) => ({
//         isOver: !!monitor.isOver(),
//       }),
//     }), [boardSetter]);

//     return [dropRef, isOver];
//   }, []);

//   const addImageToBoard = (id, boardSetter) => {
//     const picture = pictures.find((picture) => id === picture.id);
//     if (!picture) {
//       console.error("Bild nicht gefunden in PictureList");
//       return;
//     }

//     const boardId = picture.boardId;
//     const updateScore = (increment) => setScore(prevScore => prevScore + increment);

//     switch (boardId) {
//       case 1: setBlueBoard(board => [...board, picture]); updateScore(10); break;
//       case 2: setGreenBoard(board => [...board, picture]); updateScore(10); break;
//       case 3: setYellowBoard(board => [...board, picture]); updateScore(10); break;
//       case 4: setGrayBoard(board => [...board, picture]); updateScore(10); break;
//       default: console.error("Das Bild hat keine gültige boardId"); updateScore(-5); return;
//     }

//     setPictures(prevPictures => {
//       const updatedPictures = prevPictures.filter(p => p.id !== id);
//       if (updatedPictures.length === 0) {
//         setIsGameFinished(true);
//       }
//       return updatedPictures;
//     });
//   };

//   useEffect(() => {
//     if (isGameFinished) {
//       handleGameEnd();
//     }
//   }, [isGameFinished]);

//   const handleGameEnd = () => {
//     let finalEvaluation = "";
//     if (score >= 130) {
//       finalEvaluation = "Herausragend! Du hast ALLES korrekt sortiert!";
//     } else if (score >= 100) {
//       finalEvaluation = "Gut gemacht! Du hast das meiste richtig zugeordnet!";
//     } else {
//       finalEvaluation = "Das kannst du besser! Versuche es nochmal.";
//     }
//     setEvaluation(finalEvaluation);
//   };

//   const [blueDrop] = useCreateDrop(setBlueBoard);
//   const [greenDrop] = useCreateDrop(setGreenBoard);
//   const [yellowDrop] = useCreateDrop(setYellowBoard);
//   const [grayDrop] = useCreateDrop(setGrayBoard);

//   const resetBoards = () => {
//     setBlueBoard([]);
//     setGreenBoard([]);
//     setYellowBoard([]);
//     setGrayBoard([]);
//     setPictures(PictureList);
//     setIsGameFinished(false);
//     setScore(0);
//     setEvaluation("");
//     deleteGame();
//   };

//   const nextGame = () => {
//     saveGame();
//     navigate('/play/recycling/games');
//   };

//   return (
//     <>
//       <div className="MüllSortierenSpiel">
//         <h1 style={{ fontSize: '25px', fontWeight: 'bold', color: '#BC2A6E' }}>Müll Sortieren Spiel</h1>
//         <h2 style={{ fontSize: '15px', fontWeight: 'bold' }}>Was gehört in welche Tonne?</h2>
//       </div>

//       <div className="Score">
//         <p style={{ fontWeight: 'bold', color: '#70BBFF' }}>Score: {score}</p>
//       </div>

//       <div className="Pictures">
//         {pictures.map((picture) => (
//           <Picture url={picture.url} id={picture.id} key={picture.id} />
//         ))}
//       </div>

//       <div className="BoardsContainer">
//         <div className="BlueBoard" ref={blueDrop}>
//           {blueBoard.map((picture) => (
//             <Picture key={picture.id} url={picture.url} id={picture.id} />
//           ))}
//         </div>
//         <div className="GreenBoard" ref={greenDrop}>
//           {greenBoard.map((picture) => (
//             <Picture key={picture.id} url={picture.url} id={picture.id} />
//           ))}
//         </div>
//         <div className="YellowBoard" ref={yellowDrop}>
//           {yellowBoard.map((picture) => (
//             <Picture key={picture.id} url={picture.url} id={picture.id} />
//           ))}
//         </div>
//         <div className="GrayBoard" ref={grayDrop}>
//           {grayBoard.map((picture) => (
//             <Picture key={picture.id} url={picture.url} id={picture.id} />
//           ))}
//         </div>
//       </div>

//       {isGameFinished && (
//         <div className="Evaluation">
//           <h3>Spiel zuende!</h3>
//           <p>{evaluation}</p>
//           <div className="ResetButton">
//             <button 
//               onClick={resetBoards} 
//               style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px' }}
//             >
//               Noch mal spielen
//             </button>
//             <button
//               onClick={nextGame} 
//               style={{ backgroundColor: '#1683de', color: 'white', padding: '10px 16px', borderRadius: '8px', marginLeft: '10px' }}
//             >
//               Nächstes Spiel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// export default DragDrop;