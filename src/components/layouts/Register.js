import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { register } from "../../utils/reg";
import { useNavigate } from "react-router-dom";

const Register = ({onChangeLogin,onAuthSucc, onAuthError}) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  function inputHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const response = register.reg(formValue).then((res) => {
      console.log(res);
      navigate("/sing-in", { replace: true });
    });
    response.catch((e) => {
        onAuthError()
      console.error(e);
    });
  }

  return (
    <div className="auth">
      <div className="auth__items">
        <h1 className="auth__title">Регистрация</h1>
        <form className = 'auth__form' name="register" method="#" onSubmit={handleSubmit}>
          <input
            className="auth__form-input"
            type="email"
            placeholder="Email"
            name="email"
            value={formValue.email}
            onChange={inputHandler}
          />
          <input
            className="auth__form-input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={formValue.password}
            onChange={inputHandler}
          />
          <button className = 'auth__form-btn'type="submit">Зарегистрироваться</button>
        </form>
        <NavLink className='auth__link' to="/sing-in">Уже зарегистрированы? Войти</NavLink>
      </div>
    </div>
  );
};

export default Register;
