import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/App';
import { Provider } from "react-redux";
import createHistory from 'history/createBrowserHistory'
import store from "./store/store";


export const history = createHistory();
export type TRootState = ReturnType<typeof store.getState>

ReactDOM.render(
    <Provider store = {store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);
