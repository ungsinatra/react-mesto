import React from "react";

const Card = ({ card, onCardClickHandler }) => {
  const hadleClick = () => {
    onCardClickHandler(card);
  };

  return (
    <>
      <li className="place__item">
        <button
          type="button"
          aria-label="Удалить"
          className="place__btn-del"
        ></button>
        <div
          onClick={hadleClick}
          src=""
          alt=""
          className="place__img"
          style={{ backgroundImage: `url(${card.link})` }}
        ></div>
        <div className="place__features">
          <h3 className="place__title">{card.name}</h3>
          <button
            type="button"
            aria-label="Нравиться"
            className="place__btn-like"
          ></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </li>
    </>
  );
};

export default Card;
