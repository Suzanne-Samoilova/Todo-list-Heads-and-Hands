import thunk from "redux-thunk";
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from "redux-devtools-extension";
import createRootReducer from "./reducers";


export const history = createBrowserHistory();

function configureStore(preloadedState?: any) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                thunk
            ),
        ),
    )

    return store
}

const store = configureStore();
export default store;
