import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import Logo from "../images/logo.jpg";
import "./Header.css";

function Header({ email, onClick, loggedIn }) {
    const [isOpen, setIsOpen] = React.useState(true);
  const [isClicked, setIsClicked] = React.useState(false);
  const linkClassName = "header__link opacity header__link_visible";
  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };
 
    return (<>
        
        <header className="header">
        <a target="_self" href="#">
                <img src={Logo} className="header__logo" alt="логотип сайта" />
            </a>
        {loggedIn && <div className={`header__menu ${isOpen ? `` : `header__menu_visible`}`}>
        <p className="header__email_menu">{email}</p>
        <Link to="/sign-in" onClick={onClick} className="header__link_menu">Выйти</Link>
      </div>}
           
            <div className="header__nav">
          <Switch>
            <Route path="/sign-in">
              <Link to="/sign-up" className={linkClassName}>Регистрация</Link>
            </Route>
            <Route path="/sign-up">
              <Link to="/sign-in" className={linkClassName}>Войти</Link>
            </Route>
            <Route path="/">
              <button className={`button opacity header__button 
                ${isClicked ? 'header__button_close' : 'header__button_open'}`}
                onClick={handleClick}
              >
              </button>
              <p className="header__email">{email}</p>
              <Link to="/sign-in" onClick={onClick} className="header__link opacity">Выйти</Link>
            </Route>
          </Switch>
        </div>
        </header></>
    );
}

export default Header;