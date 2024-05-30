import React from "react";

const Answer = ({ title, backgroundColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor }}
      className="text-white px-4 py-2 rounded"
    >
      {title}
    </button>
  );
};

export default Answer;
