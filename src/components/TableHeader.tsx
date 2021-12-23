import React from "react";

function TableHeader() {

    return (
        <ul style={{backgroundColor: "#c8c9cb",  display: "flex", flexDirection: "row", minHeight: "30px", listStyleType: "none",
            padding: 0, margin: "0 80px 10px", fontStyle: "inherit", fontSize: "14px", borderRadius: "4px", justifyContent: "space-between",
        alignItems: "center"}}>

            <div style={{display: "flex", flexDirection: "row", backgroundColor: "green", marginRight: "auto"}}>
                <li>Название:</li>
                <li>Категория:</li>
            </div>

            <div style={{display: "flex", flexDirection: "row", backgroundColor: "pink"}}>
                <li>Дата создания:</li>
                <li>Дата последнего изменения:</li>
                <li>Крайний срок:</li>
            </div>

            <li style={{backgroundColor: "#000", width: "360px", height: "10px"}}/>
        </ul>
    );
}

export default TableHeader;
