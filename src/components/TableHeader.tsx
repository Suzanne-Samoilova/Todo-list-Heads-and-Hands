import React from "react";

function TableHeader() {

    return (
        <ul style={{backgroundColor: "#c8c9cb",  display: "flex", flexDirection: "row", minHeight: "30px", listStyleType: "none",
            padding: 0, margin: "0 150px 10px", fontStyle: "inherit", fontSize: "14px", borderRadius: "4px", alignItems: "center"}}>

            <div style={{display: "flex", flexDirection: "row", marginRight: "auto", marginLeft: "auto",
                alignItems: "center"}}>
                <li style={{paddingLeft: "16px"}}>Название:</li>
            </div>

            <div style={{display: "flex", flexDirection: "row", alignItems: "center", textAlign: "center"}}>
                <li style={{width: "100px", textAlign: "left"}}>Категория:</li>
                <li style={{width: "93px", margin: "0 5px"}}>Дата создания:</li>
                <li style={{width: "93px", margin: "0 5px"}}>Дата последнего изменения:</li>
                <li style={{width: "93px", margin: "0 5px"}}>Крайний срок:</li>
            </div>

            <li style={{width: "360px", height: "10px"}}/>
        </ul>
    );
}

export default TableHeader;
