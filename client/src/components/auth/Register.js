import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Redirect } from 'react-router-dom';
import AuthContext from "../../utils/AuthContext";
import DDlogo2lines from "../../assets/DDlogo2lines.png";
import "./style.css";


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);
    Axios.post('/api/users/register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    })
      .then((response) => {
        console.log("response: ", response.data._id);
        if (response.status === 200) {
          console.log("success registered", this);
          // add user to own friend list
          Axios.post("/api/users/updatePlayerFriendList", {
            params: {
              playerID: response.data._id,
              friends: [response.data._id]
            }
          }).then((response) => {
            // handle success
            console.log("+++++++++ axios response: ", response);
          })
            .catch((error) => {
              // handle error
              console.log(error);
            });

          // to change authentication state
          let value = this.context;
          value.changeAuthentication(true, this.state.email);
          console.log("value: ", value);
        }
        console.log("line 50: ", JSON.stringify(response));
      })
      .catch((error) => {

        // console.log("line 54: ", JSON.stringify(error));
        console.log("line 54: email is: ", JSON.stringify(error.response.data.email));
        this.setState({ errors: error.response.data });
      });
  };

  render() {
    const { errors } = this.state;
    let value = this.context;
    console.log("isAuthenticated: ", value.isAuthenticated);
    if (value.isAuthenticated === true) {
      // conditional rendering to new page
      return <Redirect to='/home' />
    }


    return (
      <div className="container">
        <img className="logodeep-margin" src={DDlogo2lines} alt="DungeonDash" />

        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12 white-text" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="white-text">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <div className="formdiv">
              <form noValidate onSubmit={this.onSubmit} className="formStyle">
                <div className="input-field col s12 white-text">
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                  />
                  <label htmlFor="name">{errors.name !== undefined ? `${errors.name}` : "Name"}</label>
                </div>
                <div className="input-field col s12 white-text">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                  />
                  <label htmlFor="email">{errors.email !== undefined ? `${errors.email}` : "Email"}</label>
                </div>
                <div className="input-field col s12 white-text">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                  />

                  <label htmlFor="password">{errors.password !== undefined ? `${errors.password}` : "Password"}</label>
                </div>
                <div className="input-field col s12 white-text">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                  />

                  <label htmlFor="password2">{errors.password2 !== undefined ? `${errors.password2}` : "Confirm Password"}</label>
                </div>
                <div className="col s12 white-text btn-center" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      backgroundColor: "blue"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
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
Register.contextType = AuthContext;
export default Register;