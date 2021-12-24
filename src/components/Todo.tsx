import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import {getTodo} from "../asyncActions/customers";
import store from "../store/store";
import axios from "axios";
import {clearSelectedTasksAction} from "../store/reducerTodo";
import TableHeader from "./TableHeader";


function Todo(props: any) {
    const dispatch = useDispatch();

    const getTodoList = (state: any) => state.todo.todo
    const todo = useSelector(getTodoList);

    // загрузить список тудушек и отрисовать
    useEffect(()=> {
        dispatch(getTodo());
    },[])

    // Удалить выбранные таски
    const handleDeleteButton = ()=> {
        let promises = store.getState().todo.selectedTasks.map(
            (taskId:number) => {return axios.delete(`http://localhost:3001/todo/${taskId}`)}
        )
        Promise.all(promises).then(resp => {
            dispatch(clearSelectedTasksAction());
            dispatch(getTodo());
        })
    }


    return (
        <>
            <section className="todo">
                <h2 className="todo__title">Список дел:</h2>
                <div className="todo__box-buttons">
                    <div className="todo__box-buttons-left">
                        <button className="todo__button-add"
                                aria-label="Добавить новый таск"
                                type="button"
                                onClick={props.onAddNewTask}>
                            Добавить
                        </button>
                        <button className="todo__button-add" onClick={handleDeleteButton}>Удалить выбранное</button>
                    </div>
                    <button style={{marginLeft: "30px"}} className="todo__button-add">Перейти в архив</button>
                </div>
            <TableHeader/>
                <ul className="tasks">
                    {todo.map((todoItem: any) => (
                        <Task key={todoItem.id}
                            {...todoItem}
                        />
                    ))}
                </ul>
                <div style={{display: "flex", flexDirection:  "row", margin: "0 150px 20px", justifyContent: "flex-end"}}>
                    <button className="todo__button-left"/>
                    <button className="todo__button-right"/>
                </div>
            </section>
        </>
    );
}

export default Todo;
