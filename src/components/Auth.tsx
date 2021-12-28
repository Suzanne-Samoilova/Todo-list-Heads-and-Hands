import React, {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginAction} from "../store/reducerAuth";
import { push } from "connected-react-router";


function Auth() {

    const validateEmail = (rawEmail: any) => {
        return String(rawEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // для авторизации
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    // статус кнопки сабмита
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);

    const [emailErrors, setEmailErrors] = React.useState<string[]>([" "]);
    const [passwordErrors, setPasswordErrors] = React.useState<string[]>([" "]);

    const handleEmail = function (e:React.ChangeEvent<HTMLInputElement>) {

        let emailForValidation = e.target.value;
        let errs = [];

        if (emailForValidation.length === 0) {
            errs.push("Email не может быть пустым.")
        }

        if (!validateEmail(emailForValidation)) {
            errs.push("Формат неверный.")
        }

        setEmailErrors(errs)
        setEmail(emailForValidation)
        setButtonDisabled(Boolean(passwordErrors.length) || Boolean(errs.length));
        console.log("handleEmail: perr = ", passwordErrors.length, " +++ ", "eerr = ", errs, " +++ ", "btnDis = ", Boolean(passwordErrors) || Boolean(errs))
    }


    const handlePassword = function (e:React.ChangeEvent<HTMLInputElement>) {

        let passwordForValidation = e.target.value;
        let errs = [];

        if (passwordForValidation.length === 0) {
            errs.push("Пароль не может быть пустым.")
        }

        setPasswordErrors(errs)
        setPassword(passwordForValidation)
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(errs.length));
        console.log("handlePassword: perr = ", errs, " +++ ", "eerr = ", emailErrors, " +++ ", "btnDis = ", Boolean(emailErrors) || Boolean(errs))
    }


    // useEffect( () => {
    //     setButtonDisabled(Boolean(emailErrors) || Boolean(passwordErrors))
    //     console.log(Boolean(emailErrors) || Boolean(passwordErrors))
    // }, [])

    // для стора
    const dispatch = useDispatch();

    function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.get(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(resp => {
                if (resp.data.length) {
                    const userId = resp.data[0].id;
                    dispatch(loginAction({userId: userId}));
                    console.log(resp, "Юзер найден!");
                    dispatch(push(`/`))
                } else {
                    console.log(resp, "Такого юзера нет!");
                }
            })
            .catch(error =>
                console.log('error:', error)
            );
    }


    return (
        <div className="auth">
            <div className="authorization">
                <h2 className="authorization__title">
                    Авторизация
                </h2>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <p className="authorization__input-title">E-mail:</p>
                    <input className="authorization__form-input" id="email"
                           type="email"
                           name="email"
                           placeholder="Введите адрес эл.почты"
                           required
                           onChange={handleEmail}
                    />
                    <span className="authorization__form-error" id="email-error">{emailErrors.join(" ")}</span>

                    <p className="authorization__input-title">Пароль:</p>
                    <input className="authorization__form-input" id="password"
                           type="text"
                           name="password"
                           placeholder="Введите пароль"
                           required
                           onChange={handlePassword}
                    />
                    <span className="authorization__form-error" id="password-error">{passwordErrors.join(" ")}</span>

                    <button className="authorization__button-save"
                            type="submit"
                            disabled={buttonDisabled}
                    >Войти</button>
                </form>

                <button className="registration">Зарегистрироваться</button>
            </div>

            <button className="forgot-password">Забыли пароль?</button>
        </div>
    );
}

export default Auth;