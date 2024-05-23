import { data } from "./helper/data";
import { useState } from "react";


function Karte() {
  const [richtig, setRichtig] = useState(0);
  const [falsch, setFalsch] = useState(0);

  const handleRichtigClick = () => {
    if (richtig + falsch > 100) {
      alert("Spiel vorbei");
    } else {
      setRichtig(richtig + 10);
    }
  };
  const handleFalschClick = () => {
    if (richtig + falsch > 100) {
      alert("Spiel vorbei");
    } else {
      setFalsch(falsch + 10);
    }
  };

  const handleStart = () => {
    setRichtig(0);
    setFalsch(0);
  };

  return (
    <>
      <div className="flex flex-wrap justify-around">
        {data.map((item, i) => {
          return (
            <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 p-2">
              <div className="bg-white shadow-lg rounded-lg">
                <img className="w-full h-48 object-cover rounded-t-lg" src={item.img} alt={`Frage-${i + 1}`} />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">Frage-{i + 1}</h2>
                  <p className="text-gray-700 mb-4">{item.frage}</p>
                </div>
                <div className="p-4 flex justify-between">
                  <button onClick={handleRichtigClick} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {item.buton1}
                  </button>
                  <button onClick={handleFalschClick} className="bg-red-500 text-white px-4 py-2 rounded">
                    {item.buton2}
                  </button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded">{item.buton3}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {(richtig + falsch) >= 100 && (
        <div className="flex justify-around mt-5">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Nächtes Spiel
          </button>
          <button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded">
            Wieder Spielen
          </button>
        </div>
      )}
      <div className="mt-5 w-full">
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div style={{ width: `${richtig}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
            <div style={{ width: `${falsch}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Karte;
