const defaultState = {
    isAuthorized: false,
    userId: undefined,
    todo: []
}

export const reducerAuth = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case "login":
            console.log(action.payload.userId, state)
            return {...state,
                isAuthorized: true,
                userId: action.payload.userId,
                todo: action.payload.todo
            }

        case "logout":
            console.log(action.payload.userId, state)
            return {...state,
                isAuthorized: false,
                userId: action.payload.userId,
                todo: action.payload.todo
            }

        default:
            return state
    }
}
