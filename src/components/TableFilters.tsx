import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectorTodoState } from "../store/selectorsState";
import {
    filterNameTaskAction,
    sortingNameTaskAction,
    filterCategoryTaskAction,
    filterStatusTaskAction,
} from "../store/reducerTodo";
import { filteringTasks } from "../asyncActions/thunkFunctions";
import { listCategoriesForFilter } from "../constants/listCategoriesForFilter";
import { selectSortingName, selectSortingStatus } from "../constants/listSelectsForFilter";


const TableFilters = () => {
    const dispatch = useDispatch();
    const todo = useSelector(selectorTodoState);


    function handleFilterName(e: any) {
        const filterName = e.target.value;
        if (filterName.length !== 0) {
            dispatch(filterNameTaskAction({nameTask: filterName}));
        } else {
            dispatch(filterNameTaskAction({nameTask: null}));
        }
        dispatch(filteringTasks());
    }


    function handleSortingName(e: any) {
        const sortNameTask = e.target.value;
            if (sortNameTask === 'По возрастанию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'По возрастанию'}));
        } else if (sortNameTask === 'По убыванию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'По убыванию'}));
        } else {
            dispatch(sortingNameTaskAction({sortNameTask: null}));
        }
        dispatch(filteringTasks());
    }


    function handleSortingCategory(e: any) {
        const category = e.target.value;
        if (category === 'Любая категория') {
            dispatch(filterCategoryTaskAction({categoryTask: null}));
        } else {
            dispatch(filterCategoryTaskAction({categoryTask: category}));
        }
        dispatch(filteringTasks());
    }


    function handleSortingStatus(e: any) {
        const status = e.target.value;
        if (status === 'Не выполнено') {
            dispatch(filterStatusTaskAction({statusTask: false}));
        } else if (status === 'Выполнено') {
            dispatch(filterStatusTaskAction({statusTask: true}));
        } else {
            dispatch(filterStatusTaskAction({statusTask: null}));
        }
        dispatch(filteringTasks());
    }


    return (
        <div className="table-filters">
            <input className="table-filters__input-name"
                   placeholder="Введите название"
                   onChange={handleFilterName}/>

            <select className="table-filters__sorting"
                    onChange={handleSortingName}>
                {selectSortingName.map((item) => (
                    <option key={item.id}
                            selected={todo.sortNameTask && todo.sortNameTask === item.name}
                    >
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingCategory}>
                {listCategoriesForFilter.map((item) => (
                    <option key={item.id}
                            selected={todo.categoryTask && todo.categoryTask === item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingStatus}>
                {selectSortingStatus.map((item) => (
                    <option key={item.id}
                            selected={todo.statusTask === item.status}>
                        {item.name}
                    </option>
                ))}

            </select>
        </div>
    );
}

export default TableFilters;
