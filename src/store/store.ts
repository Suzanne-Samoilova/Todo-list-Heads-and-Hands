import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducerAuth} from "./reducerAuth";
import {reducerSetToDo} from "./reducerSetToDo";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth: reducerAuth,
    setTodo: reducerSetToDo
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));



// // тест thunk
// const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware({
//             thunk: {
//                 extraArgument: myCustomApiService
//             }
//         })
// })












export default store;
