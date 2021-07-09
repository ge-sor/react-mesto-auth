import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../blocks/login/login.css";

export default function Login({ handleLogin }) {
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
    handleLogin(email, password);
  }

  return (
    <>
    <Header >
    <Link to="register" className="register__login-link">Регистрация</Link></Header>
    <div className="login">
      
      <p className="login__welcome">Добро пожаловать!</p>
      <form onSubmit={handleSubmit} className="login__form">
        <label htmlFor="email">Логин:</label>
        <input className="hidden-input" type="text" name="text"/>

        <input
          required
          id="email"
          name="email"
          type="text"
          value={data.email}
          onChange={handleChange}
          className="register__input"
        />
        <label htmlFor="password">Пароль:</label>
        <input
          required
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="register__input"
        />

        <button type="submit" className="register__link">
          Войти
        </button>
      </form>
      
    </div>
    </>
  );
}
