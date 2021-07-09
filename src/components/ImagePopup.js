import React from "react";

export default function ImagePopup({ onClose, card }) {
  return (
    <section
      id="popup-fullscreen-pic"
      className={`popup popup_type_fullscreen-pic ${card && "popup_opened"}`}
    >
      <div className="popup__container-pic">
        <button
          type="button"
          className="button popup__close-btn popup__close-btn_fullscreen-pic"
          onClick={onClose}
        ></button>
        <img
          className="popup__image-fullscreen"
          src={card?.link}
          alt={card?.name}
        />
        <h2 className="popup__text-fullscreen">{card ? card.name : ""}</h2>
      </div>
    </section>
  );
}
