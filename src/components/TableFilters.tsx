import React from "react";
import {listCategoriesFilter} from "../utils/listCategoriesFilter";
import {useDispatch} from "react-redux";
import {filterStatus, getTodo} from "../asyncActions/thunkFunctions";

function TableFilters() {
    const dispatch = useDispatch();

    const [status, setStatus] = React.useState("");

    // забрать из формы
    function handleStatusChange(e: any) {
        setStatus(e.target.value);
    }


    function handleSubmitFilterTask(e: any) {
        e.preventDefault();
        dispatch(filterStatus());

        // dispatch(getTodo());
    }


    return (
        <form className="table-filters">
            <input className="table-filters__input-name"
                // value={}
                // onChange={handleFilterName}
            />

            <select className="table-filters__sorting"
                    // value={}
                    // onChange={handleSortingName}
            >
                <option>Любой порядок</option>
                <option>По возрастанию</option>
                <option>По убыванию</option>
            </select>

            <select className="table-filters__sorting"
                    value={status}
                    onChange={handleStatusChange}
            >
                <option>Любой статус</option>
                <option>Выполнено</option>
                <option>Не выполнено</option>
            </select>

            <select className="table-filters__sorting"
                    // value={category}
                    // onChange={handleSortingCategory}
            >
                {listCategoriesFilter.map((item) => (
                    <option key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>

            <button style={{backgroundColor: "#ffdd2d"}}
                    type="submit"
                    onSubmit={handleSubmitFilterTask}
            >
                Отфильтровать
            </button>

        </form>
    );
}

export default TableFilters;
