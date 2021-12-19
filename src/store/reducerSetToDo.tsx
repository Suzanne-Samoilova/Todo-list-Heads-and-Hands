const defaultState = {
    todo: []
}

export const reducerSetToDo = (state:any = defaultState, action: any) => {
    let newState = {...state}
    switch (action.type) {
        case "set_todo":
            console.log(action.payload.todo, 'todo ПОЛУЧЕН')
            return {...state,
                todo: action.payload.todo
            }

        case "set_task_status":
            // console.log(newState, action, 'reducerSetToDo Before')
            newState.todo = newState.todo.map(
                (todoItem:any) => {
                    todoItem.status =
                        action.payload.id === todoItem.id
                        ? action.payload.status
                        : todoItem.status
                    return todoItem
                }
            )
            // console.log(newState, action, 'reducerSetToDo After')
            return newState;

        case "delete_task":
            newState.todo = newState.todo.filter(
                (todoItem:any) => {return action.payload.id !== todoItem.id}
            )
            return newState;

        default:
            return state
    }
}
