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
        <img src="https://cdn.pixabay.com/photo/2015/09/12/23/48/stripes-937568_1280.jpg" alt="Rueckseite der Karte" />
      </div>
    </div>
  </div>
);

export default Card;
