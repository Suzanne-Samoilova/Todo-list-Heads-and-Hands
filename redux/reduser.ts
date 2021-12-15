// import {createStore, combineReducers, applyMiddleware} from "redux";
// import {composeWithDevTools} from "@reduxjs/toolkit/dist/devtoolsExtension";
// import thunk from "redux-thunk";
// import {Provider} from "react-redux";
//
// export const defaultState = {
//     cash: 0,
// }
//
// export const reduser = (state = defaultState, action) => {
//     switch (action.type) {
//         case "ADD_CASH":
//             return {...state, cash: state.cash + action.payload}
//         case "GET_CASH":
//             return {...state, cash: state.cash - action.payload}
//         default:
//             return state
//     }
// };