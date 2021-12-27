import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router';
import Auth from "./Auth";
import Todo from "./Todo";
import {useSelector} from "react-redux";
import {TRootState} from "../index";

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
            </Switch>
        </div>
      );
    }

export default App;
