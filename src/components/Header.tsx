import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/reducerAuth";
import { clearProfileAction } from "../store/reducerProfile";


const Header = () => {
    const dispatch = useDispatch();

    function handleGoTodo() {
        dispatch(push(`/`))
    }

    function handleGoArchive() {
        dispatch(push(`archive`))
    }

    function handleGoProfile() {
        dispatch(push(`profile`))
    }

    function logout() {
        dispatch(clearProfileAction());
        dispatch(logoutAction({}));
        dispatch(push(`auth`));
    }


    return (
        <div className="header">
            <div className="header__box">
                <button className="todo__button-add"
                        onClick={handleGoTodo}>Список задач</button>
                <button className="todo__button-add"
                        onClick={handleGoArchive}>Архив</button>
            </div>

            <div className="header__box">
                <button className="todo__button-add"
                        onClick={handleGoProfile}>Профиль</button>
                <button className="todo__button-add"
                        onClick={logout}>Выйти</button>
            </div>
        </div>
    )
}

export default Header;
