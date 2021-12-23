import React from 'react';
import '../App.css';
import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import Todo from "./Todo";
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../index";
import PopupWithForm from "./PopupWithForm";
import axios from "axios";
import {getTodo} from "../asyncActions/customers";
import store from "../store/store";
import {getDateNowByDDmmyyyy} from "../utils/DateHelper";

function App() {
    const dispatch = useDispatch();

    const isAuthorized = useSelector((state: TRootState)=> state.auth.isAuthorized )

    // открыть попап
    const [isAddNewTaskPopupOpen, setIsAddNewTaskPopupOpen] = React.useState(false);

    // Добавить новый таск
    function handleAddNewTaskClick() {
        setIsAddNewTaskPopupOpen(true);
    }

    function handleClosePopupAddNewTask() {
        setIsAddNewTaskPopupOpen(false);
    }

    const [category, setCategory] = React.useState("");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date_deadline, setDate_deadline] = React.useState("");

    // забрать из формы
    function handleCategoryChange(e: any) {
        setCategory(e.target.value);
    }

    function handleNameChange(e: any) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e: any) {
        setDescription(e.target.value);
    }

    function handleDateDeadlineChange(e: any) {
        setDate_deadline(e.target.value);
    }

    function handleSubmitCreateTask(e: any) {
        e.preventDefault();
        const userId = store.getState().auth.userId;
        const dateNow = getDateNowByDDmmyyyy();
        axios.post(`http://localhost:3001/todo/`,
            {
                "category": category,
                "name": name,
                "description": description,
                "date_create": dateNow,
                "date_change": dateNow,
                "date_deadline": date_deadline,
                "user_id": userId
            })
            .then(resp => {
                console.log('Ответ после POST-запроса', resp)
                dispatch(getTodo());
            })
            .catch(error =>
                console.log('error:', error));
        handleClosePopupAddNewTask();
    }


  return (
    <div className="App">
        <Switch>
            <Route exact path="/">
                <Form />
            </Route>

            {isAuthorized &&
            <Route path="/todo">
                <Todo
                    onAddNewTask={handleAddNewTaskClick}
                />
            </Route>}
        </Switch>

        {/*попап Добавить новый таск*/}
        <PopupWithForm name="add-new-task"
                       title="Добавить новый таск"
                       buttonText="Создать"
                       isOpen={isAddNewTaskPopupOpen}
                       onClose={handleClosePopupAddNewTask}
                       onSubmit={handleSubmitCreateTask}
        >
            <p className="popup__task-name">Выберите категорию:</p>
            <select className="popup__input-text"
                    value={category}
                    onChange={handleCategoryChange}
                    required>
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
                   value={name}
                   onChange={handleNameChange}
                   required
            />

            <p className="popup__task-name">Описание:</p>
            <input className="popup__input-text" id=""
                   type="text"
                   name="task-description"
                   placeholder="Введите описание таска"
                   value={description}
                   onChange={handleDescriptionChange}
                   required
            />

            <p className="popup__task-name">Крайний срок исполнения:</p>
            <input className="popup__input-text"
                   type="date"
                   value={date_deadline}
                   onChange={handleDateDeadlineChange}
            />
        </PopupWithForm>
    </div>
  );
}

export default App;
