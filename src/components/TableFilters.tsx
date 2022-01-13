import React from "react";
import {useDispatch} from "react-redux";
import store from "../store/configureStore";
import {
    filterNameTaskAction,
    sortingNameTaskAction,
    filterCategoryTaskAction,
    filterStatusTaskAction,
} from "../store/reducerTodo";
import {filtersTasks} from "../asyncActions/thunkFunctions";
import {listCategoriesForFilter} from "../utils/listCategoriesForFilter";
import {selectSortingName, selectSortingStatus} from "../utils/listSelectsForFilter";


function TableFilters() {
    const dispatch = useDispatch();

    function handleFilterName(e: any) {
        let filterName = e.target.value;
        if (filterName.length !== 0) {
            dispatch(filterNameTaskAction({nameTask: filterName}));
        } else {
            dispatch(filterNameTaskAction({nameTask: null}));
        }
        dispatch(filtersTasks());
    }


    function handleSortingName(e: any) {
        let sortNameTask = e.target.value;
        // if (status in ['Не выполнено', 'Выполнено']) {
            if (sortNameTask === 'По возрастанию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'По возрастанию'}));
        } else if (sortNameTask === 'По убыванию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'По убыванию'}));
        } else {
            dispatch(sortingNameTaskAction({sortNameTask: null}));
        }
        dispatch(filtersTasks());
    }


    function handleSortingCategory(e: any) {
        let category = e.target.value;
        if (category === 'Любая категория') {
            dispatch(filterCategoryTaskAction({categoryTask: null}));
        } else {
            dispatch(filterCategoryTaskAction({categoryTask: category}));
        }
        dispatch(filtersTasks());
    }


    function handleSortingStatus(e: any) {
        let status = e.target.value;
        if (status === 'Не выполнено') {
            dispatch(filterStatusTaskAction({statusTask: false}));
        } else if (status === 'Выполнено') {
            dispatch(filterStatusTaskAction({statusTask: true}));
        } else {
            dispatch(filterStatusTaskAction({statusTask: null}));
        }
        dispatch(filtersTasks());
    }


    // function matchingFilterStatus(item: any) {
    //     // store.getState().todo.statusTask && store.getState().todo.statusTask === item.name
    //
    //     if (store.getState().todo.statusTask === true) {
    //         return store.getState().todo.statusTask && ('Выполнено' === item.name);
    //
    //     } else if (store.getState().todo.statusTask === false) {
    //         return store.getState().todo.statusTask && ('Не выполнено' === item.name);
    //
    //     } else if (store.getState().todo.statusTask === null) {
    //         return store.getState().todo.statusTask && ('Любой статус' === item.name);
    //     }
    // }

    // const matchingFilterStatus = [
    //     {
    //         // id: 1,
    //         "Любой статус": null
    //     },
    //     {
    //         // id: 2,
    //         "Не выполнено": false
    //     },
    //     {
    //         // id: 3,
    //         "Выполнено": true
    //     }
    // ]

    const matchingFilterStatus = {
            "Любой статус": null,
            "Не выполнено": false,
            "Выполнено": true
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
                            selected={store.getState().todo.sortNameTask && store.getState().todo.sortNameTask === item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingCategory}>
                {listCategoriesForFilter.map((item) => (
                    <option key={item.id}
                            selected={store.getState().todo.categoryTask && store.getState().todo.categoryTask === item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <select className="table-filters__sorting"
                    onChange={handleSortingStatus}>
                {selectSortingStatus.map((item) => (
                    <option key={item.id}
                            // selected={store.getState().todo.statusTask && store.getState().todo.statusTask === item.name}

                            // selected={store.getState().todo.statusTask && store.getState().todo.statusTask === matchingFilterStatus.map((item) => (store.getState().todo.statusTask in item))}
                            // selected={store.getState().todo.statusTask === matchingFilterStatus.get(item.name)}

                    >
                        {item.name}
                    </option>
                ))}

            </select>
        </div>
    );
}

export default TableFilters;
