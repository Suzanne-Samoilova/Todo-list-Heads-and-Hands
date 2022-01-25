import axios from "axios";
import {push} from "connected-react-router";

import {clearSelectedTasksAction, getTodoAction} from "../store/reducerTodo";
import {getDetailTaskAction} from "../store/reducerDetailPage";
import {loginAction} from "../store/reducerAuth";
import {getProfileAction} from "../store/reducerProfile";
import {LIMIT_PAGINATE_TODO_LIST} from "../constants/constants";
import {baseUrl} from "../constants/baseUrl";
import {
    errorEmailExists,
    errorEmailNotFound,
    errorIncorrectDateOfBirth,
    errorIncorrectEmailOrPassword
} from "../constants/errorsText";


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

        if (sortNameTask === 'По возрастанию') {
            url += `&_sort=name&_order=asc`;
        } else if (sortNameTask === 'По убыванию') {
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


export const getDetailTask = (taskId: any) => {
    return function (dispatch: any) {
        axios.get(`${baseUrl}/todo/${taskId}`)
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


export const getProfile = () => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.get(`${baseUrl}/users/${userId}`)
            .then(resp => {
                const profile = resp.data;

                dispatch(getProfileAction({
                    email: profile.email,
                    password: profile.password,
                    name: profile.name,
                    date_of_birth: profile.date_of_birth,
                    city: profile.city,
                }));
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const changeProfileData = (name: any, dateOfBirth: any, city: any, email: any) => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.patch(`${baseUrl}/users/${userId}`, {
            "name": name,
            "date_of_birth": dateOfBirth,
            "city": city,
            "email": email,
        })
            .then(resp => {
                dispatch(getProfile());
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const changeProfilePassword = (password: any) => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.patch(`${baseUrl}/users/${userId}`, { "password": password })
            .then(resp => {
                dispatch(getProfile());
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const checkEmail = (email: any, password: any, errs: any[], setProfileErrors: any, setEmail: any, setPassword: any) => {
    return function (dispatch: any) {
        axios.get(`${baseUrl}/users?email=${email}`)
            .then(resp => {
                if (resp.data.length) {
                    errs.push(errorEmailExists);
                    setProfileErrors(errs);
                    setEmail('');
                    setPassword('');
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
