import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {
    errorBlankEmail,
    errorBlankPassword,
    errorIncorrectEmail,
    errorPasswordMustContain
} from "../constants/errorsText";
import {regexpEmail, regexpPassword} from "../constants/regExp";
import {checkEmail} from "../asyncActions/registration";


const Registration = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [emailErrors, setEmailErrors] = useState<string[]>([" "]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([" "]);
    const [profileErrors, setProfileErrors] = useState<string[]>([" "]);

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
        setProfileErrors([]);
        const errs = [];

        if (emailForValidation.length === 0) {
            errs.push(errorBlankEmail)
        }

        if (!validateEmail(emailForValidation) && (emailForValidation.length !== 0)) {
            errs.push(errorIncorrectEmail)
        }

        setEmailErrors(errs);
        setEmail(emailForValidation);
        setButtonDisabled(Boolean(passwordErrors.length) || Boolean(errs.length));
    }


    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordForValidation = e.target.value;
        const errs = [];

        if (passwordForValidation.length === 0) {
            errs.push(errorBlankPassword)
        }

        if (!validatePassword(passwordForValidation) && passwordForValidation.length !== 0) {
            errs.push(errorPasswordMustContain)
        }

        setPasswordErrors(errs);
        setPassword(passwordForValidation);
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(errs.length));
    }


    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errs: any[] = [];
        dispatch(checkEmail(email, password, errs, setProfileErrors, setEmail, setPassword));
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
                        <span className="authorization__form-error" id="password-error">{profileErrors}</span>

                        <p className="authorization__input-title">E-mail:</p>
                        <input className="authorization__form-input" id="email"
                               type="email"
                               name="email"
                               placeholder="Введите адрес эл.почты"
                               required
                               value={email}
                               onChange={handleChangeEmail}/>
                        <span className="authorization__form-error" id="email-error">{emailErrors}</span>

                        <p className="authorization__input-title">Пароль:</p>
                        <input className="authorization__form-input" id="password"
                               type="text"
                               name="password"
                               placeholder="Введите пароль"
                               required
                               value={password}
                               onChange={handleChangePassword}/>
                        <span className="authorization__form-error" id="password-error">{passwordErrors}</span>

                        <button className="authorization__button-save"
                                type="submit"
                                disabled={buttonDisabled}>Зарегистрироваться</button>
                    </form>

                    <p className="title" id="password-error">Уже зарегистрированы?
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