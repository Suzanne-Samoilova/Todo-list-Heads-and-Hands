import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import {deleteSelectedTask, setTodo} from "../asyncActions/customers";
import PopupWithForm from "./PopupWithForm";


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

    // попап Хотите удалить?
    const [isConfirmDeleteTaskPopupOpen, setIsConfirmDeleteTaskPopupOpen] = React.useState(false);
    function handleConfirmDeleteTaskClick() {
        setIsConfirmDeleteTaskPopupOpen(true);
    }

    // попап Изменить таск
    const [isChangeTaskPopupOpen, setIsChangeTaskPopupOpen] = React.useState(false);
    function handleChangeTaskClick() {
        setIsChangeTaskPopupOpen(true);
    }

    function closeAllPopups() {
        setIsConfirmDeleteTaskPopupOpen(false);
    }

    return (
        <>
            <section className="todo">
                <h2 className="todo__title">Список дел:</h2>
                <div className="todo__box-buttons">
                    <button className="todo__button-add"
                            aria-label="Добавить новый таск"
                            type="button"
                            onClick={props.onAddNewTask}>
                        Добавить
                    </button>
                    <button className="todo__button-add" onClick={handleDeleteButton}>Удалить выбранное</button>
                </div>
                <ul className="tasks">

                    {todo.map((todoItem: any) => (
                        <Task key={todoItem.id}
                              onConfirmDeleteTask={handleConfirmDeleteTaskClick}
                            {...todoItem}
                        />
                    ))}

                </ul>
            </section>

            {/*попап Хотите удалить?*/}
            <PopupWithForm name="confirm_delete"
                           title="Хотите удалить?"
                           buttonText="Да"
                           isOpen={isConfirmDeleteTaskPopupOpen}
                           onClose={closeAllPopups}
            >
                <input/>
            </PopupWithForm>

            {/*попап Изменить таск*/}
            <PopupWithForm name="change-task"
                           title="Изменить таск"
                           buttonText="Изменить"
                           // isOpen={}
                           onClose={closeAllPopups}
            >
                <p className="popup__task-name">Выберите категорию:</p>
                <select className="popup__input-text">
                    <option>Общая заметка</option>
                    <option>Спорт</option>
                    <option>Покупки</option>
                    <option>Здоровье</option>
                    <option>Книги</option>
                    <option>Напоминания</option>
                    <option>Работа</option>
                </select>

                <p className="popup__task-name">Название:</p>
                <input className="popup__input-text" id=""
                       type="text"
                       name="task-name"
                       placeholder="Введите название таска"
                       required
                />

                <p className="popup__task-name">Описание:</p>
                <input className="popup__input-text" id=""
                       type="text"
                       name="task-description"
                       placeholder="Введите описание таска"
                       required
                />

                <p className="popup__task-name">Крайний срок исполнения:</p>
                <input className="popup__input-text" id=""
                       type="date"
                />
            </PopupWithForm>




        </>
    );
}

export default Todo;
