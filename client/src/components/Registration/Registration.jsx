import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../actions/user";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import s from "./Registration.module.css";
import { setErrorS1 } from "../../reducers/userReducer";
import { FormErrors } from "./FormErrors/FormErrors";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const errorsServer = useSelector((state) => state.user.regErrors);
  const [errorsForm, setErrors] = useState({
    formErrors: { email: "", name: "", password: "" },
    emailValid: false,
    nameValid: false,
    passwordValid: false,
    formValid: false,
  });

  const startValidate = async () => {
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);
    if (errorsForm.formErrors.name === "" && errorsForm.formErrors.email === "" && errorsForm.formErrors.password === "") {
      dispatch(registration(email, password, name));
    }
  };

  function validateField(fieldName, value) {
    let fieldValidationErrors = errorsForm.formErrors;
    let emailValid = errorsForm.emailValid;
    let nameValid = errorsForm.nameValid;
    let passwordValid = errorsForm.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/);
        fieldValidationErrors.email = emailValid
          ? ""
          : "Введите корректный Email";
        break;

      case "name":
        nameValid = value.length >= 2;
        fieldValidationErrors.name = nameValid ? "" : "Слишком короткое имя";
        break;

        case "password":
          passwordValid = value.match(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/);
          fieldValidationErrors.password = passwordValid ? "" : "Пароль должен состоять минимум из 8 символов и содержать в себе несколько строчных и заглавных букв, цифры, специальные символы";
          break;

      default:
        break;
    }

    setErrors(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        nameValid: nameValid,
        passwordValid: passwordValid,
      },
      validateForm()
    );
  }

  function validateForm() {
    setErrors({ formValid: errorsForm.emailValid && errorsForm.nameValid && errorsForm.passwordValid });
  }

  return (
    <div className={s.registration}>
      <p className={s.registration__logo}>evelop</p>
      <p className={s.registration__title}>Регистрация</p>
      <Input
        value={name}
        setValue={setName}
        type="text"
        placeholder="Укажите имя"
        max="16"
        label="Имя"
      />
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
      <FormErrors formErrors={errorsForm.formErrors}/>
      {errorsServer ? <div className={s.error_reg}>{errorsServer}</div> : ""}
      <button
        onClick={() => startValidate()}
        className={s.registration__button}
      >
        Зарегистрироваться
      </button>
      <Link
        to="/login"
        className={s.registration__login}
        onClick={() => dispatch(setErrorS1())}
      >
        Войти в аккаунт
      </Link>
    </div>
  );
};

export default Registration;
