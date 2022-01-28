import {GET_DETAIL_TASK} from "./const";


const defaultState = {
    id: null,
    category: null,
    name: null,
    description: null,
    date_create: null,
    date_change: null,
    date_deadline: null,
    status: null,
    archive: null
}


export const reducerDetailPage = (state:any = defaultState, action: any) => {
    switch (action.type) {

        case GET_DETAIL_TASK:
            return {...state,
                id: action.payload.id,
                category: action.payload.category,
                name: action.payload.name,
                description: action.payload.description,
                date_create: action.payload.date_create,
                date_change: action.payload.date_change,
                date_deadline: action.payload.date_deadline,
                status: action.payload.status,
                archive: action.payload.archive
            }

        default:
            return state
    }
}
