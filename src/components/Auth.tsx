import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { authorization } from "../asyncActions/thunkFunctions";


function Auth() {
    const dispatch = useDispatch();

    // для авторизации
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [emailErrors, setEmailErrors] = React.useState<string[]>([" "]);
    const [passwordErrors, setPasswordErrors] = React.useState<string[]>([" "]);

    // статус кнопки сабмита
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
    const [errorAuth, setErrorAuth] = React.useState<string[]>([" "]);


    const validateEmail = (rawEmail: any) => {
        return String(rawEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleEmail = function (e: React.ChangeEvent<HTMLInputElement>) {
        let emailForValidation = e.target.value;
        let errs = [];

        if (emailForValidation.length === 0) {
            errs.push("Email не может быть пустым.")
        }

        if (!validateEmail(emailForValidation)) {
            errs.push("Email введен неверно.")
        }

        setEmailErrors(errs);
        setEmail(emailForValidation);
        setButtonDisabled(Boolean(passwordErrors.length) || Boolean(errs.length));
    }


    const handlePassword = function (e:React.ChangeEvent<HTMLInputElement>) {
        let passwordForValidation = e.target.value;
        let errs = [];

        if (passwordForValidation.length === 0) {
            errs.push("Пароль не может быть пустым.")
        }

        setPasswordErrors(errs);
        setPassword(passwordForValidation);
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(errs.length));
    }


    function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(authorization(email, password, setErrorAuth));
    }

    function handleGoRegistration() {
        dispatch(push(`registration`));
    }

    function handleGoForgotPassword() {
        dispatch(push(`forgot-password`));
    }


    return (
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
                    <span className="authorization__form-error" id="email-error">{emailErrors.join(" ")}</span>

                    <p className="authorization__input-title">Пароль:</p>
                    <input className="authorization__form-input" id="password"
                           type="text"
                           name="password"
                           placeholder="Введите пароль"
                           required
                           onChange={handlePassword}/>
                    <span className="authorization__form-error" id="password-error">{passwordErrors.join(" ")}</span>
                    <span className="authorization__form-error" id="password-error">{errorAuth}</span>

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
    );
}

export default Auth;
