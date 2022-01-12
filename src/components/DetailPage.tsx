import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import Header from "./Header";
import {getDetailTask} from "../asyncActions/thunkFunctions";


function DetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const taskDetailState = (state: any) => state.detail;
    const task = useSelector(taskDetailState);

    useEffect(()=> {
        dispatch(getDetailTask(id));
    },[dispatch])


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
                        <p style={{margin: "0"}}>{task.description}</p>
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
                                    // onClick={handleChange}
                            >
                                {task.status ? 'Не выполнено' : 'Выполнено'}
                            </button>
                            <button className="tasks__button-archive"
                                    // onClick={handleOpenPopupChangeTask}
                            >Изменить</button>
                            <button className="tasks__button-archive"
                                    // onClick={handleOpenPopupDeleteTask}
                            >Удалить</button>
                            <button className="tasks__button-archive"
                                    // onClick={handleArchiveTask}
                            >Отложить</button>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
}

export default DetailPage;
