import {TRootState} from "../../index";


const defaultState = {
    todo: [],
    selectedTasks: [],
    currentPage: 1,

    nameTask: null,
    sortNameTask: null,
    statusTask: null,
    categoryTask: null
}


const GET_TODO = "GET_TODO";
const SELECT_TASK = "SELECT_TASK";
const UNSELECT_TASK = "UNSELECT_TASK";
const CLEAR_SELECTED_TASKS = "CLEAR_SELECTED_TASKS";

const INCREMENT_PAGE = "INCREMENT_PAGE";
const DECREMENT_PAGE = "DECREMENT_PAGE";

const FILTER_NAME = "FILTER_NAME";
const SORTING_NAME = "SORTING_NAME";
const FILTER_CATEGORY = "FILTER_CATEGORY";
const FILTER_STATUS = "FILTER_STATUS";


export const reducerTodo = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case GET_TODO:
            return {...state,
                todo: action.payload.todo
            }

        case SELECT_TASK:
            return {...state,
                selectedTasks: [...state.selectedTasks, action.payload.id]
            }

        case CLEAR_SELECTED_TASKS:
            return {...state,
                selectedTasks: []
            }

        case UNSELECT_TASK:
            return {...state,
                selectedTasks: state.selectedTasks.filter((id: number) => action.payload.id !== id)
            }

        case INCREMENT_PAGE:
            return {...state,
                currentPage: state.currentPage+1
            }

        case DECREMENT_PAGE:
            return {...state,
                currentPage: state.currentPage-1
            }

        case FILTER_NAME:
            return {...state,
                nameTask: action.payload.nameTask
            }

        case SORTING_NAME:
            return {...state,
                sortNameTask: action.payload.sortNameTask
            }

        case FILTER_CATEGORY:
            return {...state,
                categoryTask: action.payload.categoryTask
            }

        case FILTER_STATUS:
            return {...state,
                statusTask: action.payload.statusTask
            }

        default:
            return state
    }
}


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


export const selectorTodoState = (state: TRootState) => state.todo;
