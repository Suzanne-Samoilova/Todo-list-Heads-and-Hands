import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerSetToDo} from "./reducerSetToDo";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: reducerAuth,
    setTodo: reducerSetToDo
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
