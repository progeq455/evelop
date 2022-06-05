import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/user";
import { setErrorS2 } from "../../reducers/userReducer";
import Input from "../Input/Input";
import s from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.user.authErrors);

  return (
    <div className={s.login}>
      <p className={s.login__logo}>evelop</p>
      <p className={s.login__title}>Авторизация</p>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите Email"
        label="Email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль"
        label="Пароль"
      />
      {errors ? <div className={s.error_log}>{errors}</div> : ""}
      <button
        onClick={() => dispatch(login(email, password))}
        className={s.login__button}
      >
        Войти
      </button>
      <Link to="/registration" className={s.login__reg} onClick={() => dispatch(setErrorS2())}>
        Зарегистрировать новый аккаунт
      </Link>
    </div>
  );
};

export default Login;
