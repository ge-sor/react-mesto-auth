import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
    setCardName("");
    setCardLink("");
  }

  return (
    <PopupWithForm
      name="new-post"
      title="Новое&nbsp;место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="form__field">
        <input
          id="card-name-input"
          type="text"
          className="form__input form__input_type_place-name"
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={cardName || ""}
          onChange={handleCardNameChange}
        />
        <span className="card-name-input-error form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          id="url-input"
          type="url"
          className="form__input form__input_type_pic"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={cardLink || ""}
          onChange={handleCardLinkChange}
        />
        <span className="url-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
