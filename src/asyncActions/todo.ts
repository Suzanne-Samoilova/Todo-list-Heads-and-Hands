import {baseUrl} from "../constants/baseUrl";
import {LIMIT_PAGINATE_TODO_LIST} from "../constants/constants";
import axios from "axios";
import {clearSelectedTasksAction, getTodoAction} from "../store/todo/reducerTodo";
import {getDetailTask} from "./detailPage";
import {filterAscending, filterDescending} from "../constants/filtersText";


export const filteringTasks = () => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        const { currentPage,
            nameTask,
            sortNameTask,
            categoryTask,
            statusTask } = getState().todo;

        const statusArchive = false;

        let url = `${baseUrl}/todo?user_id=${userId}&_page=${currentPage}&_limit=${LIMIT_PAGINATE_TODO_LIST}&archive=${statusArchive}`;

        if (sortNameTask === filterAscending) {
            url += `&_sort=name&_order=asc`;
        } else if (sortNameTask === filterDescending) {
            url +=`&_sort=name&_order=desc`;
        }

        if (nameTask !== null) url += `&name=${nameTask}`;
        if (categoryTask !== null) url += `&category=${categoryTask}`;
        if (statusTask !== null) url += `&status=${statusTask}`;

        axios.get(url)
            .then(resp => {
                dispatch(getTodoAction({todo: resp.data}));
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const createTask = (userId: any, category: any, name: any, description: any, dateNow: any, date_deadline: any) => {
    return function (dispatch: any) {
        axios.post(`${baseUrl}/todo/`,
            {
                "category": category,
                "name": name,
                "description": description,
                "date_create": dateNow,
                "date_change": dateNow,
                "date_deadline": date_deadline,
                "user_id": userId,
                "status": false,
                "archive": false
            })
            .then(() => {
                dispatch(filteringTasks());
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const deleteMultipleTask = () => {
    return function (dispatch: any, getState: any) {
        const promises = getState().todo.selectedTasks.map(
            (taskId:number) => {
                return axios.delete(`${baseUrl}/todo/${taskId}`)
            }
        );

        Promise.all(promises).then(resp => {
            dispatch(clearSelectedTasksAction());
        });
    }
}


export const changeStatusTask = (taskId: any, taskStatus: any) => {
    return function (dispatch: any) {
        axios.patch(`${baseUrl}/todo/${taskId}`, {"status": !taskStatus})
            .then(resp => {
                dispatch(filteringTasks());
                dispatch(getDetailTask(taskId));
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const changeStatusArchive = (id: any, statusArchive: boolean) => {
    return function (dispatch: any) {
        axios.patch(`${baseUrl}/todo/${id}`, {"archive": statusArchive})
            .then(resp => {
                dispatch(filteringTasks());
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const changeTask = (taskId: any, category: any, name: any, description: any, dateNow: any, dateDeadline: any) => {
    return function (dispatch: any) {
        axios.patch(`${baseUrl}/todo/${taskId}`, {
            "category": category,
            "name": name,
            "description": description,
            "date_change": dateNow,
            "date_deadline": dateDeadline
        })
            .then(resp => {
                dispatch(filteringTasks());
                dispatch(getDetailTask(taskId));
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const deleteTask = (taskId: any) => {
    return function (dispatch: any) {
        axios.delete(`${baseUrl}/todo/${taskId}`)
            .then(resp => {
                dispatch(filteringTasks());
            })
            .catch(error =>
                console.log('error:', error));
    }
}
