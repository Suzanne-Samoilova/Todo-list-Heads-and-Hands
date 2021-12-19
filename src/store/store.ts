import { createStore, combineReducers} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerSetToDo} from "./reducerSetToDo";

const rootReducer = combineReducers({
    auth: reducerAuth,
    setTodo: reducerSetToDo
})

const store = createStore(rootReducer)

export default store;
