import {listCategories} from "../utils/listCategories";
import React from "react";
import store from "../store/configureStore";
import {dateFormat, getDateNowByDDmmyyyy} from "../utils/DateHelper";
import axios from "axios";
import {getTodo} from "../asyncActions/thunkFunctions";
import {useDispatch} from "react-redux";
import PopupWithForm from "./PopupWithForm";
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU'

function PopupNewTask(props: any) {
    const dispatch = useDispatch();

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

    function handleDateDeadlineChange(date: any, dateString: string) {
        setDate_deadline(dateString);
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
        props.onClose();
    }

    return (
        <PopupWithForm name="add-new-task"
                       title="Добавить новый таск"
                       buttonText="Создать"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitCreateTask}
        >
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
            <DatePicker onChange={handleDateDeadlineChange} format={dateFormat} locale={locale}/>
        </PopupWithForm>
    );
}

export default PopupNewTask;
