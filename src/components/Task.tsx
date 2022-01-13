import React from "react";
import {useDispatch} from "react-redux";
import {add, parse} from 'date-fns';
import {push} from "connected-react-router";

import {selectTaskAction, unselectTaskAction} from "../store/reducerTodo";
import {changeStatusArchive, changeStatusTask} from "../asyncActions/thunkFunctions";
import PopupConfirmDelete from "./PopupConfirmDelete";
import PopupChangeTask from "./PopupChangeTask";


function Task(props: any) {
    const dispatch = useDispatch();

    // попап Изменить таск
    const [isChangeTaskPopupOpen, setIsChangeTaskPopupOpen] = React.useState(false);
    // попап Хотите удалить?
    const [isOpenPopupDeleteTask, setIsOpenPopupDeleteTask] = React.useState(false);

    // попап Изменить таск
    function handleOpenPopupChangeTask(e: any) {
        e.stopPropagation();
        setIsChangeTaskPopupOpen(true);
    }

    function handleClosePopupChangeTask() {
        setIsChangeTaskPopupOpen(false);
    }

    // попап Хотите удалить?
    function handleOpenPopupDeleteTask(e: any) {
        e.stopPropagation();
        setIsOpenPopupDeleteTask(true);
    }

    function handleClosePopupDeleteTask() {
        setIsOpenPopupDeleteTask(false);
    }


    // для смены статуса Выполнено/Не выполнено
    const handleChange = (e: any) => {
        e.stopPropagation();
        const taskId = props.id;
        const taskStatus = props.status;
        // отослать статус таски
        dispatch(changeStatusTask(taskId, taskStatus));
    }


    const handleSelect = (e: any) => {
        e.stopPropagation();
        const checked = e.target.checked;
        const taskId = props.id;
        // отослать статус нескольких тасок
        if (checked) {
            dispatch(selectTaskAction({id: taskId}))
        } else {
            dispatch(unselectTaskAction({id: taskId}))
        }
    }


    function handleArchiveTask(e: any) {
        e.stopPropagation();
        const id = props.id;
        dispatch(changeStatusArchive(id, true));
    }


    // ПРОВЕРИТЬ dateDeadline !!!
    function taskClassNameSelector() {
        let deadlineIsNear = () => {
            // const criticalDate = parse(dateDeadline, 'dd.MM.yyyy', new Date());
            const criticalDate = parse(props.date_deadline, 'dd.MM.yyyy', new Date());
            const redDate = add(Date.now(), {days: 3});
            return criticalDate <= redDate;
        }
        let className =  props.status ? "tasks__item_completed" : "tasks__item";
        className += deadlineIsNear() ? " tasks__item_red" : "";
        return className;
    }


    function handleGoDetailPage() {
        const taskId = props.id;
        dispatch(push(`${taskId}`));
    }


    return (
        <>
            <li className={taskClassNameSelector()}
                onClick={handleGoDetailPage}>

                <input className="tasks__checkbox" type="checkbox" onClick={handleSelect}/>

                <p className="tasks__item-title">{props.name}</p>

                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{width: "100px", font: "inherit", margin: "0"}}>{props.category}</p>
                    <p className="tasks__date">{props.date_create}</p>
                    <p className="tasks__date">{props.date_change}</p>
                    <p className="tasks__date">{props.date_deadline}</p>
                </div>

                <div style={{width: "370px", display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    <button className="tasks__button-delete"
                            onClick={handleChange}>{props.status ? 'Не выполнено' : 'Выполнено'}</button>
                    <button className="tasks__button-archive"
                            onClick={handleOpenPopupChangeTask}>Изменить</button>
                    <button className="tasks__button-archive"
                            onClick={handleOpenPopupDeleteTask}>Удалить</button>
                    <button className="tasks__button-archive"
                            onClick={handleArchiveTask}>Отложить</button>
                </div>
            </li>

            {/*попап Хотите удалить?*/}
            {isOpenPopupDeleteTask && <PopupConfirmDelete
                isOpen={isOpenPopupDeleteTask}
                onClose={handleClosePopupDeleteTask}
                id={props.id}
                name={props.name}/>}

            {/*попап Изменить таск*/}
            {isChangeTaskPopupOpen && <PopupChangeTask
                isOpen={isChangeTaskPopupOpen}
                onClose={handleClosePopupChangeTask}
                id={props.id}
                category={props.category}
                name={props.name}
                description={props.description}
                dateDeadline={props.dateDeadline}
            />}
        </>
    );
}

export default Task;
