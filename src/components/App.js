import React, { useState, useEffect } from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import PopupWithForm from "./PopupWithForm.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    name: "",
    isOpen: false,
  });

  useEffect(() => {
    function closeFromEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", closeFromEscape);

    return () => {
      document.removeEventListener("keydown", closeFromEscape);
    };
  });

  const handleCardClick = (data) => {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      ...data,
    });
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const closeAllPopups = () => {
    if (selectedCard.isOpen) {
      setSelectedCard({ ...selectedCard, isOpen: false });
    }

    if (isAddPlacePopupOpen) {
      setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    if (isEditAvatarPopupOpen) {
      setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    if (isEditProfilePopupOpen) {
      setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
  };

  return (
    <div className="page">
      <Header />
      <Main
        handlers = {{
          onCardClick: handleCardClick,
          closePoupsHandler: closeAllPopups,
          onEditAvatar: handleEditAvatarClick,
          onAddPlace: handleAddPlaceClick,
          onEditProfile: handleEditProfileClick,
        }}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        children={
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
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
        children={
          <>
            <button type="submit" className="popup__btn-save popup__btn-submit">
              Да
            </button>
          </>
        }
      />
      <Footer />
    </div>
  );
}

export default App;
