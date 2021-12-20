import React from "react";
import axios from "axios";
import {useDispatch} from "react-redux";


function Task(props: any) {
    const dispatch = useDispatch();

    // для смены статуса чекбокса
    const handleChange = (event: any) => {
        // отослать статус таски
        // console.log("handleChange", event.target.checked)
        const newStatus = event.target.checked
        axios.patch(`http://localhost:3001/todo/${props.id}`, {"status": newStatus})
            .then(resp => {
                dispatch({
                    type: "set_task_status",
                    payload: {
                        id: props.id,
                        status: newStatus
                    }})
            })
            .catch(error =>
                console.log('error:', error))
    }

    // для удаления таски
    const handleDelete = () => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            // если да
            axios.delete(`http://localhost:3001/todo/${props.id}`)
                .then(resp => {
                    dispatch({
                        type: "delete_task",
                        payload: {
                            id: props.id
                        }})
                })
                .catch(error =>
                    console.log('error:', error))
        } else {
            // если нет
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
