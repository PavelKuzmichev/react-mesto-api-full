import React from "react";
import "../index.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js'
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.js';
function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  React.useEffect(() => {
    tokenCheck();
      }, []);
  const [cards, setCards] = React.useState([]);
  
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }
  function handleCardDelete(card) {
      api
        .removeCard(card._id)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id)); 
        })
        .catch((error) => console.log(error));
    
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  
  function handleCardClick(Card) {
    setSelectedCard(Card);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
    setMessagePopupOpen(false);
  }
  function handleUpdateUser({name,about}) {
       api
      .editProfileInfo({name,about})
      .then((newUser) =>{
        setCurrentUser(newUser)
      })
      .then(() => closeAllPopups()) 
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar({avatar}) {
    api
      .editAvatarIcon({avatar})
      .then((newUser) =>{
       
        setCurrentUser(newUser)
      })
      .then(() => closeAllPopups()) 
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit({name,link}) {
    
    api
      .addCard({name,link})
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups()) 
      .catch((err) => {
        console.log(err);
      });
  }

  
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isMessagePopupOpen, setMessagePopupOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false)
    history.push('/sign-in')
  }
  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        if (data) {
          history.push('/sign-in');
               setMessagePopupOpen(true);
          setIsSuccessful(true);
          setMessage('Вы успешно зарегистрировались!');
        }
      })
      .catch((err) => {
        setMessage('Что-то пошло не так! Попробуйте ещё раз');
        setMessagePopupOpen(true);
        setIsSuccessful(false);
        if (err === 400) {
          return console.log('некорректно заполнено одно из полей');
        }
      })}
      function handleLoginSubmit(email, password) {
        auth.authorize(email, password)
          .then((data) => {
            if (data.token) {
              setEmail(email)
              setLoggedIn(true);
              localStorage.setItem('token', data.token)
              history.push('/')
            }
          })
          .catch((err) => {
            setMessage('Что-то пошло не так! Попробуйте ещё раз');
            setMessagePopupOpen(true);
            setIsSuccessful(false);
            if (err === 400) {
              return console.log('не передано одно из полей');
            }
            if (err === 401) {
              return console.log('пользователь с email не найден');
            }
          })
      }
      function tokenCheck() {
        const token = localStorage.getItem('token');
        if (token) {
         
          auth.checkToken(token)
            .then((data) => {
              
              setEmail(data.email)
              setLoggedIn(true)
              history.push('/')
            })
            .catch((err) => {
              if (err === 401) {
                return console.log('Токен не передан или передан не в том формате');
              }
            })
        }
      }
      React.useEffect(() => {
        if (loggedIn){
        api
          .addProfileInfo()
          .then((userData) => {
            setCurrentUser(userData);
          })
          .catch((err) => {
            console.log(err);
          });
      }}, [loggedIn]);
      React.useEffect(() => {
        if (loggedIn){
        api
          .addAllCards()
          .then((cardData) => {
            setCards(cardData);
          })
          .catch((err) => {
            console.log(err);
          });
      }}, [loggedIn]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
        <Header
            email={email}
            onClick={onSignOut}
            loggedIn={loggedIn}
          />
          <Switch>
          <Route path='/sign-in'>
            <Login 
            onLoggin={handleLoginSubmit}
            />
          </Route>
          <Route path="/sign-up">
              <Register
                onRegister={handleRegisterSubmit}
              /></Route>
          <ProtectedRoute exact path='/' loggedIn={loggedIn}>
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          /></ProtectedRoute>
          <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
<InfoTooltip
          isOpen={isMessagePopupOpen}
          isSuccess={isSuccessful}
          message={message}
          onClose={closeAllPopups}
        />
          <PopupWithForm name="delete-confirm" title="Вы уверены?">
            <form className="popup__form popup__form_area_confirm">
              <button
                type="submit"
                className="popup__submit-btn popup__submit-btn_delete-confirm"
              >
                Да
              </button>
            </form>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

