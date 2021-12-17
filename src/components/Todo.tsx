import React, {useEffect} from 'react';
import {createStore} from "redux";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

function Todo() {
    // <div>
    //     <h4>Успешный логин {email}!</h4>
    //     <button className="authorization__button-save" onClick={() =>
    //         dispatch({
    //             type: "logout",
    //             payload: {
    //                 userId: undefined,
    //                 todo: []
    //             }
    //         })}>
    //         Выйти
    //     </button>
    //     {JSON.stringify(todo)}
    // </div>

    const dispatch = useDispatch();
    // получить состояние чекбокса
    const checkbox = useSelector((state: any) => state.checkbox);
    console.log(checkbox);

    const defaultState = {
        checkbox: false,
        todo: []
    };

    // галочка стоит или нет
    const reducer = (state:any = defaultState, action: any) => {
        switch (action.type) {
            case "task_done":
                return {...state, checkbox: true}

            case "task_not_done":
                return {...state, checkbox: false}

            default:
                return state
        }
    };

    const store = createStore(reducer);

        //     dispatch({
        //         type: "task_done",
        //         payload: {
        //             checkbox: resp.data.checkbox}})
        // })

    // axios.get(`http://localhost:3001/todo?user_id=${userId}`)
    //     .then(resp => {
    //         dispatch({
    //             type: "login",
    //             payload: {
    //                 userId: userId,
    //                 todo: resp.data}})
    //     })
    //     .catch(error =>
    //         console.log('error:', error))

    // использовать useSelector() и подписаться на изменение тудушек в сторе (получится массив, мар получит тудушки)
    useEffect(()=> {
        // загрузить список тудушек и положить в стор (аксиос запрос)
    },[])

    return (
        <section className="todo">
            <h2 className="todo__title">Список дел:</h2>
            <button className="todo__button-add">Добавить</button>
            <ul className="tasks">
                <li className="tasks__item">
                    <input type="checkbox"></input>
                    <p className="tasks__item-title">Task 1</p>
                    <div className="tasks__box-buttons">
                        <button className="tasks__button-delete">Удалить</button>
                        <button className="tasks__button-archive">Отложить</button>
                    </div>
                </li>
                <li className="tasks__item">
                    <input type="checkbox"></input>
                    <p  className="tasks__item-title">Task 2</p>
                    <div className="tasks__box-buttons">
                        <button className="tasks__button-delete">Удалить</button>
                        <button className="tasks__button-archive">Отложить</button>
                    </div>
                </li>
                <li className="tasks__item">
                    <input type="checkbox"></input>
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
