import axios from "axios";
import {push} from "connected-react-router";
import {baseUrl} from "../constants/baseUrl";
import {loginAction} from "../store/reducerAuth";
import {errorIncorrectEmailOrPassword} from "../constants/errorsText";


export const authorization = (email: any, password: any, setAuthErrors: any) => {
    return function (dispatch: any) {
        axios.get(`${baseUrl}/users?email=${email}&password=${password}`)
            .then(resp => {
                if (resp.data.length) {
                    const userName = resp.data[0].name;
                    dispatch(loginAction({
                        userId: resp.data[0].id,
                        userName: resp.data[0].name
                    }));

                    if (userName) {
                        dispatch(push(`/`));
                    } else {
                        dispatch(push(`profile`));
                    }

                } else {
                    const errAuth = [];
                    errAuth.push(errorIncorrectEmailOrPassword);
                    setAuthErrors(errAuth);
                }
            })
            .catch(error =>
                console.log('error:', error)
            );
    }
}
