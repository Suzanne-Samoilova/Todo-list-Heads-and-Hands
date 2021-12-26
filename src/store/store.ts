import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerTodo} from "./reducerTodo";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    auth: reducerAuth,
    todo: reducerTodo,
    routing: routerReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
