import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";


function Todo() {
    const dispatch = useDispatch();

    // загрузить список тудушек и положить в стор
    useEffect(()=> {
        axios.get(`http://localhost:3001/todo/`)
            .then(resp => {
                console.log(resp.data, 'ТуДу-лист');
                dispatch({
                    type: "get_todo",
                    payload: {
                        todo: resp.data}})
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
