import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {
    errorBlankEmail,
    errorBlankPassword,
    errorIncorrectEmail
} from "../constants/errorsText";
import { regexpEmail } from "../constants/regExp";
import {authorization} from "../asyncActions/auth";


const Auth = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErrors, setEmailErrors] = useState<string>(" ");
    const [passwordErrors, setPasswordErrors] = useState<string>(" ");
    const [authErrors, setAuthErrors] = useState<string>(" ");

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);


    const validateEmail = (rawEmail: any) => {
        return String(rawEmail)
            .toLowerCase()
            .match(regexpEmail);
    };


    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailForValidation = e.target.value;
        setAuthErrors("");

        let error = "";

        if (emailForValidation.length === 0) {
            error = errorBlankEmail;
        }

        if (!validateEmail(emailForValidation) && (emailForValidation.length !== 0)) {
            error = errorIncorrectEmail;
        }

        setEmailErrors(error);
        setEmail(emailForValidation);
        setButtonDisabled(Boolean(passwordErrors.length) || Boolean(error.length));
    }


    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordForValidation = e.target.value;
        setAuthErrors("");

        let error = "";

        if (passwordForValidation.length === 0) {
            error = errorBlankPassword;
        }

        setPasswordErrors(error);
        setPassword(passwordForValidation);
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(error.length));
    }


    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authorization(email, password, setAuthErrors));
        setButtonDisabled(true);
    }

    const handleGoRegistration = () => {
        dispatch(push(`registration`));
    }

    const handleGoForgotPassword = () => {
        dispatch(push(`forgot-password`));
    }


    return (
        <section className="todo">
            <div className="auth">
                <div className="authorization">
                    <h2 className="authorization__title">Авторизация</h2>
                    <form className="authorization__form"
                          onSubmit={handleSubmit}>

                        <p className="authorization__input-title">E-mail:</p>
                        <input className="authorization__form-input" id="email"
                               type="email"
                               name="email"
                               placeholder="Введите адрес эл.почты"
                               required
                               onChange={handleEmail}/>
                        <span className="authorization__form-error" id="email-error">{emailErrors}</span>

                        <p className="authorization__input-title">Пароль:</p>
                        <input className="authorization__form-input" id="password"
                               type="text"
                               name="password"
                               placeholder="Введите пароль"
                               required
                               onChange={handlePassword}/>
                        <span className="authorization__form-error" id="password-error">{passwordErrors || authErrors}</span>

                        <button className="authorization__button-save"
                                type="submit"
                                disabled={buttonDisabled}>Войти</button>
                    </form>

                    <button className="registration"
                            onClick={handleGoRegistration}>Зарегистрироваться</button>
                </div>

                <button className="forgot-password"
                        onClick={handleGoForgotPassword}>Забыли пароль?</button>
            </div>
        </section>
    );
}

export default Auth;
