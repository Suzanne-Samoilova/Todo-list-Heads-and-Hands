import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import Task from "./Task";


function Todo() {
    const dispatch = useDispatch();

    // массив туду
    // const todo = useSelector((state: any) => state.todo);
    const todo = [1, 2, 3]



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

                {todo.map(() => (
                    <Task
                        // пропс для открывания таски
                        // onCardClick={}
                    />
                ))}



            </ul>
        </section>
    );
}

export default Todo;
