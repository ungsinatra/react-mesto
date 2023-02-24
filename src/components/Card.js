import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClickHandler, onClickLike, onClickDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const hadleClick = () => {
    onCardClickHandler(card);
  };

  const hadleClickLike = () => {
    onClickLike(card);
  };

  const handleCardDelete = () => {
    onClickDelete(card);
  };
  const isLikes = card.likes.some((like) => {
    return like._id === currentUser.id;
  });
  const isOwn = currentUser.id === card.owner._id;
  return (
    <>
      <li className="place__item" key={card._id}>
        {isOwn && (
          <button
            type="button"
            aria-label="Удалить"
            style={{ display: "block" }}
            className={`place__btn-del`}
            onClick={handleCardDelete}
          ></button>
        )}
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
            onClick={hadleClickLike}
            className={`place__btn-like ${
              isLikes && "place__btn-like_status_liked"
            }`}
          ></button>
          <span className="place__like-count">{card.likes.length}</span>
        </div>
      </li>
    </>
  );
};

export default Card;
