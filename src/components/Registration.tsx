import React from "react";
import {useDispatch} from "react-redux";
import {addNewProfile, getEmail} from "../asyncActions/thunkFunctions";
import {push} from "connected-react-router";


function Registration() {
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [emailErrors, setEmailErrors] = React.useState<string[]>([" "]);
    const [passwordErrors, setPasswordErrors] = React.useState<string[]>([" "]);
    const [profileErrors, setProfileErrors] = React.useState<string[]>([" "]);

    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);

    // Регулярка для пароля
    const validateEmail = (rawEmail: any) => {
        return String(rawEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (rawPassword: any) => {
        return String(rawPassword)
            .toLowerCase()
            .match(
                /(?=.*[!@$%^&*()_+])(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z]*([0-9#$-/:-?{-~!"^_`\[\]]))(?=[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]*[a-zA-Z])[#$-/:-?{-~!"^_`\[\]a-zA-Z0-9]{6,}/
            );
    };


    const handleChangeEmail = function (e: React.ChangeEvent<HTMLInputElement>) {
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

    const handleChangePassword = function (e: React.ChangeEvent<HTMLInputElement>) {
        let passwordForValidation = e.target.value;
        let errs = [];

        if (passwordForValidation.length === 0) {
            errs.push("Пароль не может быть пустым.")
        }

        if (!validatePassword(passwordForValidation)) {
            errs.push("Пароль должен содержать цифры, буквы (в том числе и заглавную) и хотя бы один из символов !@$%^&*()_+")
        }

        setPasswordErrors(errs);
        setPassword(passwordForValidation);
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(errs.length));
    }


    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        let errs: any[] = [];

        dispatch(getEmail(email, password, errs, setProfileErrors));
        //
        // if (dispatch(getEmail(email))) {
        //     errs.push("Пользователь с таким email уже существует!");
        //     // очистить поля ввода !
        // } else {
        //     dispatch(addNewProfile(email, password));
        //     dispatch(push(`auth`));
        // }

        // setProfileErrors(errs);

        // делаю get-запрос на поиск введенного email
        // if (если ответ что такой email найден) {
        //     то пуш ошибку "Пользователь с таким email уже существует"
        //     очистить поля ввода
        //     } else {
        //     dispatch(отправить post-запрос на создание юзера с указанными данными(почта, пароль));
        //     переход на '/auth'
        // }

    }


    return (
        <section className="todo">
            <div className="auth authorization">
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
                    <span className="authorization__form-error" id="email-error">{emailErrors.join(" ")}</span>

                    <p className="authorization__input-title">Пароль:</p>
                    <input className="authorization__form-input" id="password"
                           type="text"
                           name="password"
                           placeholder="Введите пароль"
                           required
                           value={password}
                           onChange={handleChangePassword}/>
                    <span className="authorization__form-error" id="password-error">{passwordErrors.join(" ")}</span>

                    <button className="authorization__button-save"
                            type="submit"
                            disabled={buttonDisabled}>Зарегистрироваться</button>
                </form>
            </div>
        </section>
    );
}

export default Registration;
