import React, {useEffect} from "react";
import Header from "./Header";
import {useDispatch} from "react-redux";
import {getDetailTask} from "../asyncActions/thunkFunctions";
import store from "../store/configureStore";


function DetailPage(props: any) {
    const dispatch = useDispatch();
    // const getTodoList = (state: any) => state.todo.todo;
    // const todo = useSelector(getTodoList);



    const taskId = props.id;
    useEffect(()=> {
        dispatch(getDetailTask(42));
    },[dispatch])


    return (
        <section className="todo">

            <Header/>

            <h1 className="todo__title">Детальная страница</h1>

            <div style={{display: "flex", flexDirection: "row"}}>
                <ul className="" style={{backgroundColor: "#c8c9cb", display: "flex", flexDirection: "column",
                    listStyleType: "none", padding: "10px 15px", margin: "0 10px 10px 150px", minWidth: "220px", fontStyle: "inherit",
                    fontSize: "14px", borderRadius: "4px"}}>
                    <li className="" style={{border: "red solid 1px", height: "150px", margin: "0"}}>Название и описание:</li>
                    <li className="" style={{margin: "0"}}>Категория:</li>
                    <li className="" style={{margin: "0"}}>Дата создания:</li>
                    <li className="" style={{margin: "0"}}>Дата последнего изменения:</li>
                    <li className="" style={{margin: "0"}}>Крайний срок:</li>
                    <li className="" style={{margin: "0"}}>Действия:</li>
                </ul>

                <div className="" style={{display: "flex", flexDirection: "column", padding: "10px 15px",
                    // alignItems: "center",
                    backgroundColor: "#f5f7f9", fontSize: "14px", borderRadius: "4px", margin: "0 150px 0 0", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "column", minWidth: "200px", border: "red solid 1px", height: "150px"}}>
                        <p className="" style={{fontWeight: "500", fontSize: "15px", margin: "0"}}>{store.getState().detail.name}</p>
                        <p style={{margin: "0"}}>{store.getState().detail.description}</p>
                    </div>


                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", border: "red solid 1px"}}>
                        <div style={{display: "flex", flexDirection: "column", border: "green solid 1px", margin: "0"}}>
                            <p style={{font: "inherit", margin: "0"}}>{store.getState().detail.category}</p>
                            <p className="" style={{margin: "0"}}>{store.getState().detail.date_create}</p>
                            <p className="" style={{margin: "0"}}>{store.getState().detail.date_change}</p>
                            <p className="" style={{margin: "0"}}>{store.getState().detail.date_deadline}</p>
                        </div>


                        <div style={{display: "flex", flexDirection: "row", border: "orange solid 1px", justifyContent: "center", marginTop: "10px"}}>
                            <button className="tasks__button-delete"
                                    // onClick={handleChange}
                            >
                                {/*{props.status ? 'Не выполнено' : 'Выполнено'}*/}
                                Выполнено
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
