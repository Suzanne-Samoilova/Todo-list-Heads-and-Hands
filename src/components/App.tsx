import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Route, Switch } from 'react-router';
import '../App.css';

import Auth from "../pages/Auth";
import Todo from "../pages/Todo";
import Archive from "../pages/Archive";
import Profile from "../pages/Profile";
import Registration from "../pages/Registration";
import ForgotPassword from "../pages/ForgotPassword";
import DetailPage from "../pages/DetailPage";
import {selectorAuthState} from "../store/auth/selector";
import {push} from "connected-react-router";


const App = () => {
    const dispatch = useDispatch();
    const isAuthorized = useSelector(selectorAuthState).isAuthorized;

    if (!isAuthorized) {
        dispatch(push(`auth`))
    }


    return (
        <div className="App">
            <Switch>

                <Route path="/auth">
                    <Auth />
                </Route>

                {isAuthorized &&
                <Route exact path="/">
                    <Todo/>
                </Route>}

                {isAuthorized &&
                <Route path="/archive">
                    <Archive />
                </Route>}

                {isAuthorized &&
                <Route path="/profile">
                    <Profile />
                </Route>}

                <Route path="/registration">
                    <Registration />
                </Route>

                <Route path="/forgot-password">
                    <ForgotPassword />
                </Route>

                {isAuthorized &&
                <Route path="/:id">
                    <DetailPage />
                </Route>}

            </Switch>
        </div>
      );
    }

export default App;
