import React from 'react';
import headerLogo from '../images/logo.svg';

const Header = () => {
    return (
        <header className="header">
        <img src={headerLogo} className="header__logo" alt="Логотип шапки" />
      </header>
    );
};

export default Header;