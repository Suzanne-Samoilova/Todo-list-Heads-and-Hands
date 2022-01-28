import {CLEAR_PROFILE, GET_PROFILE} from "./const";

export const getProfileAction = (payload: any) => ({type: GET_PROFILE, payload});
export const clearProfileAction = () => ({type: CLEAR_PROFILE});