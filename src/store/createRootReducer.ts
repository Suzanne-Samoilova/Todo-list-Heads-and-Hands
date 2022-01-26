import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {reducerAuth} from "./auth/reducerAuth";
import {reducerTodo} from "./todo/reducerTodo";
import {reducerDetailPage} from "./detailPage/reducerDetailPage";
import {reducerProfile} from "./profile/reducerProfile";

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    auth: reducerAuth,
    todo: reducerTodo,
    detail: reducerDetailPage,
    profile: reducerProfile
});

export default createRootReducer;