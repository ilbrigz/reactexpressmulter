import React, { Component } from "react";
import "./App.css";

import CreateUser from "./components/CreateUser";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello from React 💛</h1>
        <CreateUser />
      </div>
    );
  }
}

export default App;
