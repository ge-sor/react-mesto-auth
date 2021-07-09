import React from "react";

export default function PopupWithForm({
  onClose,
  children,
  isOpen,
  name,
  title,
  onSubmit,
  buttonText,
}) {
  return (
    <section
      id={`popup-${name}`}
      className={`popup popup_type_${name}  ${isOpen ? "popup_opened" : ""} `}
    >
      <div className="popup__container">
        <button
          type="button"
          className="button popup__close-btn"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`form form_type_${name}`}
          id={`form-${name}`}
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          <fieldset className="form__set">
            {children}
            <button
              type="submit"
              className={`form__submit button popup__save-btn popup__save-btn_type_${name}-save`}
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
