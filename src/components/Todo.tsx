import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import {getTodo} from "../asyncActions/customers";
import PopupWithForm from "./PopupWithForm";
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

    // попап Изменить таск
    const [isChangeTaskPopupOpen, setIsChangeTaskPopupOpen] = React.useState(false);

    // попап Изменить таск
    function handleChangeTaskClick() {
        // взять данные из таска, который открываем
        // подставить эти данные в попап
        // открыть попап Изменения
        setIsChangeTaskPopupOpen(true);
    }

    // закрыть все попапы
    function handleClosePopupChangeTask() {
        setIsChangeTaskPopupOpen(false);
    }

    // сабмит попапа Изменить таск
    function handleSubmitChangeTask(e: any) {
        e.preventDefault();
        console.log('SUBMIT Изменить сработал!');
        // диспач
        // закрыть попап
        // взять данные из формы
        // отправить на сервер аксиос запросом патч
        // вызвать перерисовку Todo
        handleClosePopupChangeTask();
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
                              // id={todoItem.id}
                              onChangeTask={handleChangeTaskClick}
                            {...todoItem}
                        />
                    ))}
                </ul>
                <div style={{display: "flex", flexDirection:  "row", margin: "0 150px 20px", justifyContent: "flex-end"}}>
                    <button className="todo__button-left"/>
                    <button className="todo__button-right"/>
                </div>
            </section>

            {/*попап Изменить таск*/}
            <PopupWithForm name="change-task"
                           title="Изменить таск"
                           buttonText="Изменить"
                           isOpen={isChangeTaskPopupOpen}
                           onClose={handleClosePopupChangeTask}
                           onSubmit={handleSubmitChangeTask}
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
