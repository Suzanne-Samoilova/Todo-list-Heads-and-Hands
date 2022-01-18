import React from "react";
import PopupWithForm from "./PopupWithForm";


function PopupChangePassword(props: any) {
    function handleSubmitChangePassword() {
        // сменить пароль
        props.onClose();
    }


    return (
        <PopupWithForm name="change_password"
                       title="Сменить пароль"
                       buttonText="Изменить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitChangePassword}>

            <p className="popup__task-name">Введите новый пароль:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-new-password"
                   placeholder="Введите пароль"
                   required/>

            <p className="popup__task-name">Повторите новый пароль:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-new-password-repeat"
                   placeholder="Повторите пароль"
                   required/>

        </PopupWithForm>
    )
}

export default PopupChangePassword;
