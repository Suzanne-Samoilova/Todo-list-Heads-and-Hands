import {
    CLEAR_SELECTED_TASKS,
    DECREMENT_PAGE, FILTER_CATEGORY,
    FILTER_NAME, FILTER_STATUS,
    GET_TODO,
    INCREMENT_PAGE,
    SELECT_TASK, SORTING_NAME,
    UNSELECT_TASK
} from "./const";


export const getTodoAction = (payload: any) => ({type: GET_TODO, payload});
export const selectTaskAction = (payload: any) => ({type: SELECT_TASK, payload});
export const unselectTaskAction = (payload: any) => ({type: UNSELECT_TASK, payload});
export const clearSelectedTasksAction = () => ({type: CLEAR_SELECTED_TASKS});

export const incrementPageAction = () => ({type: INCREMENT_PAGE});
export const decrementPageAction = () => ({type: DECREMENT_PAGE});

export const filterNameTaskAction = (payload: any) => ({type: FILTER_NAME, payload});
export const sortingNameTaskAction = (payload: any) => ({type: SORTING_NAME, payload});
export const filterCategoryTaskAction = (payload: any) => ({type: FILTER_CATEGORY, payload});
export const filterStatusTaskAction = (payload: any) => ({type: FILTER_STATUS, payload});
