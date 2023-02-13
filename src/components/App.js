import React,{useState} from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";

import Main from "./Main.js";

function App() {
  const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen,setEditProfilePopupOpen] = useState(false);
  const [selectedCard,setSelectedCard] = useState({link:'',name:'',isOpen:false});


  const handleCardClick = (data) => {
    setSelectedCard({
      ...selectedCard,isOpen:true,
      ...data
    });
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  };

  const closeAllPopups = () => {
    if(selectedCard.isOpen){
      setSelectedCard({...selectedCard,isOpen:false});
    }

    if(isAddPlacePopupOpen){
      setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    if(isEditAvatarPopupOpen){
      setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    if(isEditProfilePopupOpen){
      setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

  }
  return (
    <div className="page">
      <Header />
      <Main  onCardClick = {handleCardClick} closePoupsHandler = {closeAllPopups} onEditAvatar = {handleEditAvatarClick} onAddPlace = {handleAddPlaceClick} onEditProfile ={handleEditProfileClick} statement = {{
        avatar:isEditAvatarPopupOpen,
        card:isAddPlacePopupOpen,
        profile:isEditProfilePopupOpen,
        selectedCard:selectedCard
      }}  />

      <Footer />
    </div>
  );
}

export default App;
