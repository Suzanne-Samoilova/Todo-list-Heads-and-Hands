import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { push } from "connected-react-router";
import {
    errorBlankEmail,
    errorBlankPassword,
    errorIncorrectEmail,
    errorPasswordMustContain
} from "../constants/errorsText";
import {regexpEmail, regexpPassword} from "../constants/regExp";
import {checkEmail} from "../asyncActions/registration";
import {selectorProfileState} from "../store/profile/selector";
import {clearErrorExistsEmailAction} from "../store/profile/action";


const Registration = () => {
    const dispatch = useDispatch();
    const errorExistsEmail = useSelector(selectorProfileState).errorExistsEmail;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErrors, setEmailErrors] = useState<string>(" ");
    const [passwordErrors, setPasswordErrors] = useState<string>(" ");

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);


    const validateEmail = (rawEmail: any) => {
        return String(rawEmail)
            .toLowerCase()
            .match(regexpEmail);
    };

    const validatePassword = (rawPassword: any) => {
        return String(rawPassword)
            .toLowerCase()
            .match(regexpPassword);
    };


    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailForValidation = e.target.value;
        let error = "";

        if (errorExistsEmail) {
            dispatch(clearErrorExistsEmailAction());
        }

        if (emailForValidation.length === 0) {
            error = errorBlankEmail
        }

        if (!validateEmail(emailForValidation) && (emailForValidation.length !== 0)) {
            error = errorIncorrectEmail
        }

        setEmailErrors(error);
        setEmail(emailForValidation);
        password
            ? setButtonDisabled(Boolean(passwordErrors.length) || Boolean(error.length))
            : setButtonDisabled(true);
    }


    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordForValidation = e.target.value;
        let error = "";

        if (errorExistsEmail) {
            dispatch(clearErrorExistsEmailAction());
        }

        if (passwordForValidation.length === 0) {
            error = errorBlankPassword
        }

        if (!validatePassword(passwordForValidation) && passwordForValidation.length !== 0) {
            error = errorPasswordMustContain
        }

        setPasswordErrors(error);
        setPassword(passwordForValidation);
        email
            ? setButtonDisabled(Boolean(emailErrors.length) || Boolean(error.length))
            : setButtonDisabled(true);
    }


    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(checkEmail(email, password));

        if (!errorExistsEmail) {
            setEmail("");
            setPassword("");
        }

        setButtonDisabled(true);
    }

    const handleGoAuth = () => {
        dispatch(push(`auth`));
    }

    const handleGoForgotPassword = () => {
        dispatch(push(`forgot-password`));
    }


    return (
        <section className="todo">
            <div className="auth">
                <div className="authorization">
                    <h2 className="authorization__title">Регистрация</h2>

                    <form className="authorization__form"
                          onSubmit={handleSubmit}>
                        <span className="authorization__form-error">{errorExistsEmail}</span>

                        <p className="authorization__input-title">E-mail:</p>
                        <input className="authorization__form-input"
                               type="email"
                               name="email"
                               placeholder="Введите адрес эл.почты"
                               required
                               value={email}
                               onChange={handleChangeEmail}/>
                        <span className="authorization__form-error">{emailErrors}</span>

                        <p className="authorization__input-title">Пароль:</p>
                        <input className="authorization__form-input"
                               type="text"
                               name="password"
                               placeholder="Введите пароль"
                               required
                               value={password}
                               onChange={handleChangePassword}/>
                        <span className="authorization__form-error">{passwordErrors}</span>

                        <button className="authorization__button-save"
                                type="submit"
                                disabled={buttonDisabled}>Зарегистрироваться</button>
                    </form>

                    <p className="title">Уже зарегистрированы?
                        <button className="title__button"
                                onClick={handleGoAuth}>Авторизоваться</button>
                    </p>

                </div>

                <button className="forgot-password"
                        onClick={handleGoForgotPassword}>Забыли пароль?</button>
            </div>
        </section>
    );
}

export default Registration;
