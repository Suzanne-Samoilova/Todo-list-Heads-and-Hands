// дефолтное состояние присваивается в тот момент, когда пользователь открыл приложение
const defaultState = {
    isAuthorized: false,
    userId: undefined
}

export const reducerAuth = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case "login":
            // console.log(action.payload.userId, state)
            return {...state,
                isAuthorized: true,
                userId: action.payload.userId
            }

        case "logout":
            // console.log(action.payload.userId, state)
            return {...state,
                isAuthorized: false,
                userId: action.payload.userId
            }

        default:
            return state
    }
}
