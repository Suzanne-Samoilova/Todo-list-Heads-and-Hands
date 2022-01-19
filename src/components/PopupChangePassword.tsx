import React from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../index";
import PopupWithForm from "./PopupWithForm";


function PopupChangePassword(props: any) {
    const userProfile = useSelector((state: TRootState) => state.profile);

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [repeatNewPassword, setRepeatNewPassword] = React.useState('');

    const [errorOldPassword, setErrorOldPassword] = React.useState<string[]>(['']);
    const [errorRepeatPassword, setErrorRepeatPassword] = React.useState<string[]>(['']);


    function handleChangeOldPassword(e: any) {
        setOldPassword(e.target.value);
    }

    function handleChangeNewPassword(e: any) {
        setNewPassword(e.target.value);
    }

    function handleChangeRepeatNewPassword(e: any) {
        setRepeatNewPassword(e.target.value);
    }


    // сменить пароль
    function handleSubmitChangePassword(e: any) {
        e.preventDefault();
        let errs = [];

        if (userProfile.password === setOldPassword) {
            setErrorOldPassword([]);
            if (newPassword === repeatNewPassword) {

                // сменить пароль на сервере

                props.onClose();
            } else {
                // выдать ошибку что новый пароль и повторение нового пароля не совпадают
                errs.push("Новый пароль и повтор пароля не совпадают.")
                setErrorRepeatPassword(errs);
            }


        } else {
            // выдать ошибку что старый пароль введен неверно
            errs.push("Неверный старый пароль.")
        }

        setErrorOldPassword(errs);
    }


    return (
        <PopupWithForm name="change_password"
                       title="Сменить пароль"
                       buttonText="Изменить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitChangePassword}>

            <p className="popup__task-name">Старый пароль:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-old-password"
                   placeholder="Введите старый пароль"
                   required
                   value={oldPassword}
                   onChange={handleChangeOldPassword}/>
            <span className="authorization__form-error" id="old-password-error">{errorOldPassword}</span>

            <p className="popup__task-name">Новый пароль:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-new-password"
                   placeholder="Введите новый пароль"
                   required
                   value={newPassword}
                   onChange={handleChangeNewPassword}/>

            <p className="popup__task-name">Повторите новый пароль:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-new-password-repeat"
                   placeholder="Повторите новый пароль"
                   required
                   value={repeatNewPassword}
                   onChange={handleChangeRepeatNewPassword}/>
            <span className="authorization__form-error" id="repeat-password-error">{errorRepeatPassword}</span>

        </PopupWithForm>
    )
}

export default PopupChangePassword;
