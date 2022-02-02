import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { listCategoriesForFilter } from "../constants/listCategoriesForFilter";
import { selectSortingName, selectSortingStatus } from "../constants/listSelectsForFilter";
import {
    filterAnyCategory,
    filterAscending,
    filterDescending,
    filterDone,
    filterNotDone
} from "../constants/filtersText";
import {selectorTodoState} from "../store/todo/selector";
import {filteringTasks} from "../asyncActions/todo";
import {
    filterCategoryTaskAction,
    filterNameTaskAction,
    filterStatusTaskAction,
    sortingNameTaskAction
} from "../store/todo/action";


const TableFilters = () => {
    const dispatch = useDispatch();
    const todo = useSelector(selectorTodoState);


    const handleFilterName = (e: any) => {
        const filterName = e.target.value;
        if (filterName.length !== 0) {
            dispatch(filterNameTaskAction({nameTask: filterName}));
        } else {
            dispatch(filterNameTaskAction({nameTask: null}));
        }
        dispatch(filteringTasks());
    }


    const handleSortingName = (e: any) => {
        const sortNameTask = e.target.value;
            if (sortNameTask === filterAscending) {
            dispatch(sortingNameTaskAction({sortNameTask: filterAscending}));
        } else if (sortNameTask === filterDescending) {
            dispatch(sortingNameTaskAction({sortNameTask: filterDescending}));
        } else {
            dispatch(sortingNameTaskAction({sortNameTask: null}));
        }
        dispatch(filteringTasks());
    }


    const handleSortingCategory = (e: any) => {
        const category = e.target.value;
        if (category === filterAnyCategory) {
            dispatch(filterCategoryTaskAction({categoryTask: null}));
        } else {
            dispatch(filterCategoryTaskAction({categoryTask: category}));
        }
        dispatch(filteringTasks());
    }


    const handleSortingStatus = (e: any) => {
        const status = e.target.value;
        if (status === filterNotDone) {
            dispatch(filterStatusTaskAction({statusTask: false}));
        } else if (status === filterDone) {
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
                            selected={todo.sortNameTask && todo.sortNameTask === item.name}>
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
