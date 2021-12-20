import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import {setTodo} from "../asyncActions/customers";


function Todo() {
    const dispatch = useDispatch();

    const getTodoList = (state: any) => state.setTodo.todo
    const todo = useSelector(getTodoList);

    // загрузить список тудушек и положить в стор
    useEffect(()=> {
        dispatch(setTodo());
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
