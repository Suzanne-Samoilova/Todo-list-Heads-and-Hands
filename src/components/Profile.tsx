import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import Header from "./Header";
import PopupChangeProfile from "./PopupChangeProfile";
import PopupChangePassword from "./PopupChangePassword";
import avatar from "../images/no-avatar.png";


function Profile() {
    const dispatch = useDispatch();

    // загрузить данные профиля и отрисовать
    useEffect(()=> {
        // dispatch(запрос данных());
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

                <div style={{display: "flex", flexDirection: "column", backgroundColor: "#f5f7f9", borderRadius: "4px",
                    padding: "30px", maxWidth: "200px"}}>
                    <img style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}}
                         src={avatar}
                         alt="Изображение профиля"/>
                </div>

                <div style={{display: "flex", flexDirection: "column", backgroundColor: "#f5f7f9", borderRadius: "4px",
                    padding: "30px", marginLeft: "20px"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Имя:</p>
                        <p style={{marginLeft: "20px"}}>name</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Дата рождения:</p>
                        <p style={{marginLeft: "20px"}}>date_of_birth</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>Город:</p>
                        <p style={{marginLeft: "20px"}}>city</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p style={{minWidth: "100px"}}>email:</p>
                        <p style={{marginLeft: "20px"}}>email</p>
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
                onClose={handleClosePopupChangeProfile}/>}

            {isOpenPopupChangePassword && <PopupChangePassword
                isOpen={isOpenPopupChangePassword}
                onClose={handleClosePopupChangePassword}/>}

        </section>
    )
}

export default Profile;
