import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducerAuth} from "./reducerAuth";
import {reducerTodo} from "./reducerTodo";
import {reducerDetailPage} from "./reducerDetailPage";

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    auth: reducerAuth,
    todo: reducerTodo,
    detail: reducerDetailPage
});

export default createRootReducer;