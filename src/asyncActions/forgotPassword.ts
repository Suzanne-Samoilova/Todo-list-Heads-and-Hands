import axios from "axios";
import {push} from "connected-react-router";

import {baseUrl} from "../constants/baseUrl";
import {errorEmailNotFound, errorIncorrectDateOfBirth} from "../constants/errorsText";
import {changeProfilePassword} from "./profile";
import {loginAction} from "../store/auth/action";
import {getProfileAction} from "../store/profile/action";


export const getUserPasswordRecovery = (email: any, password: any, dateOfBirth: any, setForgotPasswordErrors: any, setDateOfBirthErrors: any) => {
    return function (dispatch: any) {
        axios.get(`${baseUrl}/users?email=${email}`)
            .then(resp => {
                if (!resp.data[0]) {
                    setForgotPasswordErrors(errorEmailNotFound);
                } else {
                    const profile = resp.data[0];
                    dispatch(getProfileAction({
                        email: profile.email,
                        password: profile.password,
                        name: profile.name,
                        date_of_birth: profile.date_of_birth,
                        city: profile.city,
                    }));
                    dispatch(loginAction({userId: profile.id, userName: profile.name}));

                    if (dateOfBirth !== profile.date_of_birth) {
                        setDateOfBirthErrors(errorIncorrectDateOfBirth);
                    } else {
                        dispatch(changeProfilePassword(password));
                        dispatch(push(`auth`));
                    }
                }
            })
            .catch(error =>
                console.log('error:', error)
            );
    }
}
