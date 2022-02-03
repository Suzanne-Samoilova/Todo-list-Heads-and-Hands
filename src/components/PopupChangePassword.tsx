import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    errorBlankPassword,
    errorIncorrectOldPassword,
    errorMismatchPasswords, errorPasswordMustContain
} from "../constants/errorsText";
import {changeProfilePassword} from "../asyncActions/profile";
import {selectorProfileState} from "../store/profile/selector";
import {regexpPassword} from "../constants/regExp";


const PopupChangePassword = (props: any) => {
    const dispatch = useDispatch();
    const userProfile = useSelector(selectorProfileState);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");

    const [errorOldPassword, setErrorOldPassword] = useState<string>(" ");
    const [errorNewPassword, setErrorNewPassword] = useState<string>(" ");
    const [errorRepeatPassword, setErrorRepeatPassword] = useState<string>(" ");

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    const validatePassword = (rawPassword: any) => {
        return String(rawPassword)
            .toLowerCase()
            .match(regexpPassword);
    };


    const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const oldPasswordForValidation = e.target.value;
        let error = "";

        if (oldPasswordForValidation.length === 0) {
            error = errorBlankPassword
        }

        if ((userProfile.password !== oldPasswordForValidation) && (oldPasswordForValidation.length !== 0)) {
            error = errorIncorrectOldPassword
        }

        setErrorOldPassword(error);
        setOldPassword(oldPasswordForValidation);
        setButtonDisabled(Boolean(error.length) || Boolean(errorNewPassword.length) || Boolean(errorRepeatPassword.length));
    }


    const handleChangeNewPassword = (e: any) => {
        const newPasswordForValidation = e.target.value;
        let error = "";

        if (!validatePassword(newPasswordForValidation) && newPasswordForValidation.length !== 0) {
            error = errorPasswordMustContain
        }

        if (newPasswordForValidation.length === 0) {
            error = errorBlankPassword
        }

        if ((repeatNewPassword !== newPasswordForValidation) && (newPasswordForValidation.length !== 0) && (repeatNewPassword.length !== 0) && validatePassword(newPasswordForValidation)) {
            error = errorMismatchPasswords
        }

        if ((repeatNewPassword === newPasswordForValidation) && (repeatNewPassword.length !== 0)) {
            setErrorRepeatPassword("");
        }

        setErrorNewPassword(error);
        setNewPassword(newPasswordForValidation);
        setButtonDisabled(Boolean(errorOldPassword.length) || Boolean(error.length) || Boolean(errorRepeatPassword.length));
    }


    const handleChangeRepeatNewPassword = (e: any) => {
        const repeatNewPasswordForValidation = e.target.value;
        let error = "";

        if (!validatePassword(repeatNewPasswordForValidation) && repeatNewPasswordForValidation.length !== 0) {
            error = errorPasswordMustContain
        }

        if (repeatNewPasswordForValidation.length === 0) {
            error = errorBlankPassword
        }

        if ((newPassword !== repeatNewPasswordForValidation) && (repeatNewPasswordForValidation.length !== 0) && (newPassword.length !== 0) && validatePassword(repeatNewPasswordForValidation)) {
            error = errorMismatchPasswords
        }


        if ((newPassword === repeatNewPasswordForValidation) && (newPassword.length !== 0)) {
            setErrorNewPassword("");
        }

        setErrorRepeatPassword(error);
        setRepeatNewPassword(repeatNewPasswordForValidation);
        setButtonDisabled(Boolean(errorOldPassword.length) || Boolean(errorNewPassword.length) || Boolean(error.length));
    }


    const handleSubmitChangePassword = (e: any) => {
        e.preventDefault();
        dispatch(changeProfilePassword(repeatNewPassword));
        props.onClose();
    }


    return (
        <div className={`popup popup_type_change_password ${props.isOpen ? 'popup_opened' : null}`}>
            <div className="popup__container">
                <button className="popup__button-close"
                        type="button"
                        aria-label="Закрыть попап"
                        onClick={props.onClose}/>

                <h2 className="popup__title">Изменить пароль</h2>

                <form className="popup__form"
                      onSubmit={handleSubmitChangePassword}>

                    <p className="popup__task-name">Старый пароль:</p>
                    <input className="popup__input-text"
                           type="text"
                           name="oldPassword"
                           placeholder="Введите старый пароль"
                           value={oldPassword}
                           onChange={handleChangeOldPassword}
                           required />
                    <span className="authorization__form-error">{errorOldPassword}</span>

                    <p className="popup__task-name">Новый пароль:</p>
                    <input className="popup__input-text"
                           type="text"
                           name="newPassword"
                           placeholder="Введите новый пароль"
                           onChange={handleChangeNewPassword}
                           required />
                    <span className="authorization__form-error">{errorNewPassword}</span>

                    <p className="popup__task-name">Повторите новый пароль:</p>
                    <input className="popup__input-text"
                           type="text"
                           name="repeatNewPassword"
                           placeholder="Повторите новый пароль"
                           onChange={handleChangeRepeatNewPassword}
                           required />
                    <span className="authorization__form-error">{errorRepeatPassword}</span>

                    <button className="popup__button-save"
                            type="submit"
                            disabled={buttonDisabled}>Изменить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupChangePassword;
