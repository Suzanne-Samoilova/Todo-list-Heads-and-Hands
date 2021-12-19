import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Task from "./Task";


function Todo() {
    const dispatch = useDispatch();

    const getTodoList = (state: any) => state.setTodo.todo
    const todo = useSelector(getTodoList);


    // загрузить список тудушек и положить в стор
    useEffect(()=> {
        axios.get(`http://localhost:3001/todo/`)
            .then(resp => {
                // console.log(resp.data, 'ТуДу-лист');
                dispatch({
                    type: "set_todo",
                    payload: {
                        todo: resp.data,
                    }})
            })
            .catch(error =>
                console.log('error:', error))
    },[])


    return (
        <section className="todo">
            <h2 className="todo__title">Список дел:</h2>
            <button className="todo__button-add">Добавить</button>
            <ul className="tasks">

                {todo.map((todoItem: any) => (
                    <Task
                        {...todoItem}
                    />
                ))}

            </ul>
        </section>
    );
}

export default Todo;
