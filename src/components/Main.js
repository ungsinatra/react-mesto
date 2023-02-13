import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/api.js";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

const Main = (props) => {
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
                onClick={props.onEditAvatar}
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
                onClick={props.onEditProfile}
              ></button>
              <h1 className="profile__name">{userInfo.userName}</h1>
              <p className="profile__description">{userInfo.userDescription}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__add-btn"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>
      <section className="place">
        <ul className="place__container">
          {cards.map((card, index) => (
            <Card
              card={card}
              key={card._id}
              onCardClickHandler={props.onCardClick}
            />
          ))}
        </ul>
      </section>
      <ImagePopup
        card={props.statement.selectedCard}
        onClose={props.closePoupsHandler}
      />
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={props.statement.profile}
        onClose={props.closePoupsHandler}
        children = {
          <>
            <input
              type="text"
              name="name"
              maxLength="40"
              minLength="2"
              placeholder="Имя"
              id="profile-name"
              className="popup__input  popup__input_value_name"
              required
            />
            <span className="popup__input-error popup__input-error_possition_top profile-name-error"></span>
            <input
              type="text"
              name="about"
              maxLength="200"
              minLength="2"
              placeholder="Работа"
              id="profile-desc"
              className="popup__input  popup__input_value_desc"
              required
            />
            <span className="popup__input-error popup__input-error_possition_bottom profile-desc-error"></span>

            <button type="submit" className="popup__btn-save">
              Сохранить
            </button>
          </>
        }
      />
      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={props.statement.card}
        onClose={props.closePoupsHandler}
        children={
          <>
            <input
              type="text"
              name="name"
              maxLength="30"
              minLength="2"
              placeholder="Навание"
              id="card-name"
              className="popup__input  popup__input_value_name"
              required
            />
            <span className="popup__input-error popup__input-error_possition_top  card-name-error"></span>
            <input
              type="url"
              name="link"
              id="card-url"
              placeholder="Ссылка на картинку"
              className="popup__input  popup__input_value_link"
              required
            />
            <span className="popup__input-error popup__input-error_possition_bottom card-url-error"></span>
            <button type="submit" className="popup__btn-save popup__btn-create">
              Создать
            </button>
          </>
        }
      />
      <PopupWithForm
        name="avatar-update"
        title="Обновить аватар"
        isOpen={props.statement.avatar}
        onClose={props.closePoupsHandler}
        children={
          <>
            <input
              type="url"
              name="link"
              id="card-url"
              placeholder="Ссылка на картинку"
              className="popup__input  popup__input_value_link"
              required
            />
            <span className="popup__input-error popup__input-error_possition_top card-url-error"></span>
            <button type="submit" className="popup__btn-save popup__btn-submit">
              Сохранить
            </button>
          </>
        }
      />

      <PopupWithForm
        name="del"
        title="Вы уверены?"
        onClose={props.closePoupsHandler}
        children={
          <>
            <button type="submit" className="popup__btn-save popup__btn-submit">
              Да
            </button>
          </>
        }
      />
    </main>
  );
};

export default Main;
