import React from "react";
import "./ImagePopup.css";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_zoom ${card && "popup_visible"}`}>
      <div className="popup__window popup__window-zoom">
        <img
          className="popup__image-zoom"
          src={`${card?.target.src}`}
          alt={card?.target.alt}
        />
        <h2 className="popup__title-zoom">{card?.target.alt} </h2>
        <button
          type="button"
          onClick={onClose}
          className="popup__close-btn popup__close-btn_zoom-image"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;

