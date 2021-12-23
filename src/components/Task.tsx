import React from "react";
import {useDispatch} from "react-redux";
import {getTodo} from "../asyncActions/customers";
import {selectTaskAction, unselectTaskAction} from "../store/reducerTodo";
import PopupWithForm from "./PopupWithForm";
import axios from "axios";


function Task(props: any) {
    const dispatch = useDispatch();

    // для смены статуса Выполнено
    const handleChange = () => {
        // отослать статус таски
        axios.patch(`http://localhost:3001/todo/${props.id}`, {"status": !props.status})
            .then(resp => {
                dispatch(getTodo());
            })
            .catch(error =>
                console.log('error:', error))

    }

    // попап Хотите удалить?
    const [isOpenPopupDeleteTask, setIsOpenPopupDeleteTask] = React.useState(false);

    // попап Хотите удалить?
    function handleOpenPopupDeleteTask() {
        setIsOpenPopupDeleteTask(true);
    }

    function handleClosePopupDeleteTask() {
        setIsOpenPopupDeleteTask(false);
    }

    // сабмит попапа Удалить таск
    function handleSubmitDeleteTask(e: any) {
        e.preventDefault();
        // dispatch(deleteTask(props.id))
        axios.delete(`http://localhost:3001/todo/${props.id}`)
            .then(resp => {
                dispatch(getTodo());
            })
            .catch(error =>
                console.log('error:', error));
        console.log('SUBMIT Удалить сработал!');
        handleClosePopupDeleteTask();
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
        <>
            <li className="tasks__item">
                <div style={{display: "flex", flexDirection: "row", backgroundColor: "green", marginRight: "auto"}}>
                    <input type="checkbox" onClick={handleSelect}/>
                    <p className={props.status ? "tasks__item_completed" : "tasks__item-title"}>{props.name}</p>
                    <p className="tasks__date">{props.category}</p>
                </div>

                <div style={{display: "flex", flexDirection: "row", backgroundColor: "pink"}}>
                    <p className="tasks__date">{props.date_create}</p>
                    <p className="tasks__date">{props.date_change}</p>
                    <p className="tasks__date">{props.date_deadline}</p>
                </div>

                <div style={{width: "360px", display: "flex", justifyContent: "flex-end", backgroundColor: "yellow"}}>
                    <button className="tasks__button-delete"
                            onClick={handleChange}>{props.status ? 'Не выполнено' : 'Выполнено'}</button>
                    <button className="tasks__button-archive"
                            onClick={props.onChangeTask}>Изменить</button>
                    <button className="tasks__button-archive"
                            onClick={handleOpenPopupDeleteTask}>Удалить</button>
                    <button className="tasks__button-archive">Отложить</button>
                </div>
            </li>

            {/*попап Хотите удалить?*/}
            <PopupWithForm name="confirm_delete"
                           title="Хотите удалить?"
                           buttonText="Да"
                           isOpen={isOpenPopupDeleteTask}
                           onClose={handleClosePopupDeleteTask}
                           onSubmit={handleSubmitDeleteTask}
            >
                <button className=""
                        type="button"
                        aria-label="Отмена"
                        onClick={handleClosePopupDeleteTask}
                >Нет</button>
            </PopupWithForm>
        </>
    );
}

export default Task;
