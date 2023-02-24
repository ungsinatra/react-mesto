import React, { useRef, useState,useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../Hooks/useValidation";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";



const EditAvatarPopup = ({ onClose, isOpen, onUpdateAvatar, isLoad }) => {
  const currentUser = useContext(CurrentUserContext);
  const inputElements = useRef();
  const [isFocus,setFocus] = useState(false);
  const [link,setLink] = useState('');

  useEffect(() => {
    setLink(currentUser.userAvatar)
  },[currentUser])

  function handleOnChange(e){
    setLink(e.target.value);
  }
  // const link = inputElements.current.value;
  const avatarLink = useValidation(link,{isEmpty: true,isLink: true,},isFocus);

  function handleOnFocus(e) {
    setFocus(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ link: link });
  }
  return (
    <>
      <PopupWithForm
        onSubmit={handleSubmit}
        name="avatar-update"
        title="Обновить аватар"
        isOpen={isOpen}
        onClose={onClose}
        children={
          <>
            <input
              ref={inputElements}
              type="url"
              name="link"
              onFocus={handleOnFocus}
              onChange = {handleOnChange}
              value = {link}
              id="card-url"
              placeholder="Ссылка на картинку"
              className="popup__input  popup__input_value_link"
              required
            />
            <span className= {`popup__input-error popup__input-error_possition_top card-url-error `}>{avatarLink.showText()}</span>
            <button type="submit"  className = {`popup__btn-save popup__btn-submit ${!avatarLink.isValid? 'popup__btn-inactive': ''}`} disabled = {!avatarLink.isValid}>
              {isLoad ? "Сохранение..." : "Сохранить"}
            </button>
          </>
        }
      />
    </>
  );
};

export default EditAvatarPopup;
