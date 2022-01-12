import axios from "axios";
import store from "../store/configureStore";
import {clearSelectedTasksAction, getTodoAction} from "../store/reducerTodo";
import {LIMIT_PAGINATE_TODO_LIST} from "../constants";
import {getDetailTaskAction} from "../store/reducerDetailPage";


// запрос из Todo
// асинхронная функция
export const getTodo = () => {
    return function (dispatch: any) {
        const userId = store.getState().auth.userId;
        const currentPage = store.getState().todo.currentPage;

        axios.get(`http://localhost:3001/todo?user_id=${userId}&_page=${currentPage}&_limit=${LIMIT_PAGINATE_TODO_LIST}`)
            .then(resp => {
                dispatch(getTodoAction({todo: resp.data}));
            })
            .catch(error =>
                console.log('error:', error))
    }
}


// удаление нескольких Tasks
export const deleteMultipleTask = () => {
    return function (dispatch: any) {
        let promises = store.getState().todo.selectedTasks.map(
            (taskId:number) => {return axios.delete(`http://localhost:3001/todo/${taskId}`)}
        )
        Promise.all(promises).then(resp => {
            dispatch(clearSelectedTasksAction());
            dispatch(filtersTasks());
        })
    }
}


// фильтр туду
export const filtersTasks = () => {
        const userId = store.getState().auth.userId;
        const currentPage = store.getState().todo.currentPage;

        const nameTask = store.getState().todo.nameTask;
        const sortNameTask = store.getState().todo.sortNameTask;
        const categoryTask = store.getState().todo.categoryTask;
        const statusTask = store.getState().todo.statusTask;
        // в отображении тасков туду фильтр архива всегда false
        const statusArchive = false;

        let url = `http://localhost:3001/todo?user_id=${userId}&_page=${currentPage}&_limit=${LIMIT_PAGINATE_TODO_LIST}&archive=${statusArchive}`;

        if (nameTask !== null) url = url + `&name=${nameTask}`;

        if (sortNameTask === 'По возрастанию') {
            url = url + `&_sort=name&_order=asc`;
        } else if (sortNameTask === 'По убыванию') {
            url = url + `&_sort=name&_order=desc`;
        }

        if (categoryTask !== null) url = url + `&category=${categoryTask}`;

        if (statusTask !== null) url = url + `&status=${statusTask}`;

    return function (dispatch: any) {
        axios.get(url)
            .then(resp => {
                console.log(resp.data, 'ТЕСТ фильтра');
                dispatch(getTodoAction({todo: resp.data}));
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const changeStatusTask = (taskId: any, taskStatus: any) => {
    return function (dispatch: any) {
        axios.patch(`http://localhost:3001/todo/${taskId}`, {"status": !taskStatus})
            .then(resp => {
                dispatch(filtersTasks());
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const changeStatusArchive = (id: any, statusArchive: boolean) => {
    return function (dispatch: any) {
        axios.patch(`http://localhost:3001/todo/${id}`, {"archive": statusArchive})
            .then(resp => {
                console.log('сработал запрос архив');
                dispatch(filtersTasks());
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const getDetailTask = (taskId: any) => {
    return function (dispatch: any) {
        axios.get(`http://localhost:3001/todo/${taskId}`)
            .then(resp => {
                dispatch(getDetailTaskAction({
                    id: resp.data.id,
                    category: resp.data.category,
                    name: resp.data.name,
                    description: resp.data.description,
                    date_create: resp.data.date_create,
                    date_change: resp.data.date_change,
                    date_deadline: resp.data.date_deadline,
                    status: resp.data.status,
                    archive: resp.data.archive
                }));
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const changeTask = (taskId: any, category: any, name: any, description: any, dateNow: any, dateDeadline: any) => {
    return function (dispatch: any) {
        axios.patch(`http://localhost:3001/todo/${taskId}`, {
            "category": category,
            "name": name,
            "description": description,
            "date_change": dateNow,
            "date_deadline": dateDeadline
        })
            .then(resp => {
                dispatch(filtersTasks());
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const deleteTask = (taskId: any) => {
    return function (dispatch: any) {
        axios.delete(`http://localhost:3001/todo/${taskId}`)
            .then(resp => {
                dispatch(filtersTasks());
            })
            .catch(error =>
                console.log('error:', error));
        console.log('SUBMIT Удалить сработал!');
    }
}

