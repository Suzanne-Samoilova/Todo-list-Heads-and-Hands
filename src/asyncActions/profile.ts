import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import {getProfileAction} from "../store/profile/reducerProfile";


export const getProfile = () => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.get(`${baseUrl}/users/${userId}`)
            .then(resp => {
                const profile = resp.data;

                dispatch(getProfileAction({
                    email: profile.email,
                    password: profile.password,
                    name: profile.name,
                    date_of_birth: profile.date_of_birth,
                    city: profile.city,
                }));
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const changeProfileData = (name: any, dateOfBirth: any, city: any, email: any) => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.patch(`${baseUrl}/users/${userId}`, {
            "name": name,
            "date_of_birth": dateOfBirth,
            "city": city,
            "email": email,
        })
            .then(resp => {
                dispatch(getProfile());
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const changeProfilePassword = (password: any) => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.patch(`${baseUrl}/users/${userId}`, { "password": password })
            .then(resp => {
                dispatch(getProfile());
            })
            .catch(error =>
                console.log('error:', error));
    }
}
