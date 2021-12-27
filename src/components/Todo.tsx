import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import {deleteMultipleTask, getTodo} from "../asyncActions/thunkFunctions";
import TableHeader from "./TableHeader";
import PopupNewTask from "./PopupNewTask";
import Header from "./Header";


function Todo(props: any) {
    const dispatch = useDispatch();

    const getTodoList = (state: any) => state.todo.todo
    const todo = useSelector(getTodoList);

    // загрузить список тудушек и отрисовать
    useEffect(()=> {
        dispatch(getTodo());
    },[dispatch])

    // Удалить выбранные таски
    const handleDeleteButton = ()=> {
        dispatch(deleteMultipleTask())
    }

    // открыть попап новый таск
    const [isAddNewTaskPopupOpen, setIsAddNewTaskPopupOpen] = React.useState(false);

    // Добавить новый таск
    function handleAddNewTask() {
        setIsAddNewTaskPopupOpen(true);
    }

    function handleClosePopupAddNewTask() {
        setIsAddNewTaskPopupOpen(false);
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
                                onClick={handleAddNewTask}>
                            Добавить
                        </button>
                        <button className="todo__button-add" onClick={handleDeleteButton}>Удалить выбранное</button>
                    </div>
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

            {isAddNewTaskPopupOpen && <PopupNewTask
                isOpen={isAddNewTaskPopupOpen}
                onClose={handleClosePopupAddNewTask}
            />}
        </>
    );
}

export default Todo;
