import React from "react";

import "./PopupWithForm.css";

function PopupWithForm({ isOpen, onClose, name, title, children }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_visible"}`}>
      <div className={`popup__window popup__window_${name}`}>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className={`popup__close-btn popup__close-btn_${name}`}
        ></button>
        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;

