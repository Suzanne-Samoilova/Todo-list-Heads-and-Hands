import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router";
import {DatePicker} from "antd";
import {dateFormat} from "../utils/dateHelper";
import moment from "moment";
import locale from "antd/es/date-picker/locale/ru_RU";
import {getUserPasswordRecovery} from "../asyncActions/forgotPassword";
import {
    errorBlankEmail,
    errorBlankPassword,
    errorIncorrectEmail,
    errorPasswordMustContain
} from "../constants/errorsText";
import {regexpEmail, regexpPassword} from "../constants/regExp";
import {selectorProfileState} from "../store/profile/selector";
import {clearErrorBirthdayAction, clearErrorEmailAction} from "../store/profile/action";


const ForgotPassword = () => {
    const dispatch = useDispatch();
    let errorsEmailState = useSelector(selectorProfileState).errorEmail;
    let errorBirthdayState = useSelector(selectorProfileState).errorBirthday;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("01.01.2000");

    const [emailErrors, setEmailErrors] = useState<string>(" ");
    const [passwordErrors, setPasswordErrors] = useState<string>(" ");

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
        let error = "";

        if (errorBirthdayState) {
            dispatch(clearErrorBirthdayAction())
        }

        if (errorsEmailState) {
            dispatch(clearErrorEmailAction())
        }

        if (emailForValidation.length === 0) {
            error = errorBlankEmail
        }

        if (!validateEmail(emailForValidation) && (emailForValidation.length !== 0)) {
            error = errorIncorrectEmail
        }

        setEmailErrors(error);
        setEmail(emailForValidation);
        setButtonDisabled(Boolean(passwordErrors.length) || Boolean(error.length));
    }


    const handleChangeDateOfBirth = (date: any, dateString: string) => {
        if (errorBirthdayState) {
            dispatch(clearErrorBirthdayAction())
        }

        setDateOfBirth(dateString);
        setButtonDisabled(Boolean(passwordErrors.length) || Boolean(emailErrors.length));
    }


    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordForValidation = e.target.value;
        let error = "";

        if (passwordForValidation.length === 0) {
            error = errorBlankPassword
        }

        if (!validatePassword(passwordForValidation) && (passwordForValidation.length !== 0)) {
            error = errorPasswordMustContain
        }

        setPasswordErrors(error);
        setPassword(passwordForValidation);
        setButtonDisabled(Boolean(emailErrors.length) || Boolean(error.length));
    }


    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(getUserPasswordRecovery(email, password, dateOfBirth));
        setButtonDisabled(true);
    }

    const handleGoAuth = () => {
        dispatch(push(`auth`));
    }

    const handleGoRegistration = () => {
        dispatch(push(`registration`));
    }


    return (
        <section className="todo">
            <div className="auth">
                <div className="authorization">
                    <h2 className="authorization__title">Восстановление пароля</h2>

                    <form className="authorization__form"
                          onSubmit={handleSubmit}>
                        <span className="authorization__form-error">{errorsEmailState}</span>

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
                        <span className="authorization__form-error authorization__form-error-birth">{errorBirthdayState}</span>

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
