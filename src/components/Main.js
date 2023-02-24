import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({cards,handlers}) => {
  const userContext = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__items">
            <div className="profile__img-items">
              <div
                className="profile__avatar-switch-ican"
                onClick={handlers.onEditAvatar}
              ></div>
              <div
                style={{ backgroundImage: `url(${userContext.userAvatar})` }}
                className="profile__avatar"
              ></div>
            </div>

            <div className="profile__info">
              <button
                className="profile__edit-btn"
                type="button"
                area-label="Изменить"
                onClick={handlers.onEditProfile}
              ></button>
              <h1 className="profile__name">{userContext.userName}</h1>
              <p className="profile__description">{userContext.userDescription}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__add-btn"
            onClick={handlers.onAddPlace}
          ></button>
        </div>
      </section>
      <section className="place">
        <ul className="place__container">
          {cards.map((card, index) => (
            <Card
              card={card}
              key={card._id}
              onClickLike = {handlers.onClickLike}
              onCardClickHandler={handlers.onCardClick}
              onClickDelete = {handlers.onClickDelete}
            />
          ))}
        </ul>
      </section>





    </main>
  );
};

export default Main;
