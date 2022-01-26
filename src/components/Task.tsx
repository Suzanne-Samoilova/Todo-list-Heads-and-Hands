import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { add, parse } from 'date-fns';

import { selectTaskAction, unselectTaskAction } from "../store/reducerTodo";
import { changeStatusArchive, changeStatusTask } from "../asyncActions/thunkFunctions";
import PopupConfirmDelete from "./PopupConfirmDelete";
import PopupChangeTask from "./PopupChangeTask";


const Task = (props: any) => {
    const dispatch = useDispatch();

    const [isChangeTaskPopupOpen, setIsChangeTaskPopupOpen] = useState(false);
    const [isOpenPopupDeleteTask, setIsOpenPopupDeleteTask] = useState(false);

    const handleOpenPopupChangeTask = (e: any) => {
        e.stopPropagation();
        setIsChangeTaskPopupOpen(true);
    }

    const handleClosePopupChangeTask = () => {
        setIsChangeTaskPopupOpen(false);
    }

    const handleOpenPopupDeleteTask = (e: any) => {
        e.stopPropagation();
        setIsOpenPopupDeleteTask(true);
    }

    const handleClosePopupDeleteTask = () => {
        setIsOpenPopupDeleteTask(false);
    }


    // для смены статуса Выполнено/Не выполнено
    const handleChange = (e: any) => {
        e.stopPropagation();
        const taskId = props.id;
        const taskStatus = props.status;
        dispatch(changeStatusTask(taskId, taskStatus));
    }


    const handleSelect = (e: any) => {
        e.stopPropagation();
        const checked = e.target.checked;
        const taskId = props.id;
        if (checked) {
            dispatch(selectTaskAction({id: taskId}))
        } else {
            dispatch(unselectTaskAction({id: taskId}))
        }
    }


    const handleArchiveTask = (e: any) => {
        e.stopPropagation();
        const id = props.id;
        dispatch(changeStatusArchive(id, true));
    }


    const taskClassNameSelector = () => {
        const deadlineIsNear = () => {
            const criticalDate = parse(props.date_deadline, 'dd.MM.yyyy', new Date());
            const redDate = add(Date.now(), {days: 3});
            return criticalDate <= redDate;
        }

        let className =  props.status ? "tasks__item_completed" : "tasks__item";
        className += deadlineIsNear() ? " tasks__item_red" : "";
        return className;
    }


    const handleGoDetailPage = () => {
        const taskId = props.id;
        dispatch(push(`${taskId}`));
    }


    return (
        <>
            <li className={taskClassNameSelector()}
                onClick={handleGoDetailPage}>

                <input className="tasks__checkbox"
                       type="checkbox"
                       onClick={handleSelect}/>

                <p className="tasks__item-title">{props.name}</p>

                <div className="tasks__box">
                    <p className="tasks__category">{props.category}</p>
                    <p className="tasks__date">{props.date_create}</p>
                    <p className="tasks__date">{props.date_change}</p>
                    <p className="tasks__date">{props.date_deadline}</p>
                </div>

                <div className="tasks__box tasks__box-buttons">
                    <button className="tasks__button-delete"
                            onClick={handleChange}>{props.status ? 'Не выполнено' : 'Выполнено'}</button>
                    <button className="tasks__button-change"
                            onClick={handleOpenPopupChangeTask}>Изменить</button>
                    <button className="tasks__button-change"
                            onClick={handleOpenPopupDeleteTask}>Удалить</button>
                    <button className="tasks__button-change"
                            onClick={handleArchiveTask}>Отложить</button>
                </div>
            </li>

            {isOpenPopupDeleteTask && <PopupConfirmDelete
                isOpen={isOpenPopupDeleteTask}
                onClose={handleClosePopupDeleteTask}
                id={props.id}
                name={props.name}/>}

            {isChangeTaskPopupOpen && <PopupChangeTask
                isOpen={isChangeTaskPopupOpen}
                onClose={handleClosePopupChangeTask}
                id={props.id}
                category={props.category}
                name={props.name}
                description={props.description}
                date_deadline={props.date_deadline}/>}
        </>
    );
}

export default Task;
