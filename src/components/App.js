import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [cards, setCards] = useState([]);

  const [userData, setUserData] = useState({
    email: "",
  });

  const history = useHistory();

   const tokenCheck = useCallback(() => {
     const jwt = localStorage.getItem("jwt");

   if (jwt) {
     auth.getContent(jwt).then((res) => {
       if (res.email) {
         setUserData({
           email: res.email,
         });
         setLoggedIn(true);
         history.push("/");
       }
     });
   }
  }, [history]) 
    
  

  
  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getCardsInfo()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((newCard) => newCard !== card))
      )
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(user) {
    api
      .updateUserInfo(user)
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(user) {
    api
      .updateAvatar(user)
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .newCard(card)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }


  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.data.email) {
          
          setRegistered(true)
          history.push("/login");
          
        }
        setIsInfoToolTipOpen(true)
      })
      .catch((err) => {
        setIsInfoToolTipOpen(true)
      console.log(err)});
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setUserData({
            email: email,
          });
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err)
        setIsInfoToolTipOpen(true)
      });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
          setRegistered(false)
    setLoggedIn(false);
    history.push("/login");
  }

  useEffect(() => {
    tokenCheck(); }, [tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        

          
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            onSignOut={onSignOut}
  userData={userData}
          />

          <Route path="/register">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
          </Route>
        </Switch>

        

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="confirm"
          title="Вы&nbsp;уверены?"
          buttonText="Да"
        />

        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} registered={registered}/>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
