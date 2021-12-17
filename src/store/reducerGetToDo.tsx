const defaultState = {
    todo: []
}

export const reducerGetToDo = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case "get_todo":
            console.log(action.payload.todo, state)
            return {...state,
                todo: action.payload.todo
            }
        default:
            return state
    }
}
