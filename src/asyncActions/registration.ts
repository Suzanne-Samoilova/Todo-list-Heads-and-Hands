import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import {errorEmailExists} from "../constants/errorsText";
import {push} from "connected-react-router";
import {setErrorExistsEmailAction} from "../store/profile/action";


export const checkEmail = (email: any, password: any) => {
    return function (dispatch: any) {
        axios.get(`${baseUrl}/users?email=${email}`)
            .then(resp => {
                if (resp.data.length) {
                    dispatch(setErrorExistsEmailAction({error: errorEmailExists}));
                } else {
                    dispatch(addNewProfile(email, password));
                }
            })
            .catch(error =>
                console.log('error:', error)
            );
    }
}


export const addNewProfile = (email: any, password: any) => {
    return function (dispatch: any) {
        axios.post(`${baseUrl}/users/`,
            {
                "email": email,
                "password": password,
                "name": "",
                "date_of_birth": "01.01.2001",
                "city": ""
            })
            .then(resp => {
                dispatch(push(`auth`));
            })
            .catch(error =>
                console.log('error:', error));
    }
}
