import React from "react";
import {useDispatch} from "react-redux";
import {deleteTask, setTaskStatusGalochka} from "../asyncActions/customers";
import {selectTaskAction, unselectTaskAction} from "../store/reducerSetToDo";


function Task(props: any) {
    const dispatch = useDispatch();


    // для смены статуса чекбокса
    const handleChange = (event: any) => {
        // отослать статус таски
        dispatch(setTaskStatusGalochka(props.id, !props.status))
    }

    // для удаления таски
    const handleDelete = () => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            dispatch(deleteTask(props.id))
        }
    }

    const handleSelect = (event: any) => {
        const checked = event.target.checked;
        const taskId = props.id;
        // отослать статус таски
        if (checked) {
            dispatch(selectTaskAction({id: taskId}))
        } else {
            dispatch(unselectTaskAction({id: taskId}))
        }
    }

    return (
        <li className="tasks__item">
            {/*onChange см как работает*/}
            <input type="checkbox" onClick={handleSelect}/>
            <p className={props.status ? "tasks__item_completed" : "tasks__item-title"}>{props.name}</p>
            <div className="tasks__box-buttons">
                <button className="tasks__button-delete" onClick={handleChange}>{props.status ? 'Не выполнено' : 'Выполнено'}</button>
                <button className="tasks__button-archive"
                        // onClick={handleDelete}
                        onClick={props.onConfirmDeleteTask}
                >Удалить
                </button>
                <button className="tasks__button-archive">Отложить</button>
            </div>
        </li>
    );
}

export default Task;
