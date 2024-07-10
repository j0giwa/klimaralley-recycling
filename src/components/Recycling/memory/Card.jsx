import React from 'react';

const Card = ({ id, type, url, handleClick, isMatched, flipped }) => (
  <div
    className={`card ${flipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
    onClick={() => handleClick(id)}
  >
    <div className="card-inner">
      <div className="card-front">
        <img src={url} alt={type} />
      </div>
      <div className="card-back">
        <img src="src\components\Recycling\memory\memory.png" alt="Memory Logo" />
      </div>
    </div>
  </div>
);

export default Card;

