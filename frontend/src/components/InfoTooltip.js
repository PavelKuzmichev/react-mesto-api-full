import React from 'react';
import PopupWithForm from './PopupWithForm';
import error from '../images/error.svg';
import success from '../images/success.svg';

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  
  return (
    <PopupWithForm
      name="confirm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <img
        className="popup__image"
        src={isSuccess ? success : error}
        alt="Изображение"
      />
      <p className="popup__message">{message}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;