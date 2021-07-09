import React from "react";
import fail_img from "../images/login-fail.svg";
import success_img from "../images/login-success.svg";

export default function InfoToolTip({ isOpen, onClose, registered }) {
  return (
    <section
      id="infoToolTip"
      className={`popup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="button popup__close-btn"
          onClick={onClose}
        ></button>
        <div className="popup__image-container">
        <img
          className="popup__image-login"
          src={registered ? success_img : fail_img}
          alt="logo"
        />
        <h2 className="popup__text-login">{registered ? `Вы успешно зарегистрировались!` : `Что-то пошло не так!
Попробуйте ещё раз.`}</h2>
</div>
      </div>
    </section>
  );
}
