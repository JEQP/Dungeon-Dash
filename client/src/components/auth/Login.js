import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import AuthContext from "../../utils/AuthContext";
import DDlogo2lines from "../../assets/DDlogo2lines.png";
import "./style.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      isAuthenticated: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userData);
    //axios request to connect to database
    Axios.post('/api/users/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        if (response.data.success === true) {
          console.log("success registered", this);
          // to change authentication state
          this.setState({ isAuthenticated: true });
          let value = this.context;
          value.changeAuthentication(this.state.isAuthenticated, this.state.email);
          console.log("value: ", value);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errors: error.response.data });
      });

  };
  render() {
    const { errors } = this.state;
    console.log("errors: ", errors.email);
    let value = this.context;
    console.log("isAuthenticated: ", value.isAuthenticated);
    if (value.isAuthenticated === true) {
      // conditional rendering to new page
      return <Redirect to='/home' />
    }
    return (
      <div className="container">
        <img src={DDlogo2lines} alt="DungeonDash" />
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <div className="formdiv">
            <form noValidate onSubmit={this.onSubmit} className="formStyle">
              
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                  />
                  <label htmlFor="email">{errors.email !== undefined ? `${errors.email}` : "Email"}</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                  />
                  <label htmlFor="password">{errors.password !== undefined ? `${errors.password}` : "Password"}</label>
                </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                // onClick={() => changeEmail(`${this.state.email}`)}
                >
                  Login
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.contextType = AuthContext;
export default Login;