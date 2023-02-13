import React, { useState, useEffect } from "react";
import { api } from "../utils/api.js";
import Card from "./Card";

const Main = ({handlers}) => {
  const [userInfo, setUserInfo] = useState({
    userAvatar: "",
    userName: "",
    userDescription: "",
  });
  const [cards, setCards] = useState([]);


  useEffect(() => {
    api.getUserInfo().then(({ avatar, name, about }) => {
      setUserInfo({
        userAvatar: avatar,
        userName: name,
        userDescription: about,
      });
    });
  }, []);

  useEffect(() => {
    api.getCards().then((newCards) => {
      setCards([...cards, ...newCards]);
    });
  }, []);

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
                style={{ backgroundImage: `url(${userInfo.userAvatar})` }}
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
              <h1 className="profile__name">{userInfo.userName}</h1>
              <p className="profile__description">{userInfo.userDescription}</p>
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
              onCardClickHandler={handlers.onCardClick}
            />
          ))}
        </ul>
      </section>





    </main>
  );
};

export default Main;
