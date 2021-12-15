import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "@reduxjs/toolkit/dist/devtoolsExtension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";