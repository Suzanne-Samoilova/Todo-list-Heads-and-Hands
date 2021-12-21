import React from 'react';
import '../App.css';
import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import Todo from "./Todo";
import {useSelector} from "react-redux";
import {TRootState} from "../index";
import PopupWithForm from "./PopupWithForm";

function App() {
    const isAuthorized = useSelector((state: TRootState)=> state.auth.isAuthorized )

    // открыть попап
    const [isAddNewTaskPopupOpen, setIsAddNewTaskPopupOpen] = React.useState(false);

    // Добавить новый таск
    function handleAddNewTaskClick() {
        setIsAddNewTaskPopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddNewTaskPopupOpen(false);
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

    </div>
  );
}

export default App;
