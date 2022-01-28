import {LOGIN, LOGOUT} from "./const";


const defaultState = {
    isAuthorized: false,
    userId: null,
    userName: null,
}


export const reducerAuth = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {...state,
                isAuthorized: true,
                userId: action.payload.userId,
                userName: action.payload.userName
            }

        case LOGOUT:
            return {...state,
                isAuthorized: false,
                userId: null
            }

        default:
            return state
    }
}
