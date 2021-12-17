import React from "react";

function Task() {

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
