const defaultState = {
    email: null,
    password: null,
    name: null,
    date_of_birth: null,
    city: null
}

const GET_PROFILE = "GET_PROFILE";
const CLEAR_PROFILE = "CLEAR_PROFILE";

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

        default:
            return state
    }
}

export const getProfileAction = (payload: any) => ({type: GET_PROFILE, payload});
export const clearProfileAction = () => ({type: CLEAR_PROFILE});