import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "@reduxjs/toolkit/dist/devtoolsExtension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
// import {store} from "../redux/store";


ReactDOM.render(
  <React.StrictMode>

      {/*<Provider store = {store}>*/}
      {/*  <App />*/}
      {/*</Provider>*/}

      <App />

  </React.StrictMode>,
  document.getElementById('root')
);
