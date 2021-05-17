import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import "./EditAvatarPopup.css";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: `${avatarRef.current.value}`,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
    >
      <form
        onSubmit={handleSubmit}
        className="popup__form popup__form_area_avatar"
        name="avatar"
      >
        <input
          ref={avatarRef}
          autoComplete="off"
          required
          type="url"
          id="Link-Avatar"
          placeholder="Ссылка на аватар"
          name="link"
          className="popup__input popup__input_form_avatar"
        />
        <span
          id="Link-Avatar-error"
          className="popup__error popup__error_area_avatar"
        ></span>
        <button
          type="submit"
          className="popup__submit-btn popup__submit-btn_avatar"
        >
          Сохранить
        </button>
      </form>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;



