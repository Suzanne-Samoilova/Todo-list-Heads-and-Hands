import {combineReducers} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerTodo} from "./reducerTodo";
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    auth: reducerAuth,
    todo: reducerTodo
})

export default createRootReducer;