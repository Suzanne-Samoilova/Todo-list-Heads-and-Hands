import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginAction} from "../store/reducerAuth";
import { push } from "connected-react-router";

function Auth() {
    // для авторизации
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

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
                           value={email}
                    />
                    <span className="authorization__form-error" id="email-error">Введите адрес эл.почты.</span>

                    <p className="authorization__input-title">Пароль:</p>
                    <input className="authorization__form-input" id="password"
                           type="text"
                           name="password"
                           placeholder="Введите пароль"
                           required
                           onChange={handlePassword}
                           value={password}
                    />
                    <span className="authorization__form-error" id="password-error">Введите пароль.</span>

                    <button className="authorization__button-save"
                            type="submit"
                            // disabled
                    >Войти</button>
                </form>

                <button className="registration">Зарегистрироваться</button>
            </div>

            <button className="forgot-password">Забыли пароль?</button>
        </div>
    );
}

export default Auth;