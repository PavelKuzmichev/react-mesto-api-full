import React from "react"; 
import "./Main.css"; 
import Card from "./Card.js"; 
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) { 
    const сurrentUser = React.useContext(CurrentUserContext);
    
    
    
 
    return ( 
        <div> 
            <section className="profile"> 
                <img className="profile__avatarIcon" src={сurrentUser.avatar} alt="аватар пользователя" /> 
                <div className="profile__edit-avatar" onClick={onEditAvatar}></div> 
                <div className="profile__form"> 
                    <h1 name="profileName" className="profile__name"> 
                        {сurrentUser.name} 
                    </h1> 
                    <p name="profileAbout" className="profile__about"> 
                        {сurrentUser.about} 
                    </p> 
                </div> 
                <button type="button" onClick={onEditProfile} className="profile__edit-button"></button> 
                <button type="button" onClick={onAddPlace} className="profile__add-button"></button> 
            </section> 
            <section className="elements"> 
                {cards.map((item) => ( 
                    <Card key={item._id} onCardLike={onCardLike} onCardClick={onCardClick} onCardDelete={onCardDelete} item={item} /> 
                ))} 
            </section> 
        </div> 
    ); 
} 
 
export default Main; 