import React from "react";
import {useDispatch} from "react-redux";
import {
    filterNameTaskAction,
    sortingNameTaskAction,
    filterCategoryTaskAction,
    filterStatusTaskAction,
} from "../store/reducerTodo";
import {filtersTasks} from "../asyncActions/thunkFunctions";
import store from "../store/configureStore";
import {listCategoriesForFilter} from "../utils/listCategoriesForFilter";
// import {selectSortingName} from "../utils/listSelectsForFilter";


function TableFilters() {
    const dispatch = useDispatch();

    // Чтобы были актуальные селекты в строке фильтров
    // const [name, setName] = React.useState("");
    // const [sortingName, setSortingName] = React.useState("Любой порядок");
    // const [category, setCategory] = React.useState("Любая категория");
    // const [status, setStatus] = React.useState("Любой статус");

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
        if (sortNameTask === 'По возрастанию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'ascending'}));
        } else if (sortNameTask === 'По убыванию') {
            dispatch(sortingNameTaskAction({sortNameTask: 'descending'}));
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


    return (
        <div className="table-filters">
            <input className="table-filters__input-name"
                   placeholder="Введите название"
                   onChange={handleFilterName}/>

            <select className="table-filters__sorting"
                    onChange={handleSortingName}>
                <option>Любой порядок</option>
                <option>По возрастанию</option>
                <option>По убыванию</option>

                {/*{selectSortingName.map((item) => (*/}
                {/*    <option key={item.id}*/}
                {/*            selected={store.getState().todo.sortNameTask && store.getState().todo.sortNameTask === item.name}>*/}
                {/*        {item.name}*/}
                {/*    </option>*/}
                {/*))}*/}
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
                <option>Любой статус</option>
                <option>Выполнено</option>
                <option>Не выполнено</option>
            </select>
        </div>
    );
}

export default TableFilters;
