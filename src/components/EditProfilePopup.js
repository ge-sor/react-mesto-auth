import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать&nbsp;профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="form__field">
        <input
          id="profile-name-input"
          type="text"
          className="form__input form__input_type_name"
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="profile-name-input-error form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          id="profile-caption-input"
          type="text"
          className="form__input form__input_type_caption"
          name="caption"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span className="profile-caption-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
