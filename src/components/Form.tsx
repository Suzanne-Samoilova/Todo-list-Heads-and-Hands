import React from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

function Form() {

    const dispatch = useDispatch()
    const auth = useSelector((state: any) => state.isAuthorized)
    const todo = useSelector((state: any) => state.todo)


    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };


    function handleSubmit(e:React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.get(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(resp => {
                if (resp.data.length) {
                    const userId = resp.data[0].id
                    console.log(resp, "Юзер найден!")
                    axios.get(`http://localhost:3001/todo?user_id=${userId}`).then(
                        resp => {
                            dispatch({type: "login", payload: {userId: userId, todo: resp.data}})
                        }
                    ).catch(error =>
                        console.log('error:', error))

                    // document.location.href = 'http://stackoverflow.com'
                } else {
                    console.log(resp, "Такого юзера нет!")
                }
            })
            .catch(error =>
                console.log('error:', error));
    }


    return (
        <>
            {!auth &&
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
            }
            {auth &&
                <div>Успешный логин {email}!
                    <button className="authorization__button-save" onClick={() => dispatch({type: "logout", payload: {userId: undefined, todo: []}})}>Выйти</button>
                    {JSON.stringify(todo)}
                </div>
            }
        </>
    );
}

export default Form;
