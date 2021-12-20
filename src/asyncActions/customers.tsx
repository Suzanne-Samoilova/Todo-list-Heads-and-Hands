import axios from "axios";
import {setTaskStatusAction} from "../store/reducerSetToDo";


// запрос из Todo
// асинхронная функция
export const setTodo = () => {
    return function (dispatch: any) {
        axios.get(`http://localhost:3001/todo/`)
            .then(resp => {
                console.log(resp.data, 'ТЕСТ асинхронного запроса из ТУДУ');
                dispatch({
                    type: "set_todo",
                    payload: {
                        todo: resp.data,
                    }})
            })
            .catch(error =>
                console.log('error:', error))
    }
}

// отослать статус таски из Task
// асинхронная функция
export const setTaskStatusGalochka = (status: boolean, taskId: number) => {
    return function (dispatch: any) {
        axios.patch(`http://localhost:3001/todo/${taskId}`, {"status": status})
            .then(resp => {
                dispatch(setTaskStatusAction({id: taskId, status: status}))
            })
            .catch(error =>
                console.log('error:', error))
    }
}

// для удаления таски из Task
// асинхронная функция
export const deleteTask = (taskId: number) => {
    return function (dispatch: any) {
        axios.delete(`http://localhost:3001/todo/${taskId}`)
            .then(resp => {
                dispatch({
                    type: "delete_task",
                    payload: {
                        id: taskId
                    }})
            })
            .catch(error =>
                console.log('error:', error))
    }
}