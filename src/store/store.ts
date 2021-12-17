import { createStore, combineReducers} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerTaskDone} from "./reducerTaskDone";
import {reducerGetToDo} from "./reducerGetToDo";

const rootReducer = combineReducers({
    auth: reducerAuth,
    taskDone: reducerTaskDone,
    getTodo: reducerGetToDo

})

const store = createStore(rootReducer)

export default store;
