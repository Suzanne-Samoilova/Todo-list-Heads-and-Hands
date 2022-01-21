import axios from "axios";
import {push} from "connected-react-router";

import {clearSelectedTasksAction, getTodoAction} from "../store/reducerTodo";
import {getDetailTaskAction} from "../store/reducerDetailPage";
import {loginAction} from "../store/reducerAuth";
import {getProfileAction} from "../store/reducerProfile";
import {LIMIT_PAGINATE_TODO_LIST} from "../constants";


export const authorization = (email: any, password: any, setAuthErrors: any) => {
    return function (dispatch: any) {
        axios.get(`http://localhost:3001/users?email=${email}&password=${password}`)
            .then(resp => {
                if (resp.data.length) {
                    const userId = resp.data[0].id;
                    const userName = resp.data[0].name;
                    dispatch(loginAction({userId: userId, userName: userName}));
                    // dispatch(getProfile());
                    if (userName) {
                        dispatch(push(`/`));
                    } else {
                        dispatch(push(`profile`));
                    }

                } else {
                    let errAuth = [];
                    errAuth.push("Email или пароль введены неправильно.")
                    setAuthErrors(errAuth);
                }
            })
            .catch(error =>
                console.log('error:', error)
            );
    }
}


// фильтр туду
export const filtersTasks = () => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        const { currentPage,
            nameTask,
            sortNameTask,
            categoryTask,
            statusTask } = getState().todo;

        // в отображении тасков туду фильтр архива всегда false
        const statusArchive = false;

        let url = `http://localhost:3001/todo?user_id=${userId}&_page=${currentPage}&_limit=${LIMIT_PAGINATE_TODO_LIST}&archive=${statusArchive}`;

        if (sortNameTask === 'По возрастанию') {
            url = url + `&_sort=name&_order=asc`;
        } else if (sortNameTask === 'По убыванию') {
            url = url + `&_sort=name&_order=desc`;
        }

        if (nameTask !== null) url = url + `&name=${nameTask}`;
        if (categoryTask !== null) url = url + `&category=${categoryTask}`;
        if (statusTask !== null) url = url + `&status=${statusTask}`;

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
        axios.post(`http://localhost:3001/todo/`,
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
            .then(resp => {
                dispatch(filtersTasks());
            })
            .catch(error =>
                console.log('error:', error));
    }
}


// удаление нескольких Tasks
export const deleteMultipleTask = () => {
    return function (dispatch: any, getState: any) {
        let promises = getState().todo.selectedTasks.map(
            (taskId:number) => {
                return axios.delete(`http://localhost:3001/todo/${taskId}`)
            }
        );
        Promise.all(promises).then(resp => {
            dispatch(clearSelectedTasksAction());
            dispatch(filtersTasks());
        });
    }
}


export const changeStatusTask = (taskId: any, taskStatus: any) => {
    return function (dispatch: any) {
        axios.patch(`http://localhost:3001/todo/${taskId}`, {"status": !taskStatus})
            .then(resp => {
                dispatch(filtersTasks());
                dispatch(getDetailTask(taskId));
            })
            .catch(error =>
                console.log('error:', error))
    }
}


export const changeStatusArchive = (id: any, statusArchive: boolean) => {
    return function (dispatch: any) {
        axios.patch(`http://localhost:3001/todo/${id}`, {"archive": statusArchive})
            .then(resp => {
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
                dispatch(getDetailTask(taskId));
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
    }
}


export const getProfile = () => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.get(`http://localhost:3001/users/${userId}`)
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
        console.log('Получили данные пользователя');
    }
}


export const changeProfileData = (name: any, dateOfBirth: any, city: any, email: any) => {
    return function (dispatch: any, getState: any) {
        const userId = getState().auth.userId;
        axios.patch(`http://localhost:3001/users/${userId}`, {
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
        axios.patch(`http://localhost:3001/users/${userId}`, { "password": password })
            .then(resp => {
                dispatch(getProfile());
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const getEmail = (email: any, password: any, errs: any[], setProfileErrors: any) => {
    return function (dispatch: any) {
        axios.get(`http://localhost:3001/users?email=${email}`)
            .then(resp => {
                if (resp.data.length) {
                    errs.push("Пользователь с таким email уже существует!");
                    setProfileErrors(errs);
                    // очистить поля ввода
                } else {
                    dispatch(addNewProfile(email, password));
                    dispatch(push(`auth`));
                }
            })
            .catch(error =>
                console.log('error:', error)
            );
    }
}


export const addNewProfile = (email: any, password: any) => {
    return function () {
        axios.post(`http://localhost:3001/users/`,
            {
                "email": email,
                "password": password,
                "name": "",
                "date_of_birth": "01.01.2000",
                "city": ""
            })
            .then(resp => {
                console.log('Пользователь успешно зарегистрирован!');
            })
            .catch(error =>
                console.log('error:', error));
    }
}


export const getUserPasswordRecovery = (email: any, password: any, dateOfBirth: any, setForgotPasswordErrors: any, setDateOfBirthErrors: any) => {
    return function (dispatch: any) {
        axios.get(`http://localhost:3001/users?email=${email}`)
            .then(resp => {
                if (!resp.data[0]) {
                    let errAuth = [];
                    errAuth.push("Пользователь с таким email не найден.");
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
                        let errs = [];
                        errs.push("Неверная дата рождения.");
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
