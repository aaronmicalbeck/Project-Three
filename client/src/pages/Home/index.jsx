import React, { Component } from "react";
import { Header } from "../../components";
import "./home.css";
import LoginForm from "../LoginForm";
// import SignupForm from "../SignupForm";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  componentDidMount() {
    console.log("Home Component Mounted");
  }

  render() {
    if (this.props.user) {
      return (
        <div className="Home">
          <Header user={this.state.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
        </div>
      );
    } else {
      return (
        <div className="Home">
          <Header user={this.state.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
          <LoginForm _login={this.props._login} />
        </div>
      );
    }
  }
<<<<<<< HEAD
=======


  render() {
    if (this.props.user) {
      // user is signed in
      return (
        <div className="Home">
          {/* <LoginForm /> */}
          <Header user={this.state.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
        </div>
      );
    } else {
      return (
        // user is NOT signed in yet
        <div className="Home">
          {/* <LoginForm /> */}
          <Header user={this.state.user} />
          <p>Please login:</p>
          {/* <code>{JSON.stringify(this.props)}</code> */}
          <LoginForm _login={this.props._login} />
          {/* <SignupForm /> */}
        </div>
      );
    }
  }
>>>>>>> 7682bda1e9e754872919ba80fdc645a69d7365b8
}
