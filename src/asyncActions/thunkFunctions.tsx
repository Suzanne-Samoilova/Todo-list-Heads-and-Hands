import axios from "axios";
import {clearSelectedTasksAction, getTodoAction} from "../store/reducerTodo";
import store from "../store/configureStore";


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


// удаление нескольких Tasks
// асинхронная функция
export const deleteMultipleTask = () => {
    return function (dispatch: any) {
        let promises = store.getState().todo.selectedTasks.map(
            (taskId:number) => {return axios.delete(`http://localhost:3001/todo/${taskId}`)}
        )
        Promise.all(promises).then(resp => {
            dispatch(clearSelectedTasksAction());
            dispatch(getTodo());
        })
    }
}
