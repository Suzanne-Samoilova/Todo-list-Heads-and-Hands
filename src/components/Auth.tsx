import React from "react";
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
    // const [email, setEmail] = React.useState<string>('');
    // const [password, setPassword] = React.useState<string>('');

    const [buttonEnabled, setButtonEnabled] = React.useState<boolean>(false);

    const [emailErrors, setEmailErrors] = React.useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = React.useState<string[]>([]);

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {

        let emailIsValid = true;

        let emailForValidation = e.target.value;

        let emailErr = [];

        if (emailForValidation.length === 0) {
            emailErr.push("Пароль не может быть пустым.")
            emailIsValid = false;
        }


        if (!validateEmail(emailForValidation)) {
            console.log(validateEmail(emailForValidation), emailForValidation)
            emailErr.push("Формат неверный.")
            emailIsValid = false;
        }

        setEmailErrors(emailErr)
        console.log(!emailErrors && !passwordErrors)
        setButtonEnabled(!emailErrors && !passwordErrors)

        return emailIsValid
    };

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        let passwordIsValid = true;

        let passwordForValidation = e.target.value

        let passwordErr = []

        if (passwordForValidation.length === 0) {
            passwordErr.push("Пароль не может быть пустым.")
            passwordIsValid = false;
        }

        setPasswordErrors(passwordErr)

        console.log(!emailErrors && !passwordErrors, emailErrors, passwordErrors, passwordErr)
        setButtonEnabled(!emailErrors && !passwordErrors)

        return passwordIsValid
    };

    // для стора
    const dispatch = useDispatch();

    function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.get(`http://localhost:3001/users?email=${null}&password=${null}`)
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
                    {/*</label> ???*/}
                    {/*<label htmlFor=”email”>Email address</label>*/}
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
                           // type="password"
                           name="password"
                           placeholder="Введите пароль"
                           required
                           onChange={handlePassword}
                    />
                    <span className="authorization__form-error" id="password-error">{passwordErrors.join(" ")}</span>

                    <button className="authorization__button-save"
                            type="submit"
                            disabled={!buttonEnabled}
                    >Войти</button>
                </form>

                <button className="registration">Зарегистрироваться</button>
            </div>

            <button className="forgot-password">Забыли пароль?</button>
        </div>
    );
}

export default Auth;