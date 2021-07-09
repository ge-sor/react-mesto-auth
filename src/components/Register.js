import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../blocks/register/register.css";

export default function Register({ handleRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = data;
    handleRegister(email, password);
  }

  return (
    <>
    <Header >
    <Link to="login" className="register__login-link">Войти</Link></Header>
    <div className="register">
      
      <p className="login__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email">Email:</label>
        <input className="hidden-input" type="text" name="text"/>

        <input
          className="register__input"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Пароль:</label>
        <input
          className="register__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit" className="register__link">
          Зарегистрироваться
        </button>
      </form>

      <div className="register__signin">
        <p>Уже зарегистрированы?&nbsp;</p>
        <Link to="login" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
    </>
  );
}
