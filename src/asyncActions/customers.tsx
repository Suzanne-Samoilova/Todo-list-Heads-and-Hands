import axios from "axios";
import {testThank} from "../store/reducerSetToDo";

export const axiosCustomers = () => {
    return function (dispatch: any) {
        axios.get(`http://localhost:3001/todo/`)
            .then(resp => {
                dispatch(testThank);
                console.log(resp, 'test thank');

            })
            .catch(error =>
                console.log('error thank:', error))
    }
}