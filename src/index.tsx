import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from "react-redux";
import store, { history } from "./store/configureStore";
import {ConnectedRouter} from "connected-react-router";

export type TRootState = ReturnType<typeof store.getState>


ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);
