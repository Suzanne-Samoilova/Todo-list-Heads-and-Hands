import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/reducerAuth";


function Header() {
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

    function handleGoExit() {
        dispatch(logoutAction({}));
        dispatch(push(`auth`));
    }


    return (
        <div className="header">
            <div>
                <button className="todo__button-add"
                        onClick={handleGoTodo}>Список задач</button>
                <button className="todo__button-add"
                        onClick={handleGoArchive}>Архив</button>
            </div>

            <div>
                <button className="todo__button-add"
                        onClick={handleGoProfile}>Профиль</button>
                <button className="todo__button-add"
                        onClick={handleGoExit}>Выйти</button>
            </div>
        </div>
    )
}

export default Header;
