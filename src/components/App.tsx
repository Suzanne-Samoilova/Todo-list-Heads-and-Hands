import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router';
import Auth from "./Auth";
import Todo from "./Todo";
import {useSelector} from "react-redux";
import {TRootState} from "../index";
import Archive from "./Archive";
import Profile from "./Profile";

function App() {
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



            </Switch>
        </div>
      );
    }

export default App;
