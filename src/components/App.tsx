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
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);

    // Добавить новый таск
    function handleAddNewTaskClick() {
        setIsAddNewTaskPopupOpen(true);
    }

    // Согласие удалить таск
    function handleConfirmDeleteTaskClick() {
        setIsConfirmDeletePopupOpen(true);
    }


    function closeAllPopups() {
        setIsAddNewTaskPopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
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
                    // onConfirmDeleteTask={handleConfirmDeleteTaskClick}
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
            <input/>
            <input/>
        </PopupWithForm>

        {/*попап Вы действительно хотите удалить?*/}
        <PopupWithForm name="confirm_delete"
                       title="Хотите удалить?"
                       buttonText="Да"
                       isOpen={isConfirmDeletePopupOpen}
                       onClose={closeAllPopups}
        >
            <input/>
        </PopupWithForm>

    </div>
  );
}

export default App;
