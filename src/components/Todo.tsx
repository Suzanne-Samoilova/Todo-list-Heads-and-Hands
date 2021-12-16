import React from 'react';

function Todo() {



    return (
        <section className="todo">
            <h2 className="todo__title">Список дел:</h2>
            <button className="todo__button-add">Добавить</button>
            <ul className="tasks">
                <li className="tasks__item">
                    <p className="tasks__item-title">Task 1</p>
                    <div className="tasks__box-buttons">
                        <button className="tasks__button-delete">Удалить</button>
                        <button className="tasks__button-archive">Отложить</button>
                    </div>
                </li>
                <li className="tasks__item">
                    <p  className="tasks__item-title">Task 2</p>
                    <div className="tasks__box-buttons">
                        <button className="tasks__button-delete">Удалить</button>
                        <button className="tasks__button-archive">Отложить</button>
                    </div>
                </li>
                <li className="tasks__item">
                    <p  className="tasks__item-title">Task 3</p>
                    <div className="tasks__box-buttons">
                        <button className="tasks__button-delete">Удалить</button>
                        <button className="tasks__button-archive">Отложить</button>
                    </div>
                </li>
            </ul>
        </section>
    );
}

export default Todo;
