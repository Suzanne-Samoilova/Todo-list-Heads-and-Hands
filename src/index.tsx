import React from 'react';
import ReactDOM from 'react-dom';
import store, { history } from "./store/configureStore";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./pages/App";
import './index.css';


export type TRootState = ReturnType<typeof store.getState>

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);
