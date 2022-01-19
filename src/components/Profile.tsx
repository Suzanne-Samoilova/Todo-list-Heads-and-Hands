import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectorProfileState } from "../store/selectorsState";
import { getProfile } from "../asyncActions/thunkFunctions";
import avatar from "../images/no-avatar.png";
import Header from "./Header";
import PopupChangeProfile from "./PopupChangeProfile";
import PopupChangePassword from "./PopupChangePassword";


function Profile() {
    const dispatch = useDispatch();
    const userProfile = useSelector(selectorProfileState);

    // загрузить данные профиля и отрисовать
    useEffect(()=> {
        dispatch(getProfile());
    },[dispatch])

    const [isOpenPopupChangeProfile, setIsOpenPopupChangeProfile] = React.useState(false);
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
            <Header/>

            <h1 className="todo__title">Профиль</h1>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>

                <div style={{display: "flex", flexDirection: "column", backgroundColor: "#c8c9cb", borderRadius: "4px",
                    padding: "30px", maxWidth: "200px"}}>
                    <img style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}}
                         src={avatar}
                         alt="Изображение профиля"/>
                </div>

                <div style={{display: "flex", flexDirection: "column", backgroundColor: "#f5f7f9", borderRadius: "4px",
                    padding: "30px", marginLeft: "20px"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Имя:</p>
                        <p style={{marginLeft: "20px"}}>{userProfile.name}</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Дата рождения:</p>
                        <p style={{marginLeft: "20px"}}>{userProfile.date_of_birth}</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Город:</p>
                        <p style={{marginLeft: "20px"}}>{userProfile.city}</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Эл.почта:</p>
                        <p style={{marginLeft: "20px"}}>{userProfile.email}</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Пароль:</p>
                        <p style={{marginLeft: "20px"}}>
                            <button className="tasks__button-change"
                            onClick={handleOpenPopupChangePassword}>Сменить пароль</button>
                        </p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "10px"}}>
                        <button className="todo__button-add"
                                onClick={handleOpenPopupChangeProfile}>Изменить данные</button>
                    </div>
                </div>
            </div>

            {isOpenPopupChangeProfile && <PopupChangeProfile
                isOpen={isOpenPopupChangeProfile}
                onClose={handleClosePopupChangeProfile}
                name={userProfile.name}
                dateOfBirth={userProfile.date_of_birth}
                city={userProfile.city}
                email={userProfile.email}/>}

            {isOpenPopupChangePassword && <PopupChangePassword
                isOpen={isOpenPopupChangePassword}
                onClose={handleClosePopupChangePassword}/>}

        </section>
    )
}

export default Profile;
