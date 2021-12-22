import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useHistory, useRouteMatch} from "react-router-dom";


function Form() {
    // для авторизации
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    // для стора
    const dispatch = useDispatch();
    const history = useHistory();

    // для роутера
    const { path, url } = useRouteMatch();

    function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        axios.get(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(resp => {
                if (resp.data.length) {
                    const userId = resp.data[0].id;
                    // console.log(resp, "Юзер найден!");
                    dispatch({
                        type: "LOGIN",
                        payload: {
                            userId: userId
                            // todo: resp.data
                        }});
                    history.push(`${url}todo`);
                } else {
                    console.log(resp, "Такого юзера нет!");
                }
            })
            .catch(error =>
                console.log('error:', error)
            );
    }


    return (
        <div className="authorization">
            <h2 className="authorization__title">
                Введите логин и пароль
            </h2>
            <form className="authorization__form" onSubmit={handleSubmit}>
                <input className="authorization__form-input" id="email"
                       type="email"
                       name="email"
                       placeholder="Эл.почта"
                       required
                       onChange={handleEmail}
                       value={email}
                />
                <span className="authorization__form-error" id="email-error">Введите адрес эл.почты.</span>

                <input className="authorization__form-input" id="password"
                       type="text"
                       name="password"
                       placeholder="Пароль"
                       required
                       onChange={handlePassword}
                       value={password}
                />
                <span className="authorization__form-error" id="password-error">Введите пароль.</span>

                <button className="authorization__button-save" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Form;
