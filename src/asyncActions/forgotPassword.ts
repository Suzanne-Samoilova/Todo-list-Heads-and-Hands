import axios from "axios";
import {push} from "connected-react-router";

import {loginAction} from "../store/reducerAuth";
import {getProfileAction} from "../store/reducerProfile";
import {baseUrl} from "../constants/baseUrl";
import {errorEmailNotFound, errorIncorrectDateOfBirth} from "../constants/errorsText";
import {changeProfilePassword} from "./profile";


export const getUserPasswordRecovery = (email: any, password: any, dateOfBirth: any, setForgotPasswordErrors: any, setDateOfBirthErrors: any) => {
    return function (dispatch: any) {
        axios.get(`${baseUrl}/users?email=${email}`)
            .then(resp => {
                if (!resp.data[0]) {
                    const errAuth = [];
                    errAuth.push(errorEmailNotFound);
                    setForgotPasswordErrors(errAuth);
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
                        const errs = [];
                        errs.push(errorIncorrectDateOfBirth);
                        setDateOfBirthErrors(errs);
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
