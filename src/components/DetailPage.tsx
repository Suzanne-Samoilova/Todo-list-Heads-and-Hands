import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { push } from "connected-react-router";

import {selectorDetailState} from "../store/selectorsState";
import {changeStatusArchive, changeStatusTask, getDetailTask} from "../asyncActions/thunkFunctions";
import Header from "./Header";
import PopupConfirmDelete from "./PopupConfirmDelete";
import PopupChangeTask from "./PopupChangeTask";


function DetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams <{ id: string }>();
    const task = useSelector(selectorDetailState);


    useEffect(()=> {
        dispatch(getDetailTask(id));
    },[dispatch, id])


    // попап Изменить таск
    const [isChangeTaskPopupOpen, setIsChangeTaskPopupOpen] = React.useState(false);
    // попап Хотите удалить?
    const [isOpenPopupDeleteTask, setIsOpenPopupDeleteTask] = React.useState(false);

    // попап Изменить таск
    function handleOpenPopupChangeTask() {
        setIsChangeTaskPopupOpen(true);
    }

    function handleClosePopupChangeTask() {
        setIsChangeTaskPopupOpen(false);
    }

    // попап Хотите удалить?
    function handleOpenPopupDeleteTask() {
        setIsOpenPopupDeleteTask(true);
    }

    function handleClosePopupDeleteTask() {
        setIsOpenPopupDeleteTask(false);
    }


    // для смены статуса Выполнено/Не выполнено
    const handleChange = () => {
        const taskStatus = task.status;
        dispatch(changeStatusTask(id, taskStatus));
    }


    function handleArchiveTask() {
        dispatch(changeStatusArchive(id, true));
        dispatch(push(`/`));
    }


    return (
        <section className="todo">

            <Header/>

            <h1 className="todo__title">Детальная страница</h1>

            <div className="detail-task">
                <ul className="detail-task__header">
                    <li className="detail-task__header-name">Название и описание:</li>
                    <li className="detail-task__item">Категория:</li>
                    <li className="detail-task__item-with-margin-top">Дата создания:</li>
                    <li className="detail-task__item">Дата последнего изменения:</li>
                    <li className="detail-task__item">Крайний срок:</li>
                    <li className="detail-task__item-with-margin-top">Действия:</li>
                </ul>

                <div className="detail-task__details">
                    <div className="detail-task__details-text">
                        <p className="detail-task__details-name">{task.name}</p>
                        <p className="detail-task__details-description">{task.description}</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection: "column", margin: "0"}}>
                            <p className="detail-task__item">{task.category}</p>
                            <p className="detail-task__item-with-margin-top">{task.date_create}</p>
                            <p className="detail-task__item">{task.date_change}</p>
                            <p className="detail-task__item">{task.date_deadline}</p>
                        </div>

                        <div style={{display: "flex", flexDirection: "row", justifyContent: "center",
                            marginTop: "20px"}}>
                            <button className="tasks__button-delete"
                                    onClick={handleChange}>{task.status ? 'Не выполнено' : 'Выполнено'}</button>
                            <button className="tasks__button-change"
                                    onClick={handleOpenPopupChangeTask}>Изменить</button>
                            <button className="tasks__button-change"
                                    onClick={handleOpenPopupDeleteTask}>Удалить</button>
                            <button className="tasks__button-change"
                                    onClick={handleArchiveTask}>Отложить</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*попап Хотите удалить?*/}
            {isOpenPopupDeleteTask && <PopupConfirmDelete
                isOpen={isOpenPopupDeleteTask}
                onClose={handleClosePopupDeleteTask}
                id={task.id}
                name={task.name}/>}

            {/*/!*попап Изменить таск*!/*/}
            {isChangeTaskPopupOpen && <PopupChangeTask
                isOpen={isChangeTaskPopupOpen}
                onClose={handleClosePopupChangeTask}
                id={task.id}
                category={task.category}
                name={task.name}
                description={task.description}
                date_deadline={task.date_deadline}
            />}
        </section>
    );
}

export default DetailPage;
