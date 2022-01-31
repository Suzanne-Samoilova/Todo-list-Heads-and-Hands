import {CLEAR_AUTH_ERROR, LOGIN, LOGOUT, SET_AUTH_ERROR} from "./const";

export const loginAction = (payload: any) => ({type: LOGIN, payload});
export const logoutAction = (payload: any) => ({type: LOGOUT, payload});
export const setErrorAuthAction = (payload: any) => ({type: SET_AUTH_ERROR, payload});
export const clearErrorAuthAction = () => ({type: CLEAR_AUTH_ERROR});