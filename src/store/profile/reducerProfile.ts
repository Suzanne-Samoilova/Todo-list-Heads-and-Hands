import {
    GET_PROFILE,
    CLEAR_PROFILE,
    SET_EMAIL_ERROR,
    CLEAR_EMAIL_ERROR,
    SET_BIRTHDAY_ERROR,
    CLEAR_BIRTHDAY_ERROR, SET_EXISTS_EMAIL_ERROR, CLEAR_EXISTS_EMAIL_ERROR
} from "./const";


const defaultState = {
    email: null,
    password: null,
    name: null,
    date_of_birth: null,
    city: null,

    errorEmail: null,
    errorBirthday: null,
    errorExistsEmail: null
}


export const reducerProfile = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case GET_PROFILE:
            return {...state,
                email: action.payload.email,
                password: action.payload.password,
                name: action.payload.name,
                date_of_birth: action.payload.date_of_birth,
                city: action.payload.city
            }

        case CLEAR_PROFILE:
            return {...state,
                email: null,
                password: null,
                name: null,
                date_of_birth: null,
                city: null
            }

        case SET_EMAIL_ERROR:
            return {...state,
                errorEmail: action.payload.error
            }

        case CLEAR_EMAIL_ERROR:
            return {...state,
                errorEmail: null
            }

        case SET_BIRTHDAY_ERROR:
            return {...state,
                errorBirthday: action.payload.error
            }

        case CLEAR_BIRTHDAY_ERROR:
            return {...state,
                errorBirthday: null
            }

        case SET_EXISTS_EMAIL_ERROR:
            return {...state,
                errorExistsEmail: action.payload.error
            }

        case CLEAR_EXISTS_EMAIL_ERROR:
            return {...state,
                errorExistsEmail: null
            }

        default:
            return state
    }
}
