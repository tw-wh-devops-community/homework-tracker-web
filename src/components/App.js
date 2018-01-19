import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Admin from "./Admin";

export class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/admin" component={Admin}/>
        </div>
      </Router>

    );
  }
}

export default App;