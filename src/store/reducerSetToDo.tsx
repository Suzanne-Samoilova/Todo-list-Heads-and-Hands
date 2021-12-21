const defaultState = {
    todo: [],
    selectedTasks: []
}

// капслоком
const set_todo = "set_todo";
const set_task_status = "set_task_status";
const delete_task = "delete_task";
const select_task = "select_task";
const unselect_task = "unselect_task";
const delete_selected_task = "delete_selected_task"

export const reducerSetToDo = (state:any = defaultState, action: any) => {

    switch (action.type) {
        case select_task:
            // нажал галочку
            // галочка одной таски
            return {...state,
                selectedTasks: [...state.selectedTasks, action.payload.id]
            }

            // отжал галочку
        case unselect_task:
            return {...state,
                selectedTasks: state.selectedTasks.filter((id: number) => action.payload.id !== id)
            }

        case set_todo:
            // console.log(action.payload.todo, 'todo ПОЛУЧЕН')
            return {...state,
                todo: action.payload.todo
            }

        case set_task_status:
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

        case delete_selected_task:
            return {...state,
                todo: {...state}.todo.filter((todoItem:any) => {
                        // вернет оставшиеся
                        return !state.selectedTasks.includes(todoItem.id)
                    }
                ),
                selectedTasks: []
            }

        case delete_task:
            return {...state,
                todo: state.todo.filter((todoItem: any) => action.payload.id !== todoItem.id)
            }

        default:
            return state
    }
}

// тест thank
export const setTaskStatusAction = (payload: any) => ({type: set_task_status, payload});
export const deleteTaskAction = (payload: any) => ({type: delete_task, payload});
export const selectTaskAction = (payload: any) => ({type: select_task, payload});
export const unselectTaskAction = (payload: any) => ({type: unselect_task, payload});
export const deleteSelectedTaskAction = () => ({type: delete_selected_task});
