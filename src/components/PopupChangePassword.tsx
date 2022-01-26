import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectorProfileState} from "../store/selectorsState";
import {changeProfilePassword} from "../asyncActions/thunkFunctions";
import {
    errorBlankPassword,
    errorIncorrectOldPassword,
    errorMismatchPasswords
} from "../constants/errorsText";


const PopupChangePassword = (props: any) => {
    const dispatch = useDispatch();
    const userProfile = useSelector(selectorProfileState);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const [errorOldPassword, setErrorOldPassword] = useState<string[]>(['']);
    const [errorNewPassword, setErrorNewPassword] = useState<string[]>(['']);
    const [errorRepeatPassword, setErrorRepeatPassword] = useState<string[]>(['']);

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);


    const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const oldPasswordForValidation = e.target.value;
        const errs = [];

        if (oldPasswordForValidation.length === 0) {
            errs.push(errorBlankPassword)
        }

        if ((userProfile.password !== oldPasswordForValidation) && (oldPasswordForValidation.length !== 0)) {
            errs.push(errorIncorrectOldPassword)
        }

        setErrorOldPassword(errs);
        setOldPassword(oldPasswordForValidation);
        setButtonDisabled(Boolean(errs.length) || Boolean(errorNewPassword.length) || Boolean(errorRepeatPassword.length));
    }


    const handleChangeNewPassword = (e: any) => {
        const newPasswordForValidation = e.target.value;
        const errs = [];

        if (newPasswordForValidation.length === 0) {
            errs.push(errorBlankPassword)
        }

        if ((repeatNewPassword !== newPasswordForValidation) && (newPasswordForValidation.length !== 0)) {
            errs.push(errorMismatchPasswords)
        }

        if ((repeatNewPassword === newPasswordForValidation) && (repeatNewPassword.length !== 0)) {
            setErrorRepeatPassword([]);
        }

        setErrorNewPassword(errs);
        setNewPassword(newPasswordForValidation);
        setButtonDisabled(Boolean(errorOldPassword.length) || Boolean(errs.length) || Boolean(errorRepeatPassword.length));
    }


    const handleChangeRepeatNewPassword = (e: any) => {
        const repeatNewPasswordForValidation = e.target.value;
        const errs = [];

        if (repeatNewPasswordForValidation.length === 0) {
            errs.push(errorBlankPassword)
        }

        if ((newPassword !== repeatNewPasswordForValidation) && (repeatNewPasswordForValidation.length !== 0)) {
            errs.push(errorMismatchPasswords)
        }

        if ((newPassword === repeatNewPasswordForValidation) && (newPassword.length !== 0)) {
            setErrorNewPassword([]);
        }

        setErrorRepeatPassword(errs);
        setRepeatNewPassword(repeatNewPasswordForValidation);
        setButtonDisabled(Boolean(errorOldPassword.length) || Boolean(errorNewPassword.length) || Boolean(errs.length));
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
                           onChange={handleChangeOldPassword}/>
                    <span className="authorization__form-error" id="old-password-error">{errorOldPassword}</span>

                    <p className="popup__task-name">Новый пароль:</p>
                    <input className="popup__input-text"
                           type="text"
                           name="newPassword"
                           placeholder="Введите новый пароль"
                           onChange={handleChangeNewPassword}/>
                    <span className="authorization__form-error"
                          id="repeat-password-error">{errorNewPassword}</span>

                    <p className="popup__task-name">Повторите новый пароль:</p>
                    <input className="popup__input-text"
                           type="text"
                           name="repeatNewPassword"
                           placeholder="Повторите новый пароль"
                           onChange={handleChangeRepeatNewPassword}/>
                    <span className="authorization__form-error"
                          id="repeat-password-error">{errorRepeatPassword}</span>

                    <button className="popup__button-save"
                            type="submit"
                            disabled={buttonDisabled}>Изменить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupChangePassword;
