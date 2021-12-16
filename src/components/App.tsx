import React from 'react';
import { Route, Switch } from "react-router-dom";
import '../App.css';
import Form from "./Form";
import Todo from "./Todo";

function App() {

  return (
    <div className="App">

        <Switch>

            <Route exact path="/">
                <Form />
            </Route>

            <Route path="/todo">
                <Todo />
            </Route>

        </Switch>

    </div>
  );
}

export default App;
