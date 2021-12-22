import axios from "axios";
import {deleteSelectedTaskAction, deleteTaskAction, setTaskStatusAction} from "../store/reducerSetToDo";


// запрос из Todo
// асинхронная функция
export const setTodo = () => {
    return function (dispatch: any) {
        axios.get(`http://localhost:3001/todo/`)
            .then(resp => {
                console.log(resp.data, 'ТЕСТ асинхронного запроса из ТУДУ');
                dispatch({
                    type: "SET_TODO",
                    payload: {
                        todo: resp.data,
                    }})
            })
            .catch(error =>
                console.log('error:', error))
    }
}

// отослать статус таски из Task
export const setTaskStatusGalochka = (taskId: number, status: boolean) => {
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
export const deleteTask = (taskId: number) => {
    return function (dispatch: any) {
        axios.delete(`http://localhost:3001/todo/${taskId}`)
            .then(resp => {
                dispatch(deleteTaskAction({id: taskId}))
            })
            .catch(error =>
                console.log('error:', error))
    }
}

export const deleteSelectedTask = () => {
    return function (dispatch: any, getState: any) {
        let promises = getState().setTodo.selectedTasks.map(
            (taskId:number)=> {return axios.delete(`http://localhost:3001/todo/${taskId}`)}
        )
        Promise.all(promises).then(resp => {
            dispatch(deleteSelectedTaskAction())
        })
    }
}