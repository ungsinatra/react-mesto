import React, { useState, useEffect } from "react";
import EditProfilePopup from "./modals/EditProfilePopup.js";
import Footer from "./layouts/Footer.js";
import Header from "./layouts/Header.js";
import DeleteCardPopup from "./modals/DeleteCardPopup.js";
import EditAvatarPopup from "./modals/EditAvatarPopup.js";
import Main from "./layouts/Main.js";
import ImagePopup from "./modals/ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import AddPlacePopup from "./modals/AddPlacePopup.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./layouts/Login.js";
import Register from "./layouts/Register.js";
import ProtectedRoute from "./widgets/ProtectedRoute.js";
import { verifiedToken } from "../utils/auth.js";
import InfoTooltip from "./modals/InfoTooltip.js";

function App() {
  
  const handleCardClick = (data) => {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      ...data,
    });
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const closeAllPopups = () => {
    if (selectedCard.isOpen) {
      setSelectedCard({ ...selectedCard, isOpen: false });
    }

    if (isAddPlacePopupOpen) {
      setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    if (isEditAvatarPopupOpen) {
      setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    if (isEditProfilePopupOpen) {
      setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }
    if (isDellCardPopup.isOpen) {
      setDellCardPopup({
        ...isDellCardPopup,
        isOpen: !isDellCardPopup.isOpen,
      });
    }
    if(authSuccess){
      setAuthSuccess(false)
    }
    if(authError){
      setAuthError(false)
    }
  };
  const [currentUser, setCurrentUser] = useState({

    userAvatar: "",
    userName: "",
    userDescription: "",
    id: "",
  });

  const [userData, setUserData] = useState({
    userName: "",
    _id: "",
  });

  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    link: "",
    name: "",
    isOpen: false,
  });
  const [isLoading, setLoading] = useState(false);
  const [authSuccess,setAuthSuccess] = useState(false);
  const [authError,setAuthError] = useState(false)
  const [isDellCardPopup, setDellCardPopup] = useState({
    _id: null,
    isOpen: false,
  });
  const [loggedIn, setLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function closeFromEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    console.log(cards);
    document.addEventListener("keydown", closeFromEscape);

    return () => {
      document.removeEventListener("keydown", closeFromEscape);
    };
  });
  function hanldeAuthSucc(){
      setAuthSuccess(true);
  }

  function hanldeAuthError(){
    setAuthError(true)
  }

  function handleLoggedIn(status) {
    setLoggedIn(status);
  }
  function handlerClearUserData() {
    setUserData({
      userName: "",
      _id: "",
    });
  }
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()]).then(
      ([userInfo, cardsList]) => {
        setCurrentUser({
          userAvatar: userInfo.avatar,
          userName: userInfo.name,
          userDescription: userInfo.about,
          id: userInfo._id,
        });
        setCards([...cardsList]);
      }
    );
  }, []);

  const handleCardDeleteClick = (data) => {
    console.log(data);
    setDellCardPopup((state) => {
      const newData = { ...state };
      newData.isOpen = true;
      newData._id = data._id;
      return newData;
    });
  };

 
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser.id);
    if (!isLiked) {
      api
        .likeCard({ _idCard: card._id, userData: currentUser })
        .then((newCard) => {
          setCards((state) => {
            const newState = state.map((c) => {
              return c._id === card._id ? newCard : c;
            });
            return [...newState];
          });
        });
    } else {
      api
        .removeLike({ _idCard: card._id, userData: currentUser })
        .then((newCard) => {
          console.log(newCard);
          setCards((state) => {
            const newState = state.map((c) => {
              return c._id === card._id ? newCard : c;
            });
            return [...newState];
          });
        });
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setLoggedIn(true);
      verifiedToken(jwt).then((res) => {
        console.log(res)
        setUserData({
          userName: res.data.email,
          _id: res.data._id,
        });
        navigate("/", { replace: true });
      });
    } 
  }

  function handleCardDelete(card) {
    console.log(card);
    handleloading(true);
    const deleteCard = api.deleteCard(card._id).then((res) => {
      setCards((state) => {
        const newState = state.filter((c) => {
          return c._id !== card._id;
        });
        return [...newState];
      });
      setDellCardPopup({
        ...isDellCardPopup,
        isOpen: false,
      });
    });
    deleteCard.catch((res) => {
      console.log("ERR", res);
    });
    deleteCard.finally(() => {
      handleloading(false);
    });
  }

  function handleUpdateUser(name, desc) {
    handleloading(true);
    const userUpdate = api
      .updateUserInfo({ name: name, about: desc })
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          userName: name,
          userDescription: desc,
        });
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
      });
    userUpdate.catch((err) => {
      console.log("err", err);
    });

    userUpdate.finally(() => {
      handleloading(false);
    });
  }

  function handleUpdateCardList({ name, link }) {
    handleloading(true);
    const card = api.setCard({ name: name, link: link }).then((res) => {
      setCards((state) => {
        const newStata = [res, ...state];
        return newStata;
      });
      setAddPlacePopupOpen(!isAddPlacePopupOpen);
    });
    card.catch((err) => {
      console.log("err", err);
    });
    card.finally(() => {
      handleloading(false);
    });
  }

  function handleUpdateAvatar({ link }) {
    handleloading(true);
    const avaterUpdate = api.updateAvatar({ link: link }).then((res) => {
      setCurrentUser({
        ...currentUser,
        userAvatar: link,
      });
      setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    });
    avaterUpdate.catch((err) => {
      console.log("err", err);
    });
    avaterUpdate.finally(() => {
      handleloading(false);
    });
  }

  function handleloading(status) {
    setLoading(status);
  }
  console.log(currentUser)
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          userName={userData.userName}
          onClearUserData={handlerClearUserData}
          onLoggedIn = {handleLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={loggedIn?<Navigate to = '/places'  replace/>:<Navigate to = '/sing-in' replace/>}
          />
          <Route
            path="/sing-in"
            element={<Login onChangeLogin={handleLoggedIn} isOpen = {authSuccess} onAuthSucc = {hanldeAuthSucc} onAuthError = {hanldeAuthError} userData = {userData} onUserData = {setUserData} />}
          />
          <Route path="/sing-up" element={<Register onChangeLogin={handleLoggedIn} isOpen = {authSuccess} onAuthSucc = {hanldeAuthSucc} onAuthError = {hanldeAuthError} />} />
          <Route
            path="/places"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                cards={cards}
                handlers={{
                  onCardClick: handleCardClick,
                  closePoupsHandler: closeAllPopups,
                  onAddPlace: handleAddPlaceClick,
                  onEditAvatar: handleEditAvatarClick,
                  onEditProfile: handleEditProfileClick,
                  onClickLike: handleCardLike,
                  onClickDelete: handleCardDeleteClick,
                }}
              />
            }
          />
        </Routes>
        {loggedIn&&<Footer />}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoading}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoading}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleUpdateCardList}
          isLoad={isLoading}
        />
        <DeleteCardPopup
          isLoad={isLoading}
          card={isDellCardPopup}
          onClose={closeAllPopups}
          isOpen={isDellCardPopup.isOpen}
          onSubmit={handleCardDelete}
        />
        <InfoTooltip name = 'auth-success' isOpen={authSuccess} onClose = {closeAllPopups} title = 'Вы успешно зарегистрировались!'/>
        <InfoTooltip name = 'auth-error' isOpen={authError} onClose = {closeAllPopups} title = {`Что-то пошло не так!
Попробуйте ещё раз.`}/>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
