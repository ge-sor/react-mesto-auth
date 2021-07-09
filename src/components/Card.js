import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `button card__delete-btn ${
    isOwn ? "card__delete-btn_visible" : ""
  }`;

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__likes-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
