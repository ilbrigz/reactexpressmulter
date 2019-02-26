import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    console.log("submiting");
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/user", user)
      .then(res => console.log("success"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form>
        <input onChange={this.handleChange} type="text" name="name" />
        <input onChange={this.handleChange} type="text" name="email" />
        <input onChange={this.handleChange} type="password" name="password" />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}
