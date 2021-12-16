import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import createHistory from 'history/createBrowserHistory'

export const history = createHistory();

const defaultState = {
    isAuthorized: false,
    userId: undefined,
    todo: []
}

const reducer = (state:any = defaultState, action: any) => {
    switch (action.type) {
        case "login":
            console.log(action.payload.userId, state)
            return {...state,
                isAuthorized: true,
                userId: action.payload.userId,
                // todo: action.payload.todo
            }

        case "logout":
            console.log(action.payload.userId, state)
            return {...state,
                isAuthorized: false,
                userId: action.payload.userId,
                todo: action.payload.todo}

        default:
            return state
    }
}

const store = createStore(reducer)

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
