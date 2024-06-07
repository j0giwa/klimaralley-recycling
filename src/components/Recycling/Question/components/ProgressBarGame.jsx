import React from "react";


const  ProgressBar = ({ percentage, color }) => {
  return (
    <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${color}-200`}>
      <div
        style={{ width: `${percentage}%` }}
        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
      ></div>
    </div>
  );
};

export default ProgressBar;
