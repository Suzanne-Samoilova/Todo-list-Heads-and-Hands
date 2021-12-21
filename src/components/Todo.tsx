import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import {deleteSelectedTask, setTodo} from "../asyncActions/customers";


function Todo(props: any) {
    const dispatch = useDispatch();

    const getTodoList = (state: any) => state.setTodo.todo
    const todo = useSelector(getTodoList);

    // загрузить список тудушек и положить в стор
    useEffect(()=> {
        dispatch(setTodo());
    },[])


    const handleDeleteButton = ()=> {
        dispatch(deleteSelectedTask());
    }


    return (
        <section className="todo">
            <h2 className="todo__title">Список дел:</h2>
            <div className="todo__box-buttons">

                <button className="todo__button-add"
                        aria-label="Добавить новый таск"
                        type="button"
                        onClick={props.onAddNewTask}>
                    Добавить
                </button>


                <button className="todo__button-add"
                        onClick={handleDeleteButton}
                >Удалить выбранное</button>
            </div>
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
