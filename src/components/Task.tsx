import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {deleteTask, setTaskStatusGalochka} from "../asyncActions/customers";


function Task(props: any) {
    const dispatch = useDispatch();

    // для смены статуса чекбокса
    const handleChange = (event: any) => {
        // отослать статус таски
        dispatch(setTaskStatusGalochka(event.target.checked, props.id))
    }

    // для удаления таски
    const handleDelete = () => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            dispatch(deleteTask(props.id))
        }
    }

    return (
        <li className="tasks__item">
            <input type="checkbox" checked={props.status} onChange={handleChange} />
            <p className="tasks__item-title">{props.name}</p>
            <div className="tasks__box-buttons">
                <button className="tasks__button-delete" onClick={handleDelete}>Удалить</button>
                <button className="tasks__button-archive">Отложить</button>
            </div>
        </li>

    );
}

export default Task;
