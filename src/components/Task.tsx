import React from "react";
import {useSelector} from "react-redux";

function Task() {
    // // получить состояние чекбокса
    // const checkbox = useSelector((state: any) => state.checkbox);
    // console.log(checkbox);


    // использовать useSelector() и подписаться на изменение тудушек в сторе (получится массив, мар получит тудушки)
    // получить состояние todo



    return (
        <li className="tasks__item">
            <input type="checkbox"></input>
            <p className="tasks__item-title">Task 1</p>
            <div className="tasks__box-buttons">
                <button className="tasks__button-delete">Удалить</button>
                <button className="tasks__button-archive">Отложить</button>
            </div>
        </li>

    );
}

export default Task;
