import React from "react";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {DatePicker} from "antd";
import {dateFormat} from "../utils/dateHelper";
import moment from "moment";
import locale from "antd/es/date-picker/locale/ru_RU";
import {getUser} from "../asyncActions/thunkFunctions";


function ForgotPassword() {
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [dateOfBirth, setDateOfBirth] = React.useState<string>('01.01.2000');

    const [forgotPasswordErrors, setForgotPasswordErrors] = React.useState<string[]>([" "]);
    const [emailErrors, setEmailErrors] = React.useState<string[]>([" "]);
    const [dateOfBirthErrors, setDateOfBirthErrors] = React.useState<string[]>([" "]);
    const [passwordErrors, setPasswordErrors] = React.useState<string[]>([" "]);

    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);

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
        setForgotPasswordErrors([]);
        let emailForValidation = e.target.value;
        let errs = [];

        if (!emailForValidation) {
            setForgotPasswordErrors([])
        }

        if (emailForValidation.length === 0) {
            errs.push("Email не может быть пустым.")
        }

        if ((!validateEmail(emailForValidation)) && (emailForValidation.length !== 0)) {
            errs.push("Email введен неверно.")
        }

        setEmailErrors(errs);
        setEmail(emailForValidation);
        setButtonDisabled(Boolean(passwordErrors.length) || Boolean(errs.length));
    }


    function handleChangeDateOfBirth(date: any, dateString: string) {
        setDateOfBirthErrors([]);
        setDateOfBirth(dateString);
    }


    function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        let passwordForValidation = e.target.value;
        let errs = [];

        if (passwordForValidation.length === 0) {
            errs.push("Пароль не может быть пустым.")
        }

        if ((!validatePassword(passwordForValidation)) && (passwordForValidation.length !== 0)) {
            errs.push("Пароль должен содержать цифры, буквы (в том числе и заглавную) и хотя бы один из символов !@$%^&*()_+")
        }

        setPasswordErrors(errs);
        setPassword(passwordForValidation);
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(errs.length));
    }


    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(getUser(email, password, dateOfBirth, setForgotPasswordErrors, setDateOfBirthErrors));
    }

    function handleGoAuth() {
        dispatch(push(`auth`));
    }

    function handleGoRegistration() {
        dispatch(push(`registration`));
    }


    return (
        <section className="todo">
            <div className="auth">
                <div className="authorization">
                    <h2 className="authorization__title">Восстановление пароля</h2>

                    <form className="authorization__form" style={{alignItems: "stretch"}}
                          onSubmit={handleSubmit}>
                        <span className="authorization__form-error">{forgotPasswordErrors}</span>

                        <p className="authorization__input-title">E-mail:</p>
                        <input className="authorization__form-input"
                               type="email"
                               name="email"
                               placeholder="Введите адрес эл.почты"
                               required
                               value={email}
                               onChange={handleChangeEmail}/>
                        <span className="authorization__form-error">{emailErrors}</span>

                        <p className="authorization__input-title">Дата рождения:</p>
                        <DatePicker format={dateFormat}
                                    locale={locale}
                                    value={moment(dateOfBirth, dateFormat)}
                                    onChange={handleChangeDateOfBirth}/>
                        <span className="authorization__form-error" style={{marginTop: "5px"}}>{dateOfBirthErrors}</span>

                        <p className="authorization__input-title">Новый пароль:</p>
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
                                disabled={buttonDisabled}>Восстановить</button>
                    </form>

                    <p className="title">Вспомнили пароль?
                        <button className="title__button"
                                onClick={handleGoAuth}>Авторизоваться</button>
                    </p>
                </div>

                <button className="forgot-password"
                        onClick={handleGoRegistration}>Зарегистрироваться</button>
            </div>
        </section>
    );
}

export default ForgotPassword;
