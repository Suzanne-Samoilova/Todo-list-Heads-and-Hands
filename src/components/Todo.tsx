import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

import { selectorTodoState } from "../store/selectorsState";
import { deleteMultipleTask, filteringTasks } from "../asyncActions/thunkFunctions";
import { decrementPageAction, incrementPageAction } from "../store/reducerTodo";
import {FIRST_PAGE, LIMIT_PAGINATE_TODO_LIST} from "../constants/constants";
import Header from "./Header";
import TableFilters from "./TableFilters";
import TableHeader from "./TableHeader";
import Task from "./Task";
import PopupNewTask from "./PopupNewTask";


const Todo = () => {
    const dispatch = useDispatch();
    const todoState = useSelector(selectorTodoState);

    useEffect(()=> {
        dispatch(filteringTasks());
    },[])


    const [isAddNewTaskPopupOpen, setIsAddNewTaskPopupOpen] = useState(false);

    const handleAddNewTask = () => {
        setIsAddNewTaskPopupOpen(true);
    }

    const handleClosePopupAddNewTask = () => {
        setIsAddNewTaskPopupOpen(false);
    }

    const handleDeleteButton = () => {
        dispatch(deleteMultipleTask());
        dispatch(filteringTasks());
    }

    const handleNextPage = () => {
        dispatch(incrementPageAction());
        dispatch(filteringTasks());
    }

    const handlePreviousPage = () => {
        dispatch(decrementPageAction());
        dispatch(filteringTasks());
    }


    return (
        <>
            <section className="todo">

                <Header/>

                <h2 className="todo__title">Список задач:</h2>

                <div className="todo__box-buttons">
                    <div className="todo__box-buttons-left">
                        <button className="todo__button-add"
                                aria-label="Добавить новый таск"
                                type="button"
                                onClick={handleAddNewTask}>Добавить</button>
                        <button className="todo__button-add"
                                onClick={handleDeleteButton}>Удалить выбранное</button>
                    </div>
                </div>

                <TableFilters/>

                <TableHeader/>

                <ul className="tasks">
                    {todoState.todo.map((todoItem: any) => (
                        <Task key={todoItem.id}
                            {...todoItem}/>
                    ))}
                </ul>

                <div className="todo__box-buttons todo__box-buttons-right">
                    <button className="todo__button-left"
                            onClick={handlePreviousPage}
                            disabled={todoState.currentPage <= FIRST_PAGE}/>
                    <button className="todo__button-right"
                            onClick={handleNextPage}
                            disabled={todoState.todo.length < LIMIT_PAGINATE_TODO_LIST}/>
                </div>
            </section>

            {isAddNewTaskPopupOpen && <PopupNewTask
                isOpen={isAddNewTaskPopupOpen}
                onClose={handleClosePopupAddNewTask}/>}
        </>
    );
}

export default Todo;
