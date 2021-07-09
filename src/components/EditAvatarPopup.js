import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить&nbsp;аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="form__field">
        <input
          id="avatar-input"
          type="url"
          className="form__input form__input_type_avatar"
          name="link"
          required
          placeholder="Ссылка на аватар"
          ref={avatarRef}
        />
        <span className="avatar-input-error form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}
