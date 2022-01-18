import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { push } from "connected-react-router";
import { TRootState } from "../index";

import {changeStatusArchive, changeStatusTask, getDetailTask} from "../asyncActions/thunkFunctions";
import Header from "./Header";
import PopupConfirmDelete from "./PopupConfirmDelete";
import PopupChangeTask from "./PopupChangeTask";


function DetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams <{ id: string }>();

    const task = useSelector((state: TRootState) => state.detail);


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

            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <ul className="" style={{backgroundColor: "#c8c9cb", display: "flex", flexDirection: "column",
                    listStyleType: "none", padding: "10px 15px", margin: "0 10px 0 150px", minWidth: "220px", fontStyle: "inherit",
                    fontSize: "14px", borderRadius: "4px"}}>
                    <li className="" style={{height: "150px", margin: "0"}}>Название и описание:</li>
                    <li className="" style={{margin: "0"}}>Категория:</li>
                    <li className="" style={{margin: "20px 0 0"}}>Дата создания:</li>
                    <li className="" style={{margin: "0"}}>Дата последнего изменения:</li>
                    <li className="" style={{margin: "0"}}>Крайний срок:</li>
                    <li className="" style={{margin: "20px 0 0"}}>Действия:</li>
                </ul>

                <div style={{display: "flex", flexDirection: "column", padding: "10px 15px", backgroundColor: "#f5f7f9",
                    fontSize: "14px", borderRadius: "4px", margin: "0 150px 0 0"}}>
                    <div style={{display: "flex", flexDirection: "column", minWidth: "600px", height: "150px"}}>
                        <p style={{fontWeight: "500", fontSize: "15px", margin: "0"}}>{task.name}</p>
                        <p style={{margin: "10px 0 0", overflow: "hidden", textOverflow: "ellipsis"}}>{task.description}</p>
                    </div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection: "column", margin: "0"}}>
                            <p style={{margin: "0"}}>{task.category}</p>
                            <p style={{margin: "20px 0 0"}}>{task.date_create}</p>
                            <p style={{margin: "0"}}>{task.date_change}</p>
                            <p style={{margin: "0"}}>{task.date_deadline}</p>
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
