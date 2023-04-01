import React from 'react';
import { useNavigate } from 'react-router-dom'
const NavBar = ({loggedIn,onClearUserData,onLoggedIn,className}) => {

    const navigate = useNavigate();

    function logOutHandler(){
        localStorage.removeItem('jwt');
        navigate('/sing-in',{replace:true});
        onClearUserData()
        onLoggedIn(false);
    }

    function regHandler(){
        navigate('/sing-up',{replace:true});
    }
    return (
                
        <nav>
                <button className = {`${(loggedIn)?className:'header__link_use_auth'}`} onClick={loggedIn?logOutHandler:regHandler}>{loggedIn?"Выйти":"Регистрация"}</button>
        </nav>
        
        
    );
};

export default NavBar;