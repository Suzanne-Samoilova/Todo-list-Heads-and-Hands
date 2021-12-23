import axios from "axios";
import {getTodoAction} from "../store/reducerTodo";
import store from "../store/store";


// запрос из Todo
// асинхронная функция
export const getTodo = () => {
    return function (dispatch: any) {
        const userId = store.getState().auth.userId;
        axios.get(`http://localhost:3001/todo?user_id=${userId}`)
            .then(resp => {
                // console.log(resp.data, 'ТЕСТ асинхронного запроса из ТУДУ');
                dispatch(getTodoAction({todo: resp.data}));
            })
            .catch(error =>
                console.log('error:', error))
    }
}
