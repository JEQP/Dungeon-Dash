import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AuthContext from "../utils/AuthContext";


class HomePage extends Component {

    render() {
        return (
            <div>
                <h1>This is the homepage</h1>
                { // check whether user is authenticated         
                    AuthContext.isAuthenticated === false &&
                    <Redirect to='/login' />
                }
                <div className="homepage">
                    <div className="container homeCentre">
                        {/* <div className="row">
                        <div className="col-sm-12"> */}
                        <Link to="/play" className="linkText"><Button variant="primary" size="lg" block>Play Now</Button></Link>{' '}
                        <Link to="/create" className="linkText"><Button variant="success" size="lg" block>Create Dungeon</Button></Link>{' '}
                        <Link to="/stadium" className="linkText"><Button variant="warning" size="lg" block>Enter Stadium</Button></Link>{' '}
                        {/* </div>
                    </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;
HomePage.contextType = AuthContext;