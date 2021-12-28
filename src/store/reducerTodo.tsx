const defaultState = {
    todo: [],
    selectedTasks: [],
    currentPage: 1
}

const GET_TODO = "GET_TODO";
const SELECT_TASK = "SELECT_TASK";
const UNSELECT_TASK = "UNSELECT_TASK";
const CLEAR_SELECTED_TASKS = "CLEAR_SELECTED_TASKS";

const INCREMENT_PAGE = "INCREMENT_PAGE";
const DECREMENT_PAGE = "DECREMENT_PAGE";

export const reducerTodo = (state:any = defaultState, action: any) => {

    switch (action.type) {
        case SELECT_TASK:
            // нажал галочку одной таски
            return {...state,
                selectedTasks: [...state.selectedTasks, action.payload.id]
            }

        case CLEAR_SELECTED_TASKS:
            return {...state,
                selectedTasks: []
            }

            // отжал галочку
            // это норм, потому что не храним на сервере
        case UNSELECT_TASK:
            return {...state,
                selectedTasks: state.selectedTasks.filter((id: number) => action.payload.id !== id)
            }

        case GET_TODO:
            // console.log(action.payload.todo, 'todo ПОЛУЧЕН')
            return {...state,
                todo: action.payload.todo
            }


        case INCREMENT_PAGE:
            return {...state,
                currentPage: state.currentPage+1
            }

        case DECREMENT_PAGE:
            return {...state,
                currentPage: state.currentPage-1
            }

        default:
            return state
    }
}

// тест thank
export const getTodoAction = (payload: any) => ({type: GET_TODO, payload});
export const selectTaskAction = (payload: any) => ({type: SELECT_TASK, payload});
export const unselectTaskAction = (payload: any) => ({type: UNSELECT_TASK, payload});
export const clearSelectedTasksAction = () => ({type: CLEAR_SELECTED_TASKS});
export const incrementPageAction = () => ({type: INCREMENT_PAGE});
export const decrementPageAction = () => ({type: DECREMENT_PAGE});
