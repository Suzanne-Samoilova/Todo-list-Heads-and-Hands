import {
    CLEAR_PROFILE,
    GET_PROFILE,
    SET_EMAIL_ERROR,
    SET_BIRTHDAY_ERROR,
    CLEAR_EMAIL_ERROR,
    CLEAR_BIRTHDAY_ERROR
} from "./const";

export const getProfileAction = (payload: any) => ({type: GET_PROFILE, payload});
export const clearProfileAction = () => ({type: CLEAR_PROFILE});
export const setErrorPasswordAction = (payload: any) => ({type: SET_EMAIL_ERROR, payload});
export const setErrorBirthdayAction = (payload: any) => ({type: SET_BIRTHDAY_ERROR, payload});
export const clearErrorEmailAction = () => ({type: CLEAR_EMAIL_ERROR});
export const clearErrorBirthdayAction = () => ({type: CLEAR_BIRTHDAY_ERROR});
