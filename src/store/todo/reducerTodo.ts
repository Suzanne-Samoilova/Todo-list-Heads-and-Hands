import {
    CLEAR_SELECTED_TASKS,
    DECREMENT_PAGE, FILTER_CATEGORY,
    FILTER_NAME, FILTER_STATUS,
    GET_TODO,
    INCREMENT_PAGE,
    SELECT_TASK, SORTING_NAME,
    UNSELECT_TASK
} from "./const";


const defaultState = {
    todo: [],
    selectedTasks: [],
    currentPage: 1,

    nameTask: null,
    sortNameTask: null,
    statusTask: null,
    categoryTask: null
}


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
