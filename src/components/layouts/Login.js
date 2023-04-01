import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/auth";
const Login = ({ onChangeLogin, onAuthSucc, onAuthError,onUserData,userData }) => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleLogin(status) {
    onChangeLogin(status);
  }

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
    auth
      .login({ password: formValue.password, email: formValue.email })
      .then((res) => {
        console.log(res)
        if (res.token) {
          handleLogin(true);
          setFormValue({
            email: "",
            password: "",
          });
          onUserData({
            ...userData,
            userName:formValue.email
          })
          localStorage.setItem("jwt", res.token);
          navigate("/places", { replace: true });
          onAuthSucc();
          return;
        } else {
          console.log("jwt нету!!");
          onAuthError()
          return;
        }
      })
      .catch((res) => {
        onAuthError();
        setFormValue({
          email: "",
          password: "",
        });
      });
  }
  return (
    <div className="auth">
      <div className="auth__items">
        <h1 className="auth__title">Вход</h1>
        <form className="auth__form" name="register" method="#" onSubmit={handleSubmit}>
          <input
            className="auth__form-input"
            value={formValue.email}
            type="email"
            placeholder="Email"
            name="email"
            onChange={inputHandler}
          />
          <input
            className="auth__form-input"

            type="password"
            value={formValue.password}
            onChange={inputHandler}
            placeholder="Пароль"
            name="password"
          />
          <button className = 'auth__form-btn' type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
