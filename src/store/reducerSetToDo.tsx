const defaultState = {
    todo: [],
    selectedTasks: []
}

// капслоком
const SET_TODO = "SET_TODO";
const SET_TASK_STATUS = "SET_TASK_STATUS";
const DELETE_TASK = "DELETE_TASK";
const SELECT_TASK = "SELECT_TASK";
const UNSELECT_TASK = "UNSELECT_TASK";
const DELETE_SELECTED_TASK = "DELETE_SELECTED_TASK"

export const reducerSetToDo = (state:any = defaultState, action: any) => {

    switch (action.type) {
        case SELECT_TASK:
            // нажал галочку
            // галочка одной таски
            return {...state,
                selectedTasks: [...state.selectedTasks, action.payload.id]
            }

            // отжал галочку
        case UNSELECT_TASK:
            return {...state,
                selectedTasks: state.selectedTasks.filter((id: number) => action.payload.id !== id)
            }

        case SET_TODO:
            // console.log(action.payload.todo, 'todo ПОЛУЧЕН')
            return {...state,
                todo: action.payload.todo
            }

        case SET_TASK_STATUS:
            // console.log(newState, action, 'reducerSetToDo Before')
            return {...state,
                todo : state.todo.map((todoItem:any) => {
                    todoItem.status =
                        action.payload.id === todoItem.id
                        ? action.payload.status
                        : todoItem.status
                    return todoItem
                })
            }

        case DELETE_SELECTED_TASK:
            return {...state,
                todo: {...state}.todo.filter((todoItem:any) => {
                        // вернет оставшиеся
                        return !state.selectedTasks.includes(todoItem.id)
                    }
                ),
                selectedTasks: []
            }

        case DELETE_TASK:
            return {...state,
                todo: state.todo.filter((todoItem: any) => action.payload.id !== todoItem.id)
            }

        default:
            return state
    }
}

// тест thank
export const setTaskStatusAction = (payload: any) => ({type: SET_TASK_STATUS, payload});
export const deleteTaskAction = (payload: any) => ({type: DELETE_TASK, payload});
export const selectTaskAction = (payload: any) => ({type: SELECT_TASK, payload});
export const unselectTaskAction = (payload: any) => ({type: UNSELECT_TASK, payload});
export const deleteSelectedTaskAction = () => ({type: DELETE_SELECTED_TASK});
