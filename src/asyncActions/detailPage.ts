import axios from "axios";
import {baseUrl} from "../constants/baseUrl";
import {getDetailTaskAction} from "../store/reducerDetailPage";


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
