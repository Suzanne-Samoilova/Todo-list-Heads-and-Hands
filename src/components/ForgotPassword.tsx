import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";
import {DatePicker} from "antd";
import {dateFormat} from "../utils/dateHelper";
import moment from "moment";
import locale from "antd/es/date-picker/locale/ru_RU";
import {getUserPasswordRecovery} from "../asyncActions/thunkFunctions";
import {
    errorBlankEmail,
    errorBlankPassword,
    errorIncorrectEmail,
    errorPasswordMustContain
} from "../constants/errorsText";
import {regexpEmail, regexpPassword} from "../constants/regExp";


function ForgotPassword() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dateOfBirth, setDateOfBirth] = useState<string>('01.01.2000');

    const [forgotPasswordErrors, setForgotPasswordErrors] = useState<string[]>([" "]);
    const [emailErrors, setEmailErrors] = useState<string[]>([" "]);
    const [dateOfBirthErrors, setDateOfBirthErrors] = useState<string[]>([" "]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([" "]);

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

    const handleChangeEmail = function (e: React.ChangeEvent<HTMLInputElement>) {
        setForgotPasswordErrors([]);
        const emailForValidation = e.target.value;
        const errs = [];

        if (!emailForValidation) {
            setForgotPasswordErrors([])
        }

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


    function handleChangeDateOfBirth(date: any, dateString: string) {
        setDateOfBirthErrors([]);
        setDateOfBirth(dateString);
    }


    function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const passwordForValidation = e.target.value;
        const errs = [];

        if (passwordForValidation.length === 0) {
            errs.push(errorBlankPassword)
        }

        if (!validatePassword(passwordForValidation) && (passwordForValidation.length !== 0)) {
            errs.push(errorPasswordMustContain)
        }

        setPasswordErrors(errs);
        setPassword(passwordForValidation);
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(errs.length));
    }


    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(getUserPasswordRecovery(email, password, dateOfBirth, setForgotPasswordErrors, setDateOfBirthErrors));
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

                    <form className="authorization__form"
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
                        <span className="authorization__form-error authorization__form-error-birth">{dateOfBirthErrors}</span>

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
