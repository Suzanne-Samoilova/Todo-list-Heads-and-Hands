import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerTodo} from "./reducerTodo";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: reducerAuth,
    todo: reducerTodo
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
