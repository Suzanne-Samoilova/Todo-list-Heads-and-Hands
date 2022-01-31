import {CLEAR_AUTH_ERROR, LOGIN, LOGOUT, SET_AUTH_ERROR} from "./const";


const defaultState = {
    isAuthorized: false,
    userId: null,
    userName: null,
    error: null
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

        case SET_AUTH_ERROR:
            return {...state,
                error: action.payload.error
            }

        case CLEAR_AUTH_ERROR:
            return {...state,
                error: null
            }

        default:
            return state
    }
}
