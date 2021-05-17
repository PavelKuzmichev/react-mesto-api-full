import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import "./AddPlacePopup.css";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({
      name: name,
      link: link,
    });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-element"
      title="Новое место"
    >
      <form
        onSubmit={handleSubmit}
        name="subscribe-form-card"
        className="popup__form popup__form_area_newcard"
        noValidate
      >
        <input
          onChange={handleChangeName}
          autoComplete="off"
          value={name}
          required
          minLength="2"
          maxLength="40"
          type="text"
          id="title-card"
          placeholder="Название"
          name="name"
          className="popup__input popup__input_form_title"
        />
        <span
          id="title-card-error"
          className="popup__error popup__error_area_title"
        ></span>
        <input
          onChange={handleChangeLink}
          autoComplete="off"
          value={link}
          required
          type="url"
          id="link-card"
          placeholder="Ссылка на картинку"
          name="link"
          className="popup__input popup__input_form_link"
        />
        <span
          id="link-card-error"
          className="popup__error popup__error_area_link"
        ></span>
        <button
          type="submit"
          className="popup__submit-btn popup__submit-btn_add-element"
        >
          Сохранить
        </button>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;


