import React, {useEffect} from 'react';
import {createStore} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {reducerTaskDone} from "../store/reducerTaskDone";
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
    // // получить состояние чекбокса
    // const checkbox = useSelector((state: any) => state.checkbox);
    // console.log(checkbox);


    const userId = useSelector((state: any) => state.userId);
    const todo = useSelector((state: any) => state.todo);



    // использовать useSelector() и подписаться на изменение тудушек в сторе (получится массив, мар получит тудушки)
    useEffect(()=> {
        // загрузить список тудушек и положить в стор (аксиос запрос)

        // axios.get(`http://localhost:3001/todo?user_id=${userId}`)

        axios.get(`http://localhost:3001/todo/`)
            .then(resp => {
                console.log(resp.data, 'ТуДу-лист');

                // dispatch({
                //     type: "login",
                //     payload: {
                //         userId: userId,
                //         todo: resp.data}})


            })
            .catch(error =>
                console.log('error:', error))
    },[])

    return (
        <section className="todo">
            <h2 className="todo__title">Список дел:</h2>
            <button className="todo__button-add">Добавить</button>
            <ul className="tasks">

            </ul>
        </section>
    );
}

export default Todo;
