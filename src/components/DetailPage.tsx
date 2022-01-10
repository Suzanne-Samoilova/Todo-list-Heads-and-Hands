import React from "react";
import Header from "./Header";

function DetailPage() {


    return (
        <section className="todo">

            <Header/>

            <h2 className="todo__title">Детальная страница</h2>
            <ul className="table-header" style={{justifyContent: "space-between"}}>
                <div className="" style={{display: "flex", flexDirection: "row"}}>
                    <li className="" style={{minWidth: "200px", marginLeft: "20px", marginRight: "20px"}}>Название и описание:</li>
                </div>
                <div className="table-header__box-about" style={{}}>
                    <li className="table-header__category">Категория:</li>
                    <li className="table-header__dates">Дата создания:</li>
                    <li className="table-header__dates">Дата последнего изменения:</li>
                    <li className="table-header__dates" style={{width: "464px"}}>Крайний срок:</li>
                </div>
            </ul>

            <div className="" style={{display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: "#f5f7f9",
                fontSize: "14px", borderRadius: "4px", margin: "0 150px 10px", justifyContent: "space-between"}}>

                <div style={{display: "flex", flexDirection: "column", minWidth: "200px", marginLeft: "20px", marginRight: "20px"}}>
                    <p className="" style={{fontWeight: "500", fontSize: "15px", marginTop: "15px"}}>
                        {/*{props.name}*/}
                        Здесь идет какой-то текст с названием тра-ля-ля
                    </p>
                    <p style={{}}>Здесь идет какое-то описание Здесь идет какое-то описание Здесь идет какое-то описание
                        Здесь идет какое-то описание Здесь идет какое-то описание Здесь идет какое-то описание </p>
                </div>

                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <p style={{width: "100px", font: "inherit", margin: "0"}}>
                            {/*{props.category}*/}
                            Категория
                        </p>
                        <p className="tasks__date">
                            {/*{props.date_create}*/}
                            Дата
                        </p>
                        <p className="tasks__date">
                            {/*{props.date_change}*/}
                            Дата
                        </p>
                        <p className="tasks__date">
                            {/*{props.date_deadline}*/}
                            Дата
                        </p>
                    </div>
                    <div style={{width: "370px", display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
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



        </section>
    );
}

export default DetailPage;
