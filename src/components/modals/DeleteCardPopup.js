import React  from "react";
const DeleteCardPopup = ({ onClose, isOpen, onSubmit, card, isLoad }) => {


 

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }
  return (
    <div
      className={`popup popup_use_del ${isOpen ? `popup__opened` : ""}`}
      onClick={onClose}
    >
      <div className={`popup__content_use_del`}>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть попап"
          className="popup__close-btn"
        ></button>
        <h4 className="popup__title_use_del">Вы уверены?</h4>
        <form
          onSubmit={handleSubmit}
          action="#"
          method="post"
          name="del"
          className="popup__form popup__form_use_profile"
          noValidate
        >
          <button
            type="submit"
            className={`popup__btn-save popup__btn-submit ${
              isLoad ? "popup__btn-inactive" : ""
            }`}
            disabled={isLoad ? true : false}
          >
            {isLoad ? "Удаление..." : "Да"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteCardPopup;
