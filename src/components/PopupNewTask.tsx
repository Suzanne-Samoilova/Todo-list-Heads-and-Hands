import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {add} from "date-fns";
import { DatePicker } from 'antd';
import 'moment/locale/ru';
import moment from "moment";
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'antd/dist/antd.css';

import { listCategories } from "../constants/listCategories";
import { dateFormat, getDateNowByDDmmyyyy } from "../utils/dateHelper";
import PopupWithForm from "./PopupWithForm";
import {createTask} from "../asyncActions/todo";
import {selectorAuthState} from "../store/auth/selector";


const PopupNewTask = (props: any) => {
    const dispatch = useDispatch();

    const authState = useSelector(selectorAuthState);

    const [category, setCategory] = useState("Общая заметка");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date_deadline, setDate_deadline] = useState("");

    const handleCategoryChange = (e: any) => {
        setCategory(e.target.value);
    }

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    }

    const handleDateDeadlineChange = (date: any, dateString: string) => {
        setDate_deadline(dateString);
    }


    const handleSubmitCreateTask = (e: any) => {
        e.preventDefault();
        const userId = authState.userId;
        const dateNow = getDateNowByDDmmyyyy();

        const deadline = moment(add(Date.now(), {days: 5})).format(dateFormat);

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
                   required />

            <p className="popup__task-name">Описание:</p>
            <input className="popup__input-text"
                   type="text"
                   name="task-description"
                   placeholder="Введите описание таска"
                   value={description}
                   onChange={handleDescriptionChange} />

            <p className="popup__task-name popup__task-datepicker">Крайний срок исполнения:</p>
            <DatePicker onChange={handleDateDeadlineChange}
                        format={dateFormat}
                        locale={locale} />
        </PopupWithForm>
    );
}

export default PopupNewTask;
