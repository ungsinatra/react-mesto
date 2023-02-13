import React from "react";
const PopupWithForm = ({ name, title, children, isOpen, onClose }) => {
  return (
    <div className={`popup popup_use_${name} ${isOpen ? `popup__opened` : ""}`}>
      <div className="popup__content">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть попап"
          className="popup__close-btn"
        ></button>
        <h4 className="popup__title">{title}</h4>
        <form
          action="#"
          method="post"
          name={name}
          className="popup__form popup__form_use_profile"
          noValidate
        >
          {children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
