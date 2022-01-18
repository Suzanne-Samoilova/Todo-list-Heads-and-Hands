import React from "react";
import { useDispatch } from "react-redux";

import { changeProfile } from "../asyncActions/thunkFunctions";
import moment from "moment";
import { dateFormat } from "../utils/dateHelper";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import PopupWithForm from "./PopupWithForm";


function PopupChangeProfile(props: any) {
    const dispatch = useDispatch();

    const [name, setName] = React.useState(props.name);
    const [dateOfBirth, setDateOfBirth] = React.useState(props.dateOfBirth);
    const [city, setCity] = React.useState(props.city);
    const [email, setEmail] = React.useState(props.email);

    function handleChangeName(e: any) {
        setName(e.target.value);
    }

    function handleChangeDateOfBirth(e: any) {
        setDateOfBirth(e.target.value);
    }

    function handleChangeCity(e: any) {
        setCity(e.target.value);
    }

    function handleChangeEmail(e: any) {
        setEmail(e.target.value);
    }


    function handleSubmitChangeProfile(e: any) {
        e.preventDefault();
        dispatch(changeProfile(name, dateOfBirth, city, email));
        props.onClose();
    }

    return (
        <PopupWithForm name="change_profile"
                       title="Изменить профиль"
                       buttonText="Изменить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitChangeProfile}>

            <p className="popup__task-name">Имя:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-name"
                   placeholder="Введите Ваше имя"
                   required
                   value={name}
                   onChange={handleChangeName}/>

            <p className="popup__task-name">Email:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-email"
                   placeholder="Введите email"
                   required
                   value={email}
                   onChange={handleChangeEmail}/>

            <p className="popup__task-name">Город:</p>
            <input className="popup__input-text"
                   type="text"
                   name="profile-city"
                   placeholder="Введите название города"
                   required
                   value={city}
                   onChange={handleChangeCity}/>

            <p className="popup__task-name" style={{marginBottom: "10px"}}>Дата рождения:</p>
            <DatePicker format={dateFormat}
                        locale={locale}
                        value={moment(dateOfBirth, dateFormat)}
                        onChange={handleChangeDateOfBirth}/>

        </PopupWithForm>
    )
}

export default PopupChangeProfile;
