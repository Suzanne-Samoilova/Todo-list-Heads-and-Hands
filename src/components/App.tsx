import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router';
import {useSelector} from "react-redux";
import {TRootState} from "../index";
import Auth from "./Auth";
import Todo from "./Todo";
import Archive from "./Archive";
import Profile from "./Profile";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import DetailPage from "./DetailPage";

function App(props: any) {
    const isAuthorized = useSelector((state: TRootState)=> state.auth.isAuthorized )

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
