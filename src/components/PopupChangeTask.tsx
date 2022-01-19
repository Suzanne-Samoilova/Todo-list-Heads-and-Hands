import React from "react";
import { useDispatch } from "react-redux";

import { listCategories } from "../utils/listCategories";
import moment from "moment";
import { DatePicker } from 'antd';
import { dateFormat, getDateNowByDDmmyyyy } from "../utils/dateHelper";
import locale from 'antd/es/date-picker/locale/ru_RU';
import { changeTask } from "../asyncActions/thunkFunctions";
import PopupWithForm from "./PopupWithForm";


function PopupChangeTask(props: any) {
    const dispatch = useDispatch();
    // Дата изменения
    const dateNow = getDateNowByDDmmyyyy();

    const [category, setCategory] = React.useState(props.category);
    const [name, setName] = React.useState(props.name);
    const [description, setDescription] = React.useState(props.description);
    const [dateDeadline, setDateDeadline] = React.useState(props.date_deadline);

    function handleChangeCategory(e: any) {
        setCategory(e.target.value);
    }

    function handleChangeName(e: any) {
        setName(e.target.value);
    }

    function handleChangeDescription(e: any) {
        setDescription(e.target.value);
    }

    function handleChangeDateDeadline(date: any, dateString: string) {
        setDateDeadline(dateString);
    }


    // сабмит попапа Изменить таск
    function handleSubmitChangeTask(e: any) {
        e.preventDefault();
        const taskId = props.id;
        dispatch(changeTask(taskId, category, name, description, dateNow, dateDeadline));
        props.onClose();
    }


    return (
        <PopupWithForm name="change-task"
                       title="Изменить таск"
                       buttonText="Изменить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmitChangeTask}>

            <p className="popup__name">"{props.name}"</p>

            <p className="popup__task-name">Выберите категорию:</p>
            <select className="popup__input-text"
                    value={category}
                    onChange={handleChangeCategory}>
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
                   required
                   onChange={handleChangeName}
                   value={name}/>

            <p className="popup__task-name">Описание:</p>
            <input className="popup__input-text"
                   type="text"
                   name="task-description"
                   placeholder="Введите описание таска"
                   required
                   onChange={handleChangeDescription}
                   value={description}/>

            <p className="popup__task-name" style={{marginBottom: "10px"}}>Крайний срок исполнения:</p>
            <DatePicker format={dateFormat}
                        locale={locale}
                        value={moment(dateDeadline, dateFormat)}
                        onChange={handleChangeDateDeadline}/>

        </PopupWithForm>
    );
}

export default PopupChangeTask;
