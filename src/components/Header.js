import React from "react";
import logo from "../images/header__logo.svg";
export default function Header({ children }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {children} 
      
    </header>
  );
}
