import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import "./EditProfilePopup.css";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const сurrentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(сurrentUser.name);
    setDescription(сurrentUser.about);
  }, [сurrentUser]);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль"
    >
      <form
        onSubmit={handleSubmit}
        name="subscribe-form-profile"
        className="popup__form popup__form_area_editprofile"
        noValidate
      >
        <input
          autoComplete="off"
          required
          minLength="2"
          maxLength="40"
          type="text"
          id="name-card"
          placeholder="Имя"
          name="name"
          className="popup__input popup__input_form_name"
          value={name}
          onChange={handleChangeName}
        />
        <span
          id="name-card-error"
          className="popup__error popup__error_area_name"
        ></span>
        <input
          autoComplete="off"
          required
          minLength="2"
          maxLength="40"
          type="text"
          id="about-card"
          placeholder="О себе"
          name="about"
          className="popup__input popup__input_form_about"
          value={description}
          onChange={handleChangeDescription}
        />
        <span
          id="about-card-error"
          className="popup__error popup__error_area_about"
        ></span>
        <button
          type="submit"
          className="popup__submit-btn popup__submit-btn_edit-profile"
        >
          Сохранить
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditProfilePopup;


