import axios from "axios";
import {clearSelectedTasksAction, filterStatusTaskAction, getTodoAction} from "../store/reducerTodo";
import store from "../store/configureStore";
import {LIMIT_PAGINATE_TODO_LIST} from "../constants";


// запрос из Todo
// асинхронная функция
export const getTodo = () => {
    return function (dispatch: any) {
        const userId = store.getState().auth.userId;
        const currentPage = store.getState().todo.currentPage;

        axios.get(`http://localhost:3001/todo?user_id=${userId}&_page=${currentPage}&_limit=${LIMIT_PAGINATE_TODO_LIST}`)
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

// фильтр тасков по статусу
export const filterStatus = () => {
    return function (dispatch: any) {
        const userId = store.getState().auth.userId;
        const statusTask = store.getState().todo.statusTask;
        // dispatch(filterStatusTaskAction({statusTask: true}));

        axios.get(`http://localhost:3001/todo?user_id=${userId}&status=${statusTask}&_limit=${LIMIT_PAGINATE_TODO_LIST}`)
            .then(resp => {
                console.log(resp.data, 'ТЕСТ статуса');

                // dispatch(filterStatusTaskAction({status: resp.data.status}));
            })
            .catch(error =>
                console.log('error:', error))
    }
}