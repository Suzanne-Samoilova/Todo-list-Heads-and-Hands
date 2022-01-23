import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectorProfileState} from "../store/selectorsState";
import {changeProfilePassword} from "../asyncActions/thunkFunctions";


function PopupChangePassword(props: any) {
    const dispatch = useDispatch();
    const userProfile = useSelector(selectorProfileState);

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [repeatNewPassword, setRepeatNewPassword] = React.useState('');

    const [errorOldPassword, setErrorOldPassword] = React.useState<string[]>(['']);
    const [errorNewPassword, setErrorNewPassword] = React.useState<string[]>(['']);
    const [errorRepeatPassword, setErrorRepeatPassword] = React.useState<string[]>(['']);

    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);


    function handleChangeOldPassword(e: React.ChangeEvent<HTMLInputElement>) {
        let oldPasswordForValidation = e.target.value;
        let errs = [];

        if (oldPasswordForValidation.length === 0) {
            errs.push("Пароль не может быть пустым.")
        }

        if ((userProfile.password !== oldPasswordForValidation) && (oldPasswordForValidation.length !== 0)) {
            errs.push("Неверный старый пароль.")
        }

        setErrorOldPassword(errs);
        setOldPassword(oldPasswordForValidation);
        setButtonDisabled(Boolean(errs.length) || Boolean(errorNewPassword.length) || Boolean(errorRepeatPassword.length));
    }


    function handleChangeNewPassword(e: any) {
        let newPasswordForValidation = e.target.value;
        let errs = [];

        if (newPasswordForValidation.length === 0) {
            errs.push("Пароль не может быть пустым.")
        }

        if ((repeatNewPassword !== newPasswordForValidation) && (newPasswordForValidation.length !== 0)) {
            errs.push("Новый пароль и повтор пароля не совпадают.")
        }

        if ((repeatNewPassword === newPasswordForValidation) && (repeatNewPassword.length !== 0)) {
            setErrorRepeatPassword([]);
        }

        setErrorNewPassword(errs);
        setNewPassword(newPasswordForValidation);
        setButtonDisabled(Boolean(errorOldPassword.length) || Boolean(errs.length) || Boolean(errorRepeatPassword.length));
    }


    function handleChangeRepeatNewPassword(e: any) {
        let repeatNewPasswordForValidation = e.target.value;
        let errs = [];

        if (repeatNewPasswordForValidation.length === 0) {
            errs.push("Пароль не может быть пустым.")
        }

        if ((newPassword !== repeatNewPasswordForValidation) && (repeatNewPasswordForValidation.length !== 0)) {
            errs.push("Новый пароль и повтор пароля не совпадают.")
        }

        if ((newPassword === repeatNewPasswordForValidation) && (newPassword.length !== 0)) {
            setErrorNewPassword([]);
        }

        setErrorRepeatPassword(errs);
        setRepeatNewPassword(repeatNewPasswordForValidation);
        setButtonDisabled(Boolean(errorOldPassword.length) || Boolean(errorNewPassword.length) || Boolean(errs.length));
    }


    // сменить пароль
    function handleSubmitChangePassword(e: any) {
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
                    <span className="authorization__form-error" id="old-password-error">{errorOldPassword.join(" ")}</span>

                    <p className="popup__task-name">Новый пароль:</p>
                    <input className="popup__input-text"
                           type="text"
                           name="newPassword"
                           placeholder="Введите новый пароль"
                           onChange={handleChangeNewPassword}/>
                    <span className="authorization__form-error"
                          id="repeat-password-error">{errorNewPassword.join(" ")}</span>

                    <p className="popup__task-name">Повторите новый пароль:</p>
                    <input className="popup__input-text"
                           type="text"
                           name="repeatNewPassword"
                           placeholder="Повторите новый пароль"
                           onChange={handleChangeRepeatNewPassword}/>
                    <span className="authorization__form-error"
                          id="repeat-password-error">{errorRepeatPassword.join(" ")}</span>

                    <button className="popup__button-save"
                            type="submit"
                            disabled={buttonDisabled}>Изменить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupChangePassword;
