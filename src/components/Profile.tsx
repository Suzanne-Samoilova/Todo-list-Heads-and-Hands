import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {selectorAuthState, selectorProfileState} from "../store/selectorsState";
import { getProfile } from "../asyncActions/thunkFunctions";
import avatar from "../images/no-avatar.png";
import Header from "./Header";
import PopupChangeProfile from "./PopupChangeProfile";
import PopupChangePassword from "./PopupChangePassword";


function Profile() {
    const dispatch = useDispatch();
    const userProfile = useSelector(selectorProfileState);
    const userName = useSelector(selectorAuthState);

    // загрузить данные профиля и отрисовать
    useEffect(()=> {
        dispatch(getProfile());
    },[])


    const [isOpenPopupChangeProfile, setIsOpenPopupChangeProfile] = React.useState(!userName.userName);
    const [isOpenPopupChangePassword, setIsOpenPopupChangePassword] = React.useState(false);


    function handleOpenPopupChangeProfile() {
        setIsOpenPopupChangeProfile(true);
    }

    function handleClosePopupChangeProfile() {
        setIsOpenPopupChangeProfile(false);
    }

    function handleOpenPopupChangePassword() {
        setIsOpenPopupChangePassword(true);
    }

    function handleClosePopupChangePassword() {
        setIsOpenPopupChangePassword(false);
    }


    return (
        <section className="todo">

            {userProfile.name &&
            <Header/>}

            <h1 className="todo__title">{userProfile.name ? 'Профиль' : 'Заполните все поля'}</h1>

            <div className="profile">

                <div className="profile__img-box">
                    <img className="profile__img"
                         src={avatar}
                         alt="Изображение профиля"/>
                </div>

                <div className="profile__info">
                    <div className="profile__box">
                        <p className="profile__title">Имя:</p>
                        <p className="profile__description">{userProfile.name}</p>
                    </div>

                    <div className="profile__box">
                        <p className="profile__title">Дата рождения:</p>
                        <p className="profile__title-text">{userProfile.date_of_birth}</p>
                    </div>

                    <div className="profile__box">
                        <p className="profile__title">Город:</p>
                        <p className="profile__title-text">{userProfile.city}</p>
                    </div>

                    <div className="profile__box">
                        <p className="profile__title">Эл.почта:</p>
                        <p className="profile__title-text">{userProfile.email}</p>
                    </div>

                    <div className="profile__box">
                        <p className="profile__title">Пароль:</p>
                        <p className="profile__title-text">
                            <button className="tasks__button-change"
                            onClick={handleOpenPopupChangePassword}>Сменить пароль</button>
                        </p>
                    </div>

                    <div className="profile__box profile__button">
                        <button className="todo__button-add"
                                onClick={handleOpenPopupChangeProfile}>Изменить данные</button>
                    </div>
                </div>
            </div>

            {isOpenPopupChangeProfile && <PopupChangeProfile
                isOpen={isOpenPopupChangeProfile}
                onClose={handleClosePopupChangeProfile}
            />}

            {isOpenPopupChangePassword && <PopupChangePassword
                isOpen={isOpenPopupChangePassword}
                onClose={handleClosePopupChangePassword}/>}

        </section>
    )
}

export default Profile;
