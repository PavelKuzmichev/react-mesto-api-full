import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import "./Card.css";

function Card({ onCardLike, onCardClick, onCardDelete, item }) {
    const сurrentUser = React.useContext(CurrentUserContext);
    const isOwn = item.owner === сurrentUser._id;
    const cardDeleteButtonClassName = `${isOwn ? "element__remove" : "element__remove element__remove_clear"}`;
    const isLiked = item.likes.some((i) => i === сurrentUser._id);
    const cardLikeButtonClassName = `${isLiked ? "element__like element__like_active" : "element__like"}`;
    function handleLikeClick() {
        onCardLike(item);
    }
    function handleDeleteClick() {
        onCardDelete(item);
    }
    return (
        <div className="element">
            <img className="element__image" onClick={onCardClick} src={`${item.link}`} alt={item.name} />
            <h3 className="element__title">{item.name}</h3>
            <h4 className="element__likeSum">{item.likes.length}</h4>
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </div>
    );
}

export default Card;

