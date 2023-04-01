import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import useValidation from "../../Hooks/useValidation.js";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoad }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFocus, setFocus] = useState(false);

  // Валидация знвечени инпутов
  const nameInput = useValidation(name, {
    isEmpty: true,
    maxLength: 30,
    minLength: 2,
  },isFocus);
  
  const descInput = useValidation(description, {
    isEmpty: true,
    maxLength: 200,
    minLength: 2,
  },isFocus);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  function handleFucus(e) {
    setFocus(true);
  }

  useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser, isOpen]);

  function handleOnChangeName(evt) {
    setName(evt.target.value);
  }

  function handleOnChangeDesc(evt) {
    setDescription(evt.target.value);
  }
  return (
    <>
      <PopupWithForm
        name="profile"
        title={"Редактировать профиль"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        children={
          <>
            <input
              type="text"
              name="name"
              maxLength="40"
              minLength="2"
              placeholder="Имя"
              value={name}
              onFocus={handleFucus}
              onChange={handleOnChangeName}
              id="profile-name"
              className="popup__input  popup__input_value_name"
              required
            />
            <span
              className={`popup__input-error popup__input-error_possition_top profile-name-error`}
            >
              {nameInput.showText()}
            </span>

            <input
              value={description}
              type="text"
              name="about"
              maxLength="200"
              minLength="2"
              placeholder="Работа"
              onChange={handleOnChangeDesc}
              onFocus={handleFucus}
              id="profile-desc"
              className="popup__input  popup__input_value_desc"
              required
            />
            <span className="popup__input-error popup__input-error_possition_bottom profile-desc-error">
              {
                descInput.showText()
             }
            </span>

            <button
              type="submit"
              disabled={!nameInput.isValid || !descInput.isValid || isLoad}
              className={`popup__btn-save ${
                !nameInput.isValid || !descInput.isValid
                  ? "popup__btn-inactive "
                  : ""
              }`}
            >
              {isLoad ? "Cохранение..." : "Сохранить"}
            </button>
          </>
        }
      />
    </>
  );
};

export default EditProfilePopup;
