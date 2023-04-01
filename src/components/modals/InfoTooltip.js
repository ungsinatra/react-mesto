import React from "react";
import UnionImg from '../../images/popup/Union.svg';
import ErrorImg from '../../images/popup/Rectangle.svg';
const InfoTooltip = ({ name, isOpen, onClose, title }) => {

  const img  = name==='auth-success'?UnionImg:ErrorImg;
  return (
    <div
      className={`popup popup_use_${name} ${isOpen ? `popup__opened` : ""}`}
      // onMouseDown = { isOpen && onClose}
    >
      <div className={`popup__content`}>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть попап"
          className="popup__close-btn"
        ></button>
        <div
          className="popup__img_use_auth"
          style={{
            backgroundImage:`url(${img})`,
          }}
        ></div>
        <p className="popup__title_use_auth">{title}</p>
      </div>
    </div>
  );
};
export default InfoTooltip;
