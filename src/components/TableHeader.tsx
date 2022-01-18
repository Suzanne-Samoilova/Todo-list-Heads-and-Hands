import React from "react";

function TableHeader() {
    return (
        <ul className="table-header">
            <div className="table-header__box-name">
                <li className="table-header__name">Название:</li>
            </div>

            <div className="table-header__box-about">
                <li className="table-header__category">Категория:</li>
                <li className="table-header__dates">Дата создания:</li>
                <li className="table-header__dates">Дата последнего изменения:</li>
                <li className="table-header__dates">Крайний срок:</li>
            </div>
        </ul>
    );
}

export default TableHeader;
