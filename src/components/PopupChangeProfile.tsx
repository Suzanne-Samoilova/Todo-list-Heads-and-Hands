import PopupWithForm from "./PopupWithForm";
import React from "react";
import {dateFormat} from "../utils/dateHelper";
import locale from "antd/es/date-picker/locale/ru_RU";
import {DatePicker} from "antd";

function PopupChangeProfile(props: any) {
    function handleSubmitChangeProfile() {

        // сменить пароль
        props.onClose();
    }

    return (
        <PopupWithForm name="change_profile"
                       title="Изменить профиль"
                       buttonText="Изменить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitChangeProfile}
        >

            <p className="popup__task-name">Имя:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-name"
                   placeholder="Введите Ваше имя"
                   required/>

            <p className="popup__task-name">Email:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-email"
                   placeholder="Введите email"
                   required/>

            <p className="popup__task-name">Город:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-city"
                   placeholder="Введите название города"
                   required/>

            <p className="popup__task-name" style={{marginBottom: "10px"}}>Дата рождения:</p>
            <DatePicker
                // onChange={handleDateDeadlineChange}
                        format={dateFormat}
                        locale={locale}/>

        </PopupWithForm>
    )
}

export default PopupChangeProfile;
