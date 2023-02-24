import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div
      onMouseDown={onClose}
      className={`popup popup_use_img ${card.isOpen ? `popup__opened` : ""}`}
    >
      <div className="popup__content_use_img">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть попап"
          className="popup__close-btn popup__close-btn-img"
        ></button>
        <img src={card.link} alt="" className="popup__img" />
        <p className="popup__desc">{card.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
