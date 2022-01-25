import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import { changeProfileData } from "../asyncActions/thunkFunctions";
import moment from "moment";
import {dateFormat} from "../utils/dateHelper";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import PopupWithForm from "./PopupWithForm";
import {selectorAuthState, selectorProfileState} from "../store/selectorsState";


const PopupChangeProfile = (props: any) => {
    const dispatch = useDispatch();
    const userName = useSelector(selectorAuthState);
    const userProfile = useSelector(selectorProfileState);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('01.01.2000');

    const fillForm = () => {
        setName(userProfile.name);
        setEmail(userProfile.email);
        setCity(userProfile.city);
        setDateOfBirth(userProfile.date_of_birth);
    }


    React.useEffect(() => {
        if (userProfile?.email) {
            fillForm();
        }
    }, [userProfile])


    function handleChangeName(e: any) {
        setName(e.target.value);
    }

    function handleChangeEmail(e: any) {
        setEmail(e.target.value);
    }

    function handleChangeCity(e: any) {
        setCity(e.target.value);
    }

    function handleChangeDateOfBirth(date: any, dateString: string) {
        setDateOfBirth(dateString);
    }


    function handleSubmitChangeProfile(e: any) {
        e.preventDefault();
        dispatch(changeProfileData(name, dateOfBirth, city, email));
        props.onClose();
    }


    return (
        <PopupWithForm name="change_profile"
                       title={userName.userName ? 'Изменить профиль' : 'Заполните все поля'}
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
                   type="email"
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

            <p className="popup__task-name popup__task-datepicker">Дата рождения:</p>
            <DatePicker format={dateFormat}
                        locale={locale}
                        value={moment(dateOfBirth, dateFormat)}
                        onChange={handleChangeDateOfBirth}/>

        </PopupWithForm>
    )
}

export default PopupChangeProfile;
