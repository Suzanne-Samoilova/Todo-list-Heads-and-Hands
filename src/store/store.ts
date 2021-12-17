import { createStore, combineReducers} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerTaskDone} from "./reducerTaskDone";

const rootReducer = combineReducers({
    auth: reducerAuth,
    taskDone: reducerTaskDone

})

const store = createStore(rootReducer)

export default store;
