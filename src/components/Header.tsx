import React from "react";
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {logoutAction} from "../store/reducerAuth";

function Header(props: any) {
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
            <p style={{display: "flex", flexDirection: "row", margin: "10px 150px 5px", justifyContent: "flex-end", opacity: "80%"}}>Email</p>

            <div className="todo__menu">
                <div>
                    <button className="todo__button-add"
                            onClick={handleGoTodo}
                    >Список задач</button>
                    <button className="todo__button-add"
                            onClick={handleGoArchive}
                    >Архив</button>
                </div>
                <div>
                    <button className="todo__button-add"
                            onClick={handleGoProfile}
                    >Профиль</button>
                    <button className="todo__button-add"
                            onClick={handleGoExit}
                    >Выйти</button>
                </div>
            </div>
        </div>
    )
}

export default Header;
