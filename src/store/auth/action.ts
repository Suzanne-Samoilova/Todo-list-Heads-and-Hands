import {LOGIN, LOGOUT} from "./const";

export const loginAction = (payload: any) => ({type: LOGIN, payload});
export const logoutAction = (payload: any) => ({type: LOGOUT, payload});