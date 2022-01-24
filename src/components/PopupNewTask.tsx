import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { listCategories } from "../utils/listCategories";
import { DatePicker } from 'antd';
import { dateFormat, getDateNowByDDmmyyyy } from "../utils/dateHelper";
import {selectorAuthState} from "../store/selectorsState";
import { createTask } from "../asyncActions/thunkFunctions";
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import PopupWithForm from "./PopupWithForm";
import 'antd/dist/antd.css';
import {add} from "date-fns";
import moment from "moment";


function PopupNewTask(props: any) {
    const dispatch = useDispatch();

    const authState = useSelector(selectorAuthState);

    const [category, setCategory] = React.useState("Общая заметка");
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date_deadline, setDate_deadline] = React.useState("");

    function handleCategoryChange(e: any) {
        setCategory(e.target.value);
    }

    function handleNameChange(e: any) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e: any) {
        setDescription(e.target.value);
    }

    function handleDateDeadlineChange(date: any, dateString: string) {
        setDate_deadline(dateString);
    }


    function handleSubmitCreateTask(e: any) {
        e.preventDefault();
        const userId = authState.userId;
        const dateNow = getDateNowByDDmmyyyy();

        let deadline = moment(add(Date.now(), {days: 5})).format('DD.MM.YYYY');

        if (date_deadline.length === 0) {
            dispatch(createTask(userId, category, name, description, dateNow, deadline))
        } else {
            dispatch(createTask(userId, category, name, description, dateNow, date_deadline))
        }

        props.onClose();
    }


    return (
        <PopupWithForm name="add-new-task"
                       title="Добавить новый таск"
                       buttonText="Создать"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitCreateTask}>

            <p className="popup__task-name">Выберите категорию:</p>
            <select className="popup__input-text"
                    value={category}
                    onChange={handleCategoryChange}
                    required>
                {listCategories.map((item) => (
                    <option key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <p className="popup__task-name">Название:</p>
            <input className="popup__input-text"
                   type="text"
                   name="task-name"
                   placeholder="Введите название таска"
                   value={name}
                   onChange={handleNameChange}
                   required/>

            <p className="popup__task-name">Описание:</p>
            <input className="popup__input-text"
                   type="text"
                   name="task-description"
                   placeholder="Введите описание таска"
                   value={description}
                   onChange={handleDescriptionChange}
                   required/>

            <p className="popup__task-name popup__task-datepicker">Крайний срок исполнения:</p>
            <DatePicker onChange={handleDateDeadlineChange}
                        format={dateFormat}
                        locale={locale}/>
        </PopupWithForm>
    );
}

export default PopupNewTask;
