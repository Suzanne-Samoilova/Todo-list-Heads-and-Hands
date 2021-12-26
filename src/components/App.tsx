import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router';
import Form from "./Form";
import Todo from "./Todo";
import {useSelector} from "react-redux";
import {TRootState} from "../index";

function App() {
    const isAuthorized = useSelector((state: TRootState)=> state.auth.isAuthorized )

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Form />
                </Route>

                {isAuthorized &&
                <Route path="/todo">
                    <Todo/>
                </Route>}
            </Switch>
        </div>
      );
    }

export default App;
